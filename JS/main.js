window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);

/**
 * Create instances of each fire class and provide the audio context
 * Also provide output gain for overall volume control
 */
var context = new AudioContext();
var outputGain = context.createGain();
outputGain.connect(context.destination);
var noise = new whiteNoise(context);
var lap = new Lapping(context);
var hiss = new Hissing(context);
var highCrackling = new Crackling(context);
var pop = new Crackling(context);
var delay, crackFreq, crackQ, crackDecay, crackAttack, crackRelease;
var pop_delay, pop_crackFreq, pop_crackQ, pop_crackDecay, pop_crackAttack, pop_crackRelease;

/**
 * Initialise the objects and set values
 * @type {number}
 */
outputGain.gain.value = 0;
highCrackling.init(outputGain, noise);
highCrackling.setGain(0.005);
pop.init(outputGain, noise);
pop.setGain(0.01);
lap.init(outputGain, noise);
hiss.init(outputGain, noise);
lap.play();
crackling();
crackling_2();

function crackling() {
    getHighCrackValues();
    highCrackling.setFrequency(crackFreq, crackQ);
    highCrackling.setAttack(crackAttack);
    highCrackling.setDecay(crackDecay);
    highCrackling.setRelease(crackRelease);
    highCrackling.trigger();
    setTimeout(crackling, delay);
}

function crackling_2() {
    getPopCrackValues();
    pop.setFrequency(pop_crackFreq, pop_crackQ);
    pop.setAttack(pop_crackAttack);
    pop.setDecay(pop_crackDecay);
    pop.setRelease(pop_crackRelease);
    pop.trigger();
    setTimeout(crackling_2, pop_delay);
}

/**
 * Provides randomness to high pitched crack type
 */
function getHighCrackValues() {
    delay = Math.random() * (200 - 10) + 10;
    crackFreq = Math.random() * (10000-5000) + 5000;
    crackQ = Math.random() * (5-2) + 2;
    crackAttack = Math.random() * (0.0002 + 0.00001) + 0.00001;
    crackDecay = Math.random() * (0.0004 + 0.00002) + 0.00002;
    crackRelease = Math.random() * (0.002 + 0.001) + 0.001;
}

/**
 * Provides randomness to pop crack type
 */
function getPopCrackValues() {
    pop_delay = Math.random() * (1000 - 300) + 300;
    pop_crackFreq = Math.random() * (5000-1000) + 1000;
    pop_crackQ = Math.random() * (8-3) + 3;
    pop_crackAttack = Math.random() * (0.0002 + 0.00001) + 0.00001;
    pop_crackDecay = Math.random() * (0.01 + 0.002) + 0.002;
    pop_crackRelease = Math.random() * (0.0002 + 0.0001) + 0.001;
}