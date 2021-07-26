<?php require_once("functions.php"); ?> 
<?php
    $allDrivers = retriveDriversForAdmin();
    $date = date("Y_m_d");
    $all_username_locations_timestamps = retriveDriversLastLocationAndTimestamp($allDrivers);
    echo json_encode($all_username_locations_timestamps);    