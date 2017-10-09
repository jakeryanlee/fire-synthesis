/**
 * Event handler for the play button
 * @type {Element}
 */
var playButton = document.getElementById("play");
playButton.onclick = function () {
    param.node.parameters.setParameterByName('gain', 70);
};

/**
 * Event handler for the stop button
 * @type {Element}
 */
var stopButton = document.getElementById("stop");
stopButton.onclick = function() {
    param.node.parameters.setParameterByName('gain', 0);
};