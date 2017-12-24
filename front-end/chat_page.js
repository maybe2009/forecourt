'use strict';

var tplSendMsgNode =
    "        <div class='chat-message msg-sender'>\n" +
    "            <img class='avatar' src='{{avatarUrl}}' />\n" +
    "            <div class='left_triangle'></div>\n" +
    "            <div class='message-content'>\n" +
    "                <p>{{message}}</p>\n" +
    "            </div>\n" +
    "        </div>";

var tplReceiveMsgNode =
    "        <div class='chat-message msg-sender'>\n" +
    "            <img class='avatar' src='{{avatarUrl}}' />\n" +
    "            <div class='right_triangle'></div>\n" +
    "            <div class='message-content'>\n" +
    "                <p>{{message}}</p>\n" +
    "            </div>\n" +
    "        </div>";

var ws = new WebSocket("ws://localhost:7758")

$('#input-button').click(function() {
    var input_box = $('#input-box');
    console.log('send msg: ' + input_box.val());
    onSendMsg(input_box.val());
});

ws.onopen = function(evt) {
    console.log("Connection open...");
};

ws.onmessage = function(evt) {
    console.log("Received message: " + evt.data);
    onReceiveMsg(evt.data);
};

function addSendMsgNode(data) {
    var rendered = Mustache.render(tplSendMsgNode, data);
    console.log(rendered);
    $('#chat-page').append(rendered);
}

function addReceiveMsgNode(data) {
    var rendered = Mustache.render(tplReceiveMsgNode, data);
    $('#chat-page').append(rendered);
}

function onSendMsg(content) {
    var nodeInfo = {
        'avatarUrl' : 'example.jpg',
        'message' : content
    };

    addSendMsgNode(nodeInfo);
    sendNewMsgToServer(content);
}

function onReceiveMsg(content) {
    var nodeInfo = {
        'avatarUrl' : 'example.jpg',
        'message' : content
    };
    addReceiveMsgNode(nodeInfo)
}

function sendNewMsgToServer(msg) {
    switch(ws.readyState) {
        case WebSocket.CONNECTING:
            console.log("Connect ws server success");
            break;
        case WebSocket.OPEN:
            console.log("Websocket state open");
            break;
        case WebSocket.CLOSING:
            console.log("WebSocket state closing");
            break;
        default:
            alert("WebSocket State Error");
            break;
    }

    ws.send(msg);
}