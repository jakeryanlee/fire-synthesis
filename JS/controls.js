var muteSwitch = new Nexus.Toggle('#mute', {
    'size' : [40, 20],
    'state' : false
});

muteSwitch.on('change', function(v) {
    if(v) {
        param.node.parameters.setParameterByName('gain', 12);
    } else {
        param.node.parameters.setParameterByName('gain', 0);
    }
});

var lappingSlider = new Nexus.Slider('#lappingIntensity', {
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
});

var cracklingSlider = new Nexus.Slider('#cracklingIntensity', {
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
});

var hissingSlider = new Nexus.Slider('#hissingIntensity', {
    'size': [120,20],
    'mode': 'relative',  // 'relative' or 'absolute'
    'min': 0,
    'max': 1,
    'step': 0,
    'value': 0
});
