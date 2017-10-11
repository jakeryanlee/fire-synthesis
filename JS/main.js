window.AudioContext = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext);

var context = new AudioContext();
Nexus.context = context;
var spectrogram = new Nexus.Spectrogram('#visualiser',{
    'size': [300,150]
});
var start = context.createGain();
var end = context.createGain();
var Factory = new PluginFactory(context);
Factory.addPrototype(FirePlugin);

var subFactory = Factory.createSubFactory(start, end);
var param = subFactory.createPlugin(Factory.getPrototypes()[0]);
param.node.parameters.setParameterByName('gain', 0);
spectrogram.connect(end);
end.connect(context.destination);