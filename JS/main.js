window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);

var context = new AudioContext();
var start = context.createGain();
var end = context.createGain();
var Factory = new PluginFactory(context);
Factory.addPrototype(FirePlugin);

var subFactory = Factory.createSubFactory(start, end);
var param = subFactory.createPlugin(Factory.getPrototypes()[0]);

end.connect(context.destination);
