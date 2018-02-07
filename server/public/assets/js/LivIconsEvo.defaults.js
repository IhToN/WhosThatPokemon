;
if (typeof jQuery === 'undefined') {
  throw new Error('LivIcons Evolution Script requires jQuery!');
}
;

function LivIconsEvoDefaults() {
  "use strict";
  var default_options = {
    pathToFolder: 'assets/svg/',
    name: 'bell.svg',
    style: 'original',
    size: '60px',
    strokeStyle: 'original',
    strokeWidth: 'original',
    tryToSharpen: true,
    rotate: 'none',
    flipHorizontal: false,
    flipVertical: false,
    strokeColor: '#22A7F0',
    strokeColorAction: '#b3421b',
    strokeColorAlt: '#F9B32F',
    strokeColorAltAction: '#ab69c6',
    fillColor: '#91e9ff',
    fillColorAction: '#ff926b',
    solidColor: '#6C7A89',
    solidColorAction: '#4C5A69',
    solidColorBg: '#ffffff',
    solidColorBgAction: '#ffffff',
    colorsOnHover: 'none',
    colorsHoverTime: 0.3,
    colorsWhenMorph: 'none',
    brightness: 0.10,
    saturation: 0.07,
    morphState: 'start',
    morphImage: 'none',
    allowMorphImageTransform: false,
    strokeWidthFactorOnHover: 'none',
    strokeWidthOnHoverTime: 0.3,
    keepStrokeWidthOnResize: false,
    animated: true,
    eventType: 'hover',
    eventOn: 'self',
    autoPlay: false,
    delay: 0,
    duration: 'default',
    repeat: 'default',
    repeatDelay: 'default',
    drawOnViewport: false,
    viewportShift: 'oneHalf',
    drawDelay: 0,
    drawTime: 1,
    drawStagger: 0.1,
    drawStartPoint: 'middle',
    drawColor: 'same',
    drawColorTime: 1,
    drawReversed: false,
    drawEase: 'Power1.easeOut',
    eraseDelay: 0,
    eraseTime: 1,
    eraseStagger: 0.1,
    eraseStartPoint: 'middle',
    eraseReversed: true,
    eraseEase: 'Power1.easeOut',
    touchEvents: false,
    beforeAdd: false,
    afterAdd: false,
    beforeUpdate: false,
    afterUpdate: false,
    beforeRemove: false,
    afterRemove: false,
    beforeDraw: false,
    afterDraw: false,
    duringDraw: false,
    beforeErase: false,
    afterErase: false,
    duringErase: false,
    beforeAnim: false,
    afterAnim: false,
    duringAnim: false
  };
  if (default_options.pathToFolder === '/EDIT THIS OPTION!/') {
    alert('Please edit "pathToFolder" option in the "LivIconsEvo.defaults.js" file!');
    throw new Error('LivIcons Evolution: Please edit "pathToFolder" option in "LivIconsEvo.defaults.js" file!');
  }
  ;
  return default_options;
};
