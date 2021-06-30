var osm = new ol.layer.Tile({
    source: new ol.source.OSM(),
})

var view = new ol.View({
    projection: 'EPSG:4326',
    center: [51.391098, 35.700927],
    zoom: 12,
});

//disabe rotation
var interactions = ol.interaction.defaults({altShiftDragRotate:false, pinchRotate:false});
//make attribution collapsible when width<600px 
var attribution = new ol.control.Attribution({
  collapsible: false,
});
function checkSize() {
  var small = map.getSize()[0] < 600;
  attribution.setCollapsible(small);
  attribution.setCollapsed(small);
}



var controls = ol.control.defaults({
    rotate: false,
    attribution: false,
}).extend([attribution]);

var map = new ol.Map({
    layers: [osm],
    target: 'map',
    view: view,
    interactions: interactions,
    controls: controls,
});

window.addEventListener('resize', checkSize);
checkSize();
