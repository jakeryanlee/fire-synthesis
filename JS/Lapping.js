class Lapping {

    /**
     * Constructor method to take audioContext
     * @param c
     */
    constructor(c) {
        this.ctx = c;
        this.mainGain = this.ctx.createGain();
        this.bp = this.ctx.createBiquadFilter();
        this.hpf = this.ctx.createBiquadFilter();
        this.hpf2 = this.ctx.createBiquadFilter();
        this.lpf = this.ctx.createBiquadFilter();
        this.shelf = this.ctx.createBiquadFilter();
        this.modNoise = new whiteNoise(this.ctx);
        this.boostGain = this.ctx.createGain();
        this.distortion = this.ctx.createWaveShaper();
    }

    init(out, n) {
        this.noise = n;
        this.shelf.type = 'highshelf';
        this.shelf.frequency.value = 150;
        this.boostGain.gain.value = 0.4;
        this.lpf.type = "lowpass";
        this.lpf.frequency.value = 300;
        this.hpf.type = "highpass";
        this.hpf.frequency.value = 30;
        this.hpf2.type = "highpass";
        this.hpf2.frequency.value = 30;
        this.bp.type = "bandpass";
        this.bp.frequency.value = 80;
        this.bp.Q.value = 5;
        this.distortion.curve = this.makeDistortionCurve(2);

        this.noise.noise.connect(this.lpf).connect(this.bp).connect(this.hpf).connect(this.boostGain).connect(this.hpf2).connect(this.mainGain);
        this.mainGain.connect(this.distortion).connect(this.shelf).connect(out);
    }

    makeDistortionCurve(amount) {
        var k = typeof amount === 'number' ? amount : 0,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180,
            i = 0,
            x;
        for (; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
    };

    play() {
        this.mainGain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + 1);
    }
}

