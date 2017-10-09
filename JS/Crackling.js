class Crackling {

    /**
     * Constructor method to take audioContext
     * @param c
     */
    constructor(c) {
        this.ctx = c;
        this.crackAttack = 0;
        this.crackDecay = 0;
        this.crackRelease = 0;
        this.bp = this.ctx.createBiquadFilter();
        this.env = this.ctx.createGain();
        this.outGain = this.ctx.createGain();
    }

    init(out, n) {
        this.noise = n;
        this.bp.frequency.value = 5000;
        this.outGain.gain.value = 0.005;
        this.bp.Q.value = 3;
        this.env.gain.value = 0;
        this.noise.noise.connect(this.bp).connect(this.env).connect(this.outGain).connect(out);
    }

    trigger() {
        this.now = this.ctx.currentTime;
        this.env.gain.setValueAtTime(0, this.now);
        this.env.gain.linearRampToValueAtTime(1, this.now + this.crackAttack);
        this.env.gain.linearRampToValueAtTime(0, this.now + this.crackDecay + this.crackRelease);
    }

    setFrequency(val, q) {
        this.bp.frequency.value = val;
        this.bp.Q.value = q;
    }

    setAttack(val) {
        this.crackAttack = val;
    }

    setDecay(val) {
        this.crackDecay = val;
    }

    setRelease(val) {
        this.crackRelease = val;
    }

    setGain(val) {
        this.outGain.gain.value = val;
    }
}
