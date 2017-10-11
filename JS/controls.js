var muteSwitch = new Nexus.Toggle('#mute', {
    'size': [40, 20],
    'state': false
});

muteSwitch.on('change', function (v) {
    if (v) {
        param.node.parameters.setParameterByName('gain', 20);
    } else {
        param.node.parameters.setParameterByName('gain', 0);
    }
});

var lappingSlider = new Nexus.Slider('#lappingIntensity', {
    'size': [120, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 60,
    'max': 300,
    'step': 0,
    'value': 80
});

lappingSlider.on('change', function (v) {
    param.node.parameters.setParameterByName('lappingFreq', v);
});

var cracklingSlider = new Nexus.Slider('#cracklingIntensity', {
    'size': [120, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 100,
    'max': 1000,
    'step': 0,
    'value': 200
});

cracklingSlider.on('change', function(v) {
    console.log(v);
    param.node.parameters.setParameterByName('crackDensity', v);
});

var hissingSlider = new Nexus.Slider('#hissingIntensity', {
    'size': [120, 20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 1,
    'max': 10,
    'step': 0,
    'value': 5
});

hissingSlider.on('change', function(v) {
    console.log(v);
    param.node.parameters.setParameterByName('hissingModFreq', v);
});