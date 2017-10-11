class FirePlugin extends BasePlugin {
    constructor(factory, owner) {
        super(factory, owner);

        this.crackling = this.crackling.bind(this);
        this.crackling_2 = this.crackling_2.bind(this);

        this.masterGain = this.context.createGain();
        this.input = this.context.createGain();
        this.output = this.context.createGain();
        this.noise = new whiteNoise(this.context);
        this.lap = new Lapping(this.context);
        this.hiss = new Hissing(this.context);
        this.highCrackling = new Crackling(this.context);
        this.pop = new Crackling(this.context);
        this.highCrackling.density.gain.value = 200;

        this.gain_parameter = this.parameters.createNumberParameter("gain", 0, 0, 20);
        this.gain_parameter.bindToAudioParam(this.masterGain.gain);
        this.lapping_parameter = this.parameters.createNumberParameter("lappingFreq", 80, 50, 200);
        this.lapping_parameter.bindToAudioParam(this.lap.bp.frequency);
        this.crackling_parameter = this.parameters.createNumberParameter("crackDensity", 200, 100, 1000);
        this.crackling_parameter.bindToAudioParam(this.highCrackling.density.gain);
        this.hissing_parameter = this.parameters.createNumberParameter("hissingModFreq", 5, 1, 10);
        this.hissing_parameter.bindToAudioParam(this.hiss.modLPF.frequency);

        this.highCrackling.init(this.masterGain, this.noise);
        this.highCrackling.setGain(0.003);
        this.pop.init(this.masterGain, this.noise);
        this.pop.setGain(0.005);
        this.lap.init(this.masterGain, this.noise);
        this.hiss.init(this.masterGain, this.noise);
        this.lap.play();
        this.crackling();
        this.crackling_2();

        this.masterGain.connect(this.output);
        this.addInput(this.input);
        this.addOutput(this.output);

    }

    crackling() {
        this.delay = Math.random() * (this.highCrackling.density.gain.value - 50) + 50;
        this.crackFreq = Math.random() * (10000 - 5000) + 5000;
        this.crackQ = Math.random() * (5 - 2) + 2;
        this.crackAttack = Math.random() * (0.0002 + 0.00001) + 0.00001;
        this.crackDecay = Math.random() * (0.0004 + 0.00002) + 0.00002;
        this.crackRelease = Math.random() * (0.002 + 0.001) + 0.001;

        this.highCrackling.setFrequency(this.crackFreq, this.crackQ);
        this.highCrackling.setAttack(this.crackAttack);
        this.highCrackling.setDecay(this.crackDecay);
        this.highCrackling.setRelease(this.crackRelease);
        this.highCrackling.setRelease(this.crackRelease);
        this.highCrackling.trigger();
        setTimeout(this.crackling, this.delay);
    }

    crackling_2() {
        this.pop_delay = Math.random() * ((this.highCrackling.density.gain.value + 800) - 200) + 200;
        this.pop_crackFreq = Math.random() * (9000 - 1000) + 1000;
        this.pop_crackQ = Math.random() * (8 - 3) + 3;
        this.pop_crackAttack = Math.random() * (0.0002 + 0.00001) + 0.00001;
        this.pop_crackDecay = Math.random() * (0.01 + 0.002) + 0.002;
        this.pop_crackRelease = Math.random() * (0.0002 + 0.0001) + 0.001;

        this.pop.setFrequency(this.pop_crackFreq, this.pop_crackQ);
        this.pop.setAttack(this.pop_crackAttack);
        this.pop.setDecay(this.pop_crackDecay);
        this.pop.setRelease(this.pop_crackRelease);
        this.pop.trigger();
        setTimeout(this.crackling_2, this.pop_delay);
    }
}

FirePlugin.prototype.name = "FirePlugin";
FirePlugin.prototype.version = "1.0.0";
FirePlugin.prototype.uniqueID = "FirePlugin";