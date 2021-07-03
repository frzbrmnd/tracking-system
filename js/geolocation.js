var geolocation = new ol.Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
        enableHighAccuracy: true,
    },
    projection: view.getProjection(),
});

var toggleTracking = document.getElementById("track");
/*function el(id) {
    return document.getElementById(id);
}*/

toggleTracking.addEventListener('change', function () {
    geolocation.setTracking(this.checked);
    if(this.checked){
        driverLocationSource.addFeature(positionFeature);
        document.getElementById("test").innerText = "Stop Tracking";
                                 
    }else{
        driverLocationSource.clear();
        document.getElementById("test").innerText = "Start Tracking";
    }
});

// update the HTML page when the position changes.
/*geolocation.on('change', function () {
    el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
    el('altitude').innerText = geolocation.getAltitude() + ' [m]';
    el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
    el('heading').innerText = geolocation.getHeading() + ' [rad]';
    el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
});*/

// handle geolocation error.
geolocation.on('error', function (error) {
    toggleTracking.checked = false;
    document.getElementById("test").innerText = "Start Tracking";
    driverLocationSource.clear();
    geolocation.setTracking(false);
    if(error.message == "User denied Geolocation"){
        alert("Please turn on your location");
    }else{
        alert("oppps! Service is unavailable right now.");
    }
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(
  new ol.style.Style({
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
  })
);

geolocation.on('change:position', function () {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
    
    //send locations to database using 
});

var driverLocationSource = new ol.source.Vector();
var driverLocationLayer = new ol.layer.Vector({
    map: map,
    source: driverLocationSource,
});


