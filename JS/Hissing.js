class Hissing {

    /**
     * Constructor method to take audioContext
     * @param c
     */
    constructor(c) {
        this.ctx = c;
        this.mainGain = this.ctx.createGain();
        this.hpf = this.ctx.createBiquadFilter();
        this.modNoiseGain = this.ctx.createGain();
        this.modLPF = this.ctx.createBiquadFilter();
        this.modNoise = new whiteNoise(this.ctx);
        this.outGain = this.ctx.createGain();
        this.outGain.gain.value = 0.00002;
    }

    init(out, n) {
        this.noise = n;
        this.hpf.type = "highpass";
        this.hpf.frequency.value = 2000;
        this.modLPF.type = "lowpass";
        this.modLPF.frequency.value = 5;
        this.modNoiseGain.gain.value = 500;
        this.modNoise.noise.connect(this.modLPF).connect(this.modNoiseGain).connect(this.mainGain.gain);
        this.noise.noise.connect(this.hpf).connect(this.mainGain).connect(this.outGain);
        this.outGain.connect(out);
    }

}

