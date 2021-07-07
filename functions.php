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
     
    function toggleStatus($username, $status){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "UPDATE drivers SET active = {$status} WHERE username = '{$username}';";
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
    
    function retriveActiveDrivers(){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "select username from drivers WHERE active = true;";
        $result = pg_query($query);
        $activeDrivers = array();
        while ($row = pg_fetch_row($result)){
            array_push($activeDrivers, $row[0]);
        }
        pg_free_result($result);
        pg_close($db_connection);
        return $activeDrivers;  
    }
    
    function retriveActiveDriversLocation($activeDrivers){
        $username_location = array();
        $all_username_locations = array();
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $date = date("Y_m_d");
        foreach ($activeDrivers as $driver) {
            $query = "SELECT coordinate from {$driver}_{$date} ORDER BY timestamp DESC LIMIT 1;";
            $result = pg_query($query);
            while ($row = pg_fetch_row($result)){
                $username_location['username'] = $driver;
                $username_location['lastCoordinate'] = $row[0];
            }
            array_push($all_username_locations, $username_location);
            pg_free_result($result);
        }
        pg_close($db_connection);
        return $all_username_locations; 
    }