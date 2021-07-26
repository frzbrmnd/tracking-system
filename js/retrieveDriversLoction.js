setInterval(function(){
    $.ajax({
        type : "POST",
        url : "retrieveLocations.php",
        dataType: 'text',
        success : function(response) {
            const drivers_locations_timestamps = JSON.parse(response);
            driverLocationSource.clear();
            drivers_locations_timestamps.forEach(drawLocationsOnMap);
            drivers_locations_timestamps.forEach(setStatusForAllDrivers);
            if (selectedFeatureId !== ""){
                overlay.setPosition(driverLocationSource.getFeatureById(selectedFeatureId).getGeometry().getCoordinates());
                selectSingleClick.getFeatures().push(driverLocationSource.getFeatureById(selectedFeatureId));
            }
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
    document.getElementById("track_" + item.username).disabled = false;
    document.getElementById("track_" + item.username).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=\"20\" height=\"20\"  viewBox="0 0 512 512"><title>location-flat</title><path d="M.37,256C.37,114.82,114.82.35,256,.35S511.64,114.83,511.63,256,397.18,511.65,256,511.65.35,397.18.37,256Z" fill="#2b77c1"/><path d="M383,340C383,368,319,382.87,256,382.87S129,368,129,340c0-23.9,41-34.9,66-38.89L198,317c-40,7-53.07,18-53.07,22.95,0,8.92,43,26.94,111.08,26.94,69,0,111-18,111-26.94,0-4.93-11-15.93-52-22.95l2-15.94q66.1,12,66.06,38.89Zm-127,8.92h0s-64.07-99.77-64.07-155.71c0-35.06,29-64.07,64.07-64.07s64,29,64,64.07c0,54.83-64,155.71-64,155.71Zm0-133.72h0c12,0,21-10,21-22a21,21,0,0,0-42.07,0c0,12,9,22,21,22Z" fill="#fff"/></svg>';

}

function setStatusForAllDrivers(item){
    var lastTimestamp = item.lastTimestamp;
    var username = item.username;
    var statusIcon = document.getElementById("status_" + username);
    var date = new Date();
    if(date.getTime() - lastTimestamp > 5000){
        statusIcon.classList.add("inactiveDriver");
        statusIcon.classList.remove("activeDriver");
    }else{
        statusIcon.classList.add("activeDriver");
        statusIcon.classList.remove("inactiveDriver");
    }
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

/*const highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255,255,255,0.7)',
  }),
  stroke: new ol.style.Stroke({
    color: '#3399CC',
    width: 3,
  }),
});*/
/*
var selected = null;

driverLocationSource.getFeatures().forEach(function(f){
    f.on('singleclick', function(){
        alert("asda");
        alert(this.getGeometry().getCoordinates());
    });
       
});
  
var popup = new ol.Overlay({
    element: document.getElementById('popupInformation')
});*/

var selectedFeatureId = "";
var select = null;
const selectSingleClick = new ol.interaction.Select();
const changeInteraction = function () {
    if (select !== null) {
        map.removeInteraction(select);
        selectedFeatureId = "";
    }
    var select = selectSingleClick;
  
    if (select !== null) {
        map.addInteraction(select);
        select.on('select', function (e) {
            if(e.selected.length>0){
                selectedFeatureId = e.selected[0].getId();
                content.innerHTML = e.selected[0].getGeometry().getCoordinates() + "\n" + e.selected[0].getId();
                overlay.setPosition(e.selected[0].getGeometry().getCoordinates());
            }
        });
    }
};

/**
 * onchange callback on the select element.
 */
map.on("singleclick", function(e){
    
    overlay.setPosition(undefined);
    
    changeInteraction();
})
changeInteraction();


const container = document.getElementById('popupInformation');
const content = document.getElementById('popupInformation-content');


const overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});



map.addOverlay(overlay);