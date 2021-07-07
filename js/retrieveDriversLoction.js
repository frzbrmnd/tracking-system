setInterval(function(){
    $.ajax({
        type : "POST",
        url : "retrieveLocations.php",
        dataType: 'text',
        success : function(response) {
            const drivers_locations = JSON.parse(response);
            driverLocationSource.clear();
            drivers_locations.forEach(drawLocationsOnMap);
        },
        error: function(xhr) { 
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);            
        }
    }); 
}, 
3000    
);

function drawLocationsOnMap(item){
    var coordinates = item.lastCoordinate.slice(1,-1).split(",");
    var point = new ol.geom.Point([parseFloat(coordinates[0]),parseFloat(coordinates[1])]);
    var positionFeature = new ol.Feature(point);
    positionFeature.setId(item.username);
    positionFeature.setStyle(driversStyle);
    driverLocationSource.addFeature(positionFeature);
}


var driverLocationSource = new ol.source.Vector();
var driverLocationLayer = new ol.layer.Vector({
    map: map,
    source: driverLocationSource,
});

var driversStyle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({
        color: '#3399CC',
      }),
      stroke: new ol.style.Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  });