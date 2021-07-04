var geolocation = new ol.Geolocation({
    // enableHighAccuracy must be set to true to have the heading value.
    trackingOptions: {
        enableHighAccuracy: true,
    },
    projection: view.getProjection(),
});

var toggleTracking = document.getElementById("track");

toggleTracking.addEventListener('change', function () {
    geolocation.setTracking(this.checked);
    if(this.checked){
        driverLocationSource.addFeature(positionFeature);
        document.getElementById("trackLabelText").innerText = "Stop Tracking";
        $.ajax({
            type : "POST",
            url : "createDriversLocationsTable.php",
            error: function(xhr) { 
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);            
            }
        });  
        setInterval(function(){
                var date = new Date();
                var timestamp = date.getTime();
                var coordinates = geolocation.getPosition();    
                $.ajax({
                    type : "POST",
                    url : "insertLocationsIntoDB.php",
                    data: {
                        longitude: coordinates[0],
                        latitude: coordinates[1],
                        timestamp: timestamp,
                    },
                    dataType: "text",
                    error: function(xhr) { 
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);            
                    }
                }); 
            }, 
            1000    
        );
    }else{
        driverLocationSource.clear();
        document.getElementById("trackLabelText").innerText = "Start Tracking";
    }
});

// handle geolocation error.
geolocation.on('error', function (error) {
    toggleTracking.checked = false;
    document.getElementById("trackLabelText").innerText = "Start Tracking";
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
});

var driverLocationSource = new ol.source.Vector();
var driverLocationLayer = new ol.layer.Vector({
    map: map,
    source: driverLocationSource,
});


