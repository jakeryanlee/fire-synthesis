class whiteNoise {

    constructor(c) {
        this.ctx = c;
        this.bufferSize = 1024;
        this.noiseGain = this.ctx.createGain();
        this.noiseGain.gain.value = 0;
        this.noise = this.ctx.createScriptProcessor(this.bufferSize, 1, 1);
        this.noise.onaudioprocess = function (noise) {
            var output = noise.outputBuffer.getChannelData(0);
            for (var i = 0; i < this.bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }
        };
        console.log(this.noise);
        this.noise.connect(this.noiseGain).connect(this.ctx.destination);
     }

    play() {
        console.log(this.noiseGain);
        this.noiseGain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 1);
    }

    stop() {
        this.noiseGain.gain.linearRampToValueAtTime(0.0, this.ctx.currentTime + 1);
    }

    setBufferSize(buf) {
        this.bufferSize = buf;
    }

    getBufferSize() {
        return this.bufferSize;
    }
}
