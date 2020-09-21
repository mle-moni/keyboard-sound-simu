const fs = require('fs');
const spawn = require('child_process').spawn;

const path = "/dev/input/by-path/pci-0000:00:14.0-usb-0:1:1.0-event-kbd";
"/dev/input/by-path/platform-i8042-serio-0-event-kbd"

const readStream = fs.createReadStream(path);

readStream.on('data', buffer => {
	keyboardEventHandler(buffer);
});

const A_CODE = 4;
const JS_A_CODE = "A".charCodeAt(0);

function keyboardEventHandler(buffer) {
	const keyCode = buffer.readUInt16LE(20);
	const actionCode = buffer.readInt32LE(44);
	if (!actionCode) {
		return ;
	}
	if (keyCode >= A_CODE && keyCode < A_CODE + 26) {
		let mp3FilePath = "NK_Cream/" + String.fromCharCode(JS_A_CODE + (keyCode - A_CODE));
		mp3FilePath += ".mp3";
		playSound(mp3FilePath);
	} else if (keyCode === 40) {
		playSound("NK_Cream/ENTER.mp3");
	} else if (keyCode === 42) {
		playSound("NK_Cream/BACKSPACE.mp3");
	} else if (keyCode === 44) {
		playSound("NK_Cream/SPACE.mp3");
	} else if (keyCode === 57) {
		playSound("NK_Cream/CAPS_LOCK.mp3");
	} else if (keyCode !== 2) {
		playSound("NK_Cream/D.mp3");
	}
}

function playSound(path) {
	const process = spawn("mplayer", [path], {stdio: "ignore"});
	if (!process) {
		console.error("Unable to spawn process")
	}
}