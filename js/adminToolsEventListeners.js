var showOnMapButtons = document.getElementsByClassName("showOnMapButton");
for (i=0; i < showOnMapButtons.length; i++) {
    showOnMapButtons[i].addEventListener("click", function() {
        var username = this.id.split("_")[1];
        view.setCenter(driverLocationSource.getFeatureById(username).getGeometry().getCoordinates());
        view.setZoom(20);
    });
};

var deleteButtons = document.getElementsByClassName("deleteButton");
for (i=0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function() {
        var username = this.id.split("_")[1];
        $.ajax({
            type : "POST",
            url : "adminAjaxHandler.php",
            data: {
                username: username,
                btnType: "deleteButton",
            },
            dataType: 'text',
            success : function(response) {
                location.reload();
            },
            error: function(xhr) { 
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);            
            }
        });
    });
};

var datePickerButtons = document.getElementsByClassName("datePickerButton");
for (i=0; i < datePickerButtons.length; i++) {
    datePickerButtons[i].addEventListener("input", function() {
        var username = this.id.split("_")[1];
        var date = this.value.replaceAll("-","_");
        $.ajax({
            type : "POST",
            url : "adminAjaxHandler.php",
            data: {
                username: username,
                btnType: "datePickerButton",
                date: date,
            },
            dataType: 'text',
            success : function(response) {
                driverHistorySource.clear();
                driverHistorySource.addFeatures(new ol.format.GeoJSON().readFeatures(JSON.parse(response).features));    
                view.setCenter(JSON.parse(response).features.geometry.coordinates[0]);
                view.setZoom(20);
            },
            error: function(xhr) { 
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                alert('Error - ' + errorMessage);            
            }
        });
    });
};
var driverHistorySource = new ol.source.Vector();
var driverHistoryStyle = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#db0202',
        width: 2
    })
});
var driverHistoryLayer = new ol.layer.Vector({
    source: driverHistorySource,
    style: driverHistoryStyle
});
map.addLayer(driverHistoryLayer);

var informationButtons = document.getElementsByClassName("driverInformationButton");
for (i=0; i < informationButtons.length; i++) {
    informationButtons[i].addEventListener("click", function() {
        var username = this.id.split("_")[1];
        $.ajax({
            type : "POST",
            url : "adminAjaxHandler.php",
            data: {
                username: username,
                btnType: "driverInformationButton",
            },
            dataType: 'text',
            success : function(response) {
                var information = JSON.parse(response);
                showInformation(information, username);
            },
            error: function(xhr) { 
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);            
            }
        });
    });
};
function showInformation(information, username){
    var driver = document.getElementById(username);
    
    var existingDriverInformation = document.getElementsByClassName("driversInformation");
    if (existingDriverInformation.length > 0){
        var parentId = existingDriverInformation[0].parentNode.id;
        existingDriverInformation[0].remove();
        document.getElementById(parentId).classList.remove("highlighted");
    }
    
    if (parentId === username){
        return;
    }
    
    driver.classList.add("highlighted");
    
    var informationList = document.createElement('ul');
    driver.appendChild(informationList);
    informationList.setAttribute("class", "driversInformation");
    
    var firstName = document.createElement('li');
    firstName.innerHTML = "First name: " + information.firstName;
    informationList.appendChild(firstName);
    
    var lastName = document.createElement('li');
    lastName.innerHTML = "Last name: " + information.lastName;
    informationList.appendChild(lastName);
    
    var phone = document.createElement('li');
    phone.innerHTML = "Phone Number: " + information.phone;
    informationList.appendChild(phone);
}