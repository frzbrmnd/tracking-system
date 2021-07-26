<?php require_once("functions.php"); ?>  
<?php


    if(isset($_POST["btnType"])){
        $username = pg_escape_string($_POST['username']);
        if($_POST["btnType"] == "deleteButton"){
            echo deleteDriver($username);
        }else if ($_POST["btnType"] == "datePickerButton"){
            $date = pg_escape_string($_POST['date']);
            echo retriveTrajectory($username, $date);
            
        }else if ($_POST["btnType"] == "driverInformationButton"){
            echo retriveDriverInformation($username);
        }
    }