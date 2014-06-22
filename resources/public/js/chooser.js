var theWebSocket;
var agoraCols = 80;
var agoraRows = 40;

var lastMsg;

function handleDbTxn(txn) {
  console.log('txn:');
  console.log(txn);
}

function handleAgoraMsg(data) {
  var json = edn.valueOf(edn.parse(data)); 
  lastMsg = json;
  console.log("received msg:");
  console.log(json);
  if (_.isEqual(json.type, "db-txn")) {
    handleDbTxn(json.msg);
  }
}

function setupWebSocket() {
  if (!_.isUndefined(theWebSocket)) return;

  // Open a web socket
  var uri = 'ws://' + $('#socketUri').val();
  console.log('web socket connecting... '+ uri);
  var ws = new WebSocket(uri);

  ws.onopen = function()
  {
    // Web Socket is connected, send data using send()
    console.log("Connection open...");
    var pollingOn = {'msg': 'start polling', 
                     'type': edn.keyword('poll'), 
                     'name': 'generic js module'}
    var msg = edn.stringify(pollingOn);
    ws.send(msg);
    console.log("message sent:");
    console.log(msg);

    $('#connectSocketButton').prop('disabled', true);
    $('#socketUri').prop('disabled', true);
    $('#disconnectSocketButton').prop('disabled', false);
  };

  ws.onmessage = function (evt) 
  { 
    handleAgoraMsg(evt.data);
  };

  ws.onclose = function()
  { 
    // websocket is closed.
    console.log("Connection is closed..."); 

    $('#connectSocketButton').prop('disabled', false);
    $('#socketUri').prop('disabled', false);
    $('#disconnectSocketButton').prop('disabled', true);
  };

  return ws;
};

function sendPoint(ws, _x, _y, _magnitude) {
  var x = _.isEmpty(_x) ? 0 : parseInt(_x);
  var y = _.isEmpty(_y) ? 0 : parseInt(_y);
  var mag = _.isEmpty(_magnitude) ? 0 : parseFloat(_magnitude);
  x = Math.max(0, Math.min(agoraCols-1, x));
  y = Math.max(0, Math.min(agoraRows-1, y));
  mag = Math.max(0.0, Math.min(100.0, mag));
  var markPointMsg = edn.stringify({
                      'msg': 'mark-point',
                      'type': edn.keyword('update'),
                      'x': x,
                      'y': y,
                      'magnitude': mag
                    });
  console.log("Sending msg:");
  console.log(markPointMsg);
  ws.send(markPointMsg);
};

$(function() {
  $( "#connectSocketButton" ).click(function() {
    theWebSocket = setupWebSocket();
  });

  $( "#disconnectSocketButton" ).click(function() {
    if (!_.isUndefined(theWebSocket)) {
      theWebSocket.close();
    }
  });

  $( "#markPointButton" ).click(function() {
    var x = $('#xVal').val();
    var y = $('#yVal').val();
    var mag = $('#magnitude').val();
    sendPoint(ws, x, y, mag);
  });
});
