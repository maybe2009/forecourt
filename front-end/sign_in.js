'use strict'
var avatarElement = document.getElementById('avatar');
alert(avatarElement);
avatarElement.addEventListener('change', uploadAvatar, false);

function uploadAvatar() {
    var avatarFile = this.files[0];
    console.log('user select avatar file name: ' + avatarFile.name
    + ' size: ' + avatarFile.size + ' type: ' + avatarFile.type);
}

var canvas = document.getElementsByName('avatar-preview');
var ctx = canvas.getContext('2d');