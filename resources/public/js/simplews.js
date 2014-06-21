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