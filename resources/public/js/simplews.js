$(function() {
  var wsUri = "ws://localhost:3000/agora-socket";

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
    var received_msg = edn.valueOf(edn.parse(evt.data));
    console.log("received msg:");
    console.log(received_msg);
  };

  ws.onclose = function()
  { 
    // websocket is closed.
    console.log("Connection is closed..."); 
  };

  function sendPoint(_x, _y, _magnitude) {
    var x = parseInt(_x);
    var y = parseInt(_y);
    var mag = parseFloat(_magnitude);
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

  $( "#markPointButton" ).click(function() {
    var x = $('#xVal').val();
    var y = $('#yVal').val();
    var mag = $('#magnitude').val();
    sendPoint(x, y, mag);
  });
});
