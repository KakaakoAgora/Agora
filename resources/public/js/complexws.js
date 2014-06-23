var agoraWsUri = "ws://localhost:3000/agora-socket";
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

function setupWebSocket(wsUri) {
  // Let us open a web socket
  var ws = new WebSocket(wsUri);

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
  };

  ws.onmessage = function (evt) 
  { 
    handleAgoraMsg(evt.data);
  };

  ws.onclose = function()
  { 
    // websocket is closed.
    console.log("Connection is closed..."); 
  };

  return ws;
};

function sendPoint(ws, _x, _y, _magnitude) {
  var x = Math.max(0, Math.min(agoraCols-1, parseInt(_x)));
  var y = Math.max(0, Math.min(agoraRows-1, parseInt(_y)));
  var mag = Math.max(0.0, Math.min(100.0, parseFloat(_magnitude)));
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
  var ws = setupWebSocket(agoraWsUri);

  $( "#markPointButton" ).click(function() {
    var x = $('#xVal').val();
    var y = $('#yVal').val();
    var mag = $('#magnitude').val();
    sendPoint(ws, x, y, mag);
  });
});
