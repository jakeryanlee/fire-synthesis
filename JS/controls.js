/**
 * Event handler for the play button
 * @type {Element}
 */
var playButton = document.getElementById("play");
playButton.onclick = function () {
    outputGain.gain.linearRampToValueAtTime(20, context.currentTime + 2);
};

/**
 * Event handler for the stop button
 * @type {Element}
 */
var stopButton = document.getElementById("stop");
stopButton.onclick = function() {
    outputGain.gain.linearRampToValueAtTime(0, context.currentTime + 2);
};