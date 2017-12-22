'use strict'
var input_box = document.getElementById('input-box');
var input_button = document.getElementById('input-button');
var chat_page = document.getElementById("chat-page");

var receiver_msg_node_template = document
.getElementsByClassName('msg-receiver')[0];
var sender_msg_node_template = document
.getElementsByClassName('msg-sender')[0];

var ws = new WebSocket("ws://172.26.70.35:7758")

input_button.onclick= function(){
    console.log('send msg: ' + input_box.value);
    onInputMsg(input_box.value);
}

ws.onopen = function(evt) {
    console.log("Connection open...");
}

ws.onmessage = function(evt) {
    console.log("Received message: " + evt.data);
    onReceiveMsg(evt.data);
}

function onInputMsg(content) {
    var new_node = receiver_msg_node_template.cloneNode(true);
    addMsgNode(new_node, content);   
    sendNewMsgToServer(content);
}

function onReceiveMsg(content) {
    var new_node = sender_msg_node_template.cloneNode(true);
    addMsgNode(new_node, content);
}

function addMsgNode(node, content) {
    node.getElementsByTagName('p')[0].innerHTML = content;
    chat_page.appendChild(node);
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