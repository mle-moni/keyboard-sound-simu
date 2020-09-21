const spawn = require('child_process').spawn;

function play(path) {
	const process = spawn("mplayer", ["-ao", "pulse", path], {stdio: "ignore"});
	if (!process) {
		console.error("Unable to spawn process")
	}
}

play("test.mp3")

console.log("hihi")