<?php require_once("functions.php"); ?> 
<?php
    $activeDrivers = retriveActiveDrivers();
    $all_username_locations = retriveActiveDriversLocation($activeDrivers);
    echo json_encode($all_username_locations);    