class Sound {

    /**
     * Constructor method to take audioContext
     * @param c
     */
    constructor(c) {
        this.ctx = c;
        this.bufferSize = 4096
    }

    /**
     * Method to initialse instance variables
     * Setup audioNodes
     * Connect audioNotes
     */
    init() {
        this.lpf = this.ctx.createBiquadFilter();
        this.lpf.type = 'lowpass';
        this.lpf.frequency.value = 100;
        this.noiseGain = this.ctx.createGain();
        this.whiteNoise = this.ctx.createScriptProcessor(this.bufferSize, 1, 1);
        this.whiteNoise.connect(this.lpf).connect(this.noiseGain).connect(this.ctx.destination);
    }

    /**
     * Play noise source
     */
    playAudio() {
        this.init();
        this.whiteNoise.onaudioprocess = function(e) {
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < this.bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        };
        this.noiseGain.gain.setTargetAtTime(1.0, this.ctx.currentTime + 0.1, 0);
    }

    /**
     * Stop Noise source
     */
    stopAudio() {
        this.noiseGain.gain.setTargetAtTime(0, this.ctx.currentTime + 0.1, this.noiseGain.gain.value);
    }
}
