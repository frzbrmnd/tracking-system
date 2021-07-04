<?php
    //check if the username exist and password is correct or not
    function checkUsernamePassword($username, $password, $userType){
        $status;
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "SELECT password FROM {$userType}s WHERE username = '{$username}';";
        $result = pg_query($query);
        $passwordFromDB = pg_fetch_row($result)[0];
        if (pg_num_rows($result) > 0){                                          //check if the username exist
            if ($password == $passwordFromDB){                                  //check if password is correct
                $status = TRUE;
            }            
        }
        pg_free_result($result);
        pg_close($db_connection);
        return $status;
    }
    
    function checkLogin($loggedin){
        if (!isset($loggedin)){
            header("location: login.php");
        }
    }
    
    function createTableOfLocations($username, $date){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "CREATE TABLE IF NOT EXISTS {$username}_{$date} ( ";
        $query .= "id SERIAL PRIMARY KEY, ";
        $query .= "timestamp BIGINT NOT NULL, ";
        $query .= "coordinate POINT NOT NULL );";
        $result = pg_query($query);
        pg_free_result($result);
        pg_close($db_connection);
    }
     
    function InsertCoordinateIntoTable($tableName, $timestamp, $longitude, $latitude){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "INSERT INTO {$tableName}(timestamp, coordinate) ";
        $query .= "VALUES ({$timestamp}, POINT({$longitude}, {$latitude}))";
        $result = pg_query($query);
        pg_free_result($result);
        pg_close($db_connection);
    }
    
    function retriveDriversLocation(){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
    }
?>