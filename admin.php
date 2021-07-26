<?php session_start(); ?>
<?php require_once("functions.php"); ?> 
<?php checkLogin($_SESSION['loggedin'], $_SESSION['userType'], "admin"); ?>
<?php require_once("header.php"); ?> 
<?php

    
    
    if (!empty($_POST)){
        $username = $_POST["driverUsername"];
        $password = $_POST["password1"];
        $phone = $_POST["phoneNumber"];
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $admin = $_POST["admin"];
        if (createNewDriver($username, $password, $phone, $firstName, $lastName, $admin)==0){
            echo "trsf";
        }
    }
?>
<div id="disableDiv"></div>
<div id="popup" class="col-sm-8 col-md-5 col-xl-4">
    <div id="popupHeader" class="row justify-content-between align-items-center">
        <p class="col-6">New driver registration</p>
        <div class="col-1">
            <img src="./img/draggingIcon.jpg"></div>
        </div>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
        <div class="row g-3">
            <div class="col-md-6 ps-0 pe-1 m-0">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" name="firstName">
            </div>
            <div class="col-md-6 ps-1 pe-0 m-0">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" name="lastName">
            </div>
        </div>
        <div class="mb-2">
            <label for="driverUsername" class="form-label">Username</label>
            <input type="text" class="form-control" id="driverUsername" name="driverUsername" autocomplete="off">
        </div>
        <div class="mb-2">
            <label for="Password1" class="form-label">Password</label>
            <input type="password" class="form-control" id="password1" name="password1" autocomplete="off">
        </div>
        <div class="mb-2">
            <label for="Password2" class="form-label">Check password</label>
            <input type="password" class="form-control" id="password2" autocomplete="off">
        </div>
        <div class="mb-2">
            <label for="mobile" class="form-label">Driver's phone number</label>
            <input type="number" class="form-control" id="phoneNumber" name="phoneNumber">
        </div>
        <input type="hidden" name="admin" value="<?php echo $_SESSION['username']; ?>">
        <button type="submit" class="btn btn-primary" style='float: right; margin-bottom: 15px; margin-left: 10px;'>Save</button>    
        <div id="popupClose" class="btn btn-danger" style='float: right; margin-bottom: 15px;'>Cancel</div>
    </form>
</div>


<div id="popupInformation" class="ol-popup">
    
    <div id="popupInformation-content"></div>
</div>


<div id="toolbarContainer" class="col-lg-3 col-md-4 col-sm-5 forSmallScreens">
    <div id="toggleToolbarButton"><span id="toggleToolbarIcon" class="closeToolbarIcon"></span></div>
    <div id="toolbar" class="openToolabr">
        <div id="drivers" class="row">
            <div id="newDriver" class="row justify-content-between">
                <p class="col-9">Add new driver</p>
                <button id="addDriverBtn" class="col-1 btn btn-primary">+</button>
            </div>
            <ul id="driversList" class="row list-group list-group-flush"></ul>
        </div>
        <!--<div id="profile" class="row"></div>

        
        -->
    </div>
</div>
<script>

</script>

<script src="./js/adminToolbar.js"></script>
<script src="./js/retrieveDriversLoction.js"></script>
<script src="./js/popupForm.js"></script>

<?php
    $driversList = retriveDriversForAdmin();
    foreach($driversList as $username) {
        ?>
            <script>addDriversToList('<?php echo $username; ?>')</script>
        <?php
    }
?>
<script src="./js/adminToolsEventListeners.js"></script>    
<?php require_once("footer.php"); ?>