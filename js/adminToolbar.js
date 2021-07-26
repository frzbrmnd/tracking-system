if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

var toolbar = document.getElementById("toolbar");

document.getElementById("toggleToolbarButton").addEventListener('click', function () {
    document.getElementById("toggleToolbarIcon").classList.toggle("closeToolbarIcon");
    document.getElementById("toggleToolbarIcon").classList.toggle("openToolbarIcon");
    if(toolbar.className.includes("openToolabr")){
        toolbar.classList.remove("openToolabr");
        toolbar.style.display = "none";
        document.getElementById("toolbarContainer").className = "";
    }else{
        toolbar.classList.add("openToolabr");
        toolbar.style.display = "block";
        document.getElementById("toolbarContainer").className = "col-md-3 col-sm-5 forSmallScreens";
    }
});

function addDriversToList(username, status){
    var driver = document.createElement('li');
    driver.setAttribute("id", username);
    driver.setAttribute("class", "row border-0 driversItem align-items-center d-flex");
    document.getElementById("driversList").appendChild(driver);
    
    
    var driverUsername = document.createElement('span');
    driverUsername.innerHTML = username;
    
    var driverStatus = document.createElement('div');
    
    
    //driverUsername.classList.add("col-3");
    driverUsername.setAttribute("class", "col-5 p-2");
    driverStatus.setAttribute("class", "col-1 inactiveDriver");
    driverStatus.setAttribute("id", "status_" + username);
    //driverStatus.classList.add("col-1");
    
    
    driver.appendChild(driverStatus);
    driver.appendChild(driverUsername);
    
    
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("id", "delete_" + username);
    deleteButton.setAttribute("class", "deleteButton col-1 ms-auto");
    //deleteButton.setAttribute("onclick", "deleteLocation()");
    deleteButton.innerHTML = "<svg xmlns=\"./img/trash.svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg>";
    driver.appendChild(deleteButton);
    
    var trackingButton = document.createElement('button');
    trackingButton.setAttribute("type", "button");
    trackingButton.setAttribute("id", "track_" + username);
    trackingButton.setAttribute("class", "showOnMapButton col-1 ms-2");
    trackingButton.disabled = true;
    trackingButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=\"20\" height=\"20\"  viewBox="0 0 512 512"><title>location-flat</title><path d="M.37,256C.37,114.82,114.82.35,256,.35S511.64,114.83,511.63,256,397.18,511.65,256,511.65.35,397.18.37,256Z" fill="#414141"/><path d="M383,340C383,368,319,382.87,256,382.87S129,368,129,340c0-23.9,41-34.9,66-38.89L198,317c-40,7-53.07,18-53.07,22.95,0,8.92,43,26.94,111.08,26.94,69,0,111-18,111-26.94,0-4.93-11-15.93-52-22.95l2-15.94q66.1,12,66.06,38.89Zm-127,8.92h0s-64.07-99.77-64.07-155.71c0-35.06,29-64.07,64.07-64.07s64,29,64,64.07c0,54.83-64,155.71-64,155.71Zm0-133.72h0c12,0,21-10,21-22a21,21,0,0,0-42.07,0c0,12,9,22,21,22Z" fill="#fff"/></svg>';
    //deleteButton.setAttribute("onclick", "deleteLocation()");
    driver.appendChild(trackingButton);
    
    var datePickerButton = document.createElement('input');
    datePickerButton.setAttribute("type", "date");
    datePickerButton.setAttribute("id", "date_" + username);
    datePickerButton.setAttribute("class", "datePickerButton col-1 ms-2");
    
    //deleteButton.setAttribute("onclick", "deleteLocation()");
    //datePickerButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=\"20\" height=\"20\" viewBox="0 0 512 512"><defs><style>.cls-1{fill:#141f38;}</style></defs><title>calendar-outline</title><path class="cls-1" d="M102.4,332.8a12.8,12.8,0,0,0,0,25.6H128V384a12.8,12.8,0,1,0,25.6,0V358.4h51.2V384a12.8,12.8,0,0,0,25.6,0V358.4h51.2V384a12.8,12.8,0,0,0,25.6,0V358.4h51.2V384a12.8,12.8,0,0,0,25.6,0V358.4h25.6a12.8,12.8,0,0,0,0-25.6H384V281.6h25.6a12.8,12.8,0,0,0,0-25.6H384V230.4a12.8,12.8,0,0,0-25.6,0V256H307.2V230.4a12.8,12.8,0,1,0-25.6,0V256H230.4V230.4a12.8,12.8,0,0,0-25.6,0V256H153.6V230.4a12.8,12.8,0,1,0-25.6,0V256H102.4a12.8,12.8,0,0,0,0,25.6H128v51.2Zm256-51.2v51.2H307.2V281.6Zm-76.8,0v51.2H230.4V281.6Zm-128,0h51.2v51.2H153.6ZM448,38.4H409.6a38.4,38.4,0,0,0-76.8,0H179.2a38.4,38.4,0,1,0-76.8,0H64a64,64,0,0,0-64,64V428.8A83.2,83.2,0,0,0,83.2,512H428.8A83.2,83.2,0,0,0,512,428.8V102.4A64,64,0,0,0,448,38.4Zm-89.6,0a12.8,12.8,0,0,1,25.6,0V64a12.8,12.8,0,0,1-25.6,0ZM128,38.4a12.8,12.8,0,1,1,25.6,0V64A12.8,12.8,0,1,1,128,64Zm-102.4,64A38.33,38.33,0,0,1,42.54,70.57,38.18,38.18,0,0,1,64,64h38.4a38.4,38.4,0,1,0,76.8,0H332.8a38.4,38.4,0,0,0,76.8,0H448a38.44,38.44,0,0,1,38.2,34.48,38.69,38.69,0,0,1,.2,3.92v51.2H25.6Zm403.2,384H83.2a57.56,57.56,0,0,1-53-35.33A63.61,63.61,0,0,0,64,460.8H448a63.61,63.61,0,0,0,33.8-9.73A57.56,57.56,0,0,1,428.8,486.4Zm57.6-89.6A38.44,38.44,0,0,1,448,435.2H64a38.44,38.44,0,0,1-38.4-38.4V179.2H486.4Z"/></svg>';
    driver.appendChild(datePickerButton);
    
    
    
    
    
    
    
    // todo: if (timeNow - timespam > 60000) not active
   /* if(status === "t"){
        //driverStatus.classList.add("activeDriver");
        //document.getElementById("track_" + username).disabled = false;
        trackingButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=\"20\" height=\"20\"  viewBox="0 0 512 512"><title>location-flat</title><path d="M.37,256C.37,114.82,114.82.35,256,.35S511.64,114.83,511.63,256,397.18,511.65,256,511.65.35,397.18.37,256Z" fill="#2b77c1"/><path d="M383,340C383,368,319,382.87,256,382.87S129,368,129,340c0-23.9,41-34.9,66-38.89L198,317c-40,7-53.07,18-53.07,22.95,0,8.92,43,26.94,111.08,26.94,69,0,111-18,111-26.94,0-4.93-11-15.93-52-22.95l2-15.94q66.1,12,66.06,38.89Zm-127,8.92h0s-64.07-99.77-64.07-155.71c0-35.06,29-64.07,64.07-64.07s64,29,64,64.07c0,54.83-64,155.71-64,155.71Zm0-133.72h0c12,0,21-10,21-22a21,21,0,0,0-42.07,0c0,12,9,22,21,22Z" fill="#fff"/></svg>';

    }else{
        //driverStatus.classList.add("inactiveDriver");
        //document.getElementById("track_" + username).disabled = true;
        trackingButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=\"20\" height=\"20\"  viewBox="0 0 512 512"><title>location-flat</title><path d="M.37,256C.37,114.82,114.82.35,256,.35S511.64,114.83,511.63,256,397.18,511.65,256,511.65.35,397.18.37,256Z" fill="#414141"/><path d="M383,340C383,368,319,382.87,256,382.87S129,368,129,340c0-23.9,41-34.9,66-38.89L198,317c-40,7-53.07,18-53.07,22.95,0,8.92,43,26.94,111.08,26.94,69,0,111-18,111-26.94,0-4.93-11-15.93-52-22.95l2-15.94q66.1,12,66.06,38.89Zm-127,8.92h0s-64.07-99.77-64.07-155.71c0-35.06,29-64.07,64.07-64.07s64,29,64,64.07c0,54.83-64,155.71-64,155.71Zm0-133.72h0c12,0,21-10,21-22a21,21,0,0,0-42.07,0c0,12,9,22,21,22Z" fill="#fff"/></svg>';

    }*/
    
    
    
    var informationButton = document.createElement('button');
    informationButton.setAttribute("type", "button");
    informationButton.setAttribute("id", "information_" + username);
    informationButton.setAttribute("class", "driverInformationButton col-1 ms-2");
    //deleteButton.setAttribute("onclick", "deleteLocation()");
    driver.appendChild(informationButton);
    informationButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width=\"20\" height=\"20\" viewBox="0 0 512 512"><title>info-information-globe-glyph</title><path id="_9" data-name="9" d="M341.49,344.13S312.78,407.66,265.18,437C245.87,449,229,453.53,216.35,453.53q-16.57,0-26.3-10.07t-9.72-28c0-38.12,45.52-158.73,45.52-164.23,0-6.11-3.79-9.43-10.69-10.15-6.28-.64-11.09.36-22,6-8.37,4.36-29.05,16.16-51.95,51.6,0,0,24.92-62.33,66.26-89.75,29.86-19.81,48.24-21.31,66.5-21.31q15.2,0,23.27,6.41c5.3,4.3,8,10.08,8,17.4,0,8.88-51.93,152-51.93,174.3a17.11,17.11,0,0,0,3.32,10.79c2.2,2.89,4.58,4.36,7.1,4.36C273.85,400.9,312.78,387.55,341.49,344.13ZM331,70.05c-7.82-7.69-17.76-11.57-29.84-11.57q-23.45,0-40.41,17.81t-17,43.29q0,19.24,11.68,31.11t29.29,11.87q22.25,0,40.09-19t17.91-43.83C342.78,87.72,338.84,77.8,331,70.05Zm-8.12,278.61c-15.62,2-32.14,3.3-49.36,3.86-2.38,8.13-4.4,15.39-5.8,21.17,10.34-.23,20.57-.65,30.57-1.41A131.23,131.23,0,0,0,322.92,348.66ZM512,256c0,141.4-114.64,256-256,256S0,397.4,0,256,114.63,0,256,0,512,114.63,512,256Zm-138.11,0a532.61,532.61,0,0,1-6.63,84.74C443.45,322.89,491,288.15,491,256s-47.52-66.87-123.71-84.73A532.41,532.41,0,0,1,373.89,256ZM27,203.27c26-23.88,69.08-43.13,121.86-54.36,11.22-52.8,30.46-95.84,54.35-121.84A235.65,235.65,0,0,0,27,203.27ZM338.84,374.68c19.18-34.27,14.48-59.31,12.47-77.14,1-13.34,1.59-27.19,1.59-41.55a510.36,510.36,0,0,0-7.62-89.25c-7.86-1.38-16-2.61-24.31-3.64A84.67,84.67,0,0,0,333.8,152c2.23-2.42,4.25-4.91,6.16-7.42a6.77,6.77,0,0,1,.76.12,7.74,7.74,0,0,0-.21-.87,73.53,73.53,0,0,0,13.3-30.65q5.24,17,9.28,35.68c52.77,11.23,95.86,30.48,121.81,54.36A235.62,235.62,0,0,0,308.75,27.06,159,159,0,0,1,327.31,52.3a55.42,55.42,0,0,0-26.12-6.08c-1.16,0-2.3.12-3.44.18C284.39,30,270,21,256,21c-32.18,0-66.86,47.52-84.73,123.71a522,522,0,0,1,63.07-6.21,50.8,50.8,0,0,0,12.43,20.76h0a506.26,506.26,0,0,0-80,7.46,503.16,503.16,0,0,0-7.3,74,276,276,0,0,0-20.93,34.82c-.25-6.48-.4-13-.4-19.61a531.28,531.28,0,0,1,6.63-84.73C68.57,189.13,21,223.86,21,256s47.54,66.89,123.71,84.74c-.63-4-1.23-8-1.8-12.1-1.3-9.59,14.5-32,17.53-36a488.68,488.68,0,0,0,6.27,52.62c5,.9,10.23,1.66,15.44,2.43-2.07,7-4,13.81-5.67,20.32-1.72-.27-3.5-.46-5.22-.74.85,3.68,1.78,7.2,2.72,10.73-3.68,15.24-5.94,28.28-5.94,37.52a63.73,63.73,0,0,0,1.67,14.78,361.25,361.25,0,0,1-20.83-67.2C96.1,351.86,53,332.64,27,308.73A235.71,235.71,0,0,0,203.26,484.95c-9-9.74-17.29-21.94-24.77-36.14a38,38,0,0,0,2.74,3.19c8.44,8.7,19.59,13.28,33.09,13.7C227.65,482,242.06,491,256,491,287.09,491,320.51,446.47,338.84,374.68Zm146.07-65.95c-26,23.91-69,43.16-121.81,54.36-11.22,52.8-30.48,95.87-54.34,121.85A235.6,235.6,0,0,0,484.91,308.73Z" fill="#2b77c1"/></svg>'
}

document.getElementById("addDriverBtn").addEventListener('click', function () {
    document.getElementById("popup").style.display = "block";
    document.getElementById("disableDiv").style.display = "block";
});


