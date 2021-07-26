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
    
    function checkLogin($loggedin, $userType, $page){
        if (!isset($loggedin) || ($userType != $page)){
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
     
    //todo: delete
    /*function toggleStatus($username, $status){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "UPDATE drivers SET active = {$status} WHERE username = '{$username}';";
        $result = pg_query($query);
        pg_free_result($result);
        pg_close($db_connection);
    }*/
    
    function InsertCoordinateIntoTable($tableName, $timestamp, $longitude, $latitude){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "INSERT INTO {$tableName}(timestamp, coordinate) ";
        $query .= "VALUES ({$timestamp}, POINT({$longitude}, {$latitude}))";
        $result = pg_query($query);
        pg_free_result($result);
        pg_close($db_connection);
    }
    
    //todo: delete
   /* function retriveActiveDrivers(){
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
    }*/
    
    //todo: add timespam and for all drivers
    /*function retriveActiveDriversLocation($activeDrivers){
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
    }*/
    
    
    function retriveDriversLastLocationAndTimestamp($allDrivers){
        $all_username_locations_timestamps = array();
        $date = date("Y_m_d");
        foreach ($allDrivers as $driver) {
            if(checkIfTabeExists($driver, $date) === "t"){
                $username_location_timestamp = array();
                $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
                $query = "SELECT coordinate, timestamp from {$driver}_{$date} ORDER BY timestamp DESC LIMIT 1;";
                $result = pg_query($query);
                while ($row = pg_fetch_row($result)){
                    $username_location_timestamp['username'] = $driver;
                    $username_location_timestamp['lastCoordinate'] = $row[0];
                    $username_location_timestamp['lastTimestamp'] = $row[1];
                }
                pg_free_result($result);
                pg_close($db_connection);
                array_push($all_username_locations_timestamps, $username_location_timestamp);
            }
        }
        return $all_username_locations_timestamps; 
    }
    
    function checkIfTabeExists($username, $date){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "SELECT EXISTS (SELECT FROM information_schema.tables WHERE  table_schema = 'public' AND table_name  = '{$username}_{$date}');";
        $result = pg_query($query);
        $row = pg_fetch_row($result);
        pg_free_result($result);
        pg_close($db_connection);
        return $row[0];
    }
    //todo: no need for active
    /*function retriveDriversForAdmin(){
        $driversInformation = array();
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "select username, active from drivers;";
        $result = pg_query($query);
        while ($row = pg_fetch_row($result)){
            $driversInformation[$row[0]] = $row[1];
        }
        pg_free_result($result);
        pg_close($db_connection);
        return $driversInformation;  
    }*/
    function retriveDriversForAdmin(){
        $drivers = array();
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "select username from drivers;";
        $result = pg_query($query);
        while ($row = pg_fetch_row($result)){
            array_push($drivers, $row[0]);
        }
        pg_free_result($result);
        pg_close($db_connection);
        return $drivers;  
    }
    
    function createNewDriver($username, $password, $phone, $firstName, $lastName, $admin){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query = "INSERT INTO drivers(username, password, phone, first_name, last_name, admin) ";
        $query .= "VALUES ('{$username}', '{$password}', '{$phone}', '{$firstName}', '{$lastName}', '{$admin}');";
        $result = pg_query($query);
        $status = pg_affected_rows($result);
        pg_free_result($result);
        pg_close($db_connection);
        return $status; 
    }
    
    function deleteDriver($username){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query  = "DELETE FROM drivers WHERE username = '{$username}'";
        $result = pg_query($query);
        $status = pg_affected_rows($result);
        pg_free_result($result);
        pg_close($db_connection);
        return $status; 
    }
    
    function retriveTrajectory($username, $date){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query  = "SELECT * FROM {$username}_{$date}";
        $result = pg_query($query);
        $coordinates = array();
        while ($row = pg_fetch_row($result)){
            $stringCoordinates = explode(",", substr($row[2], 1, -1));
            $floatcoordinates = array((float)$stringCoordinates[0], (float)$stringCoordinates[1]);
            array_push($coordinates, $floatcoordinates);
        }
        $geometry = array(
            'type' => 'LineString',
            'name' => "{$username}_{$date}_trajectory",
            'coordinates' => $coordinates,
        );
        $trajectory = array(
            'type' => 'FeatureCollection',
            'crs' => array(
                'type' => 'name',
                'properties' => array(
                    'name' => 'EPSG:3857',
                ),
            ),
            'features' => array(
                'type' => 'Feature',
                'geometry' => $geometry,
            ),
        );
        pg_free_result($result);
        pg_close($db_connection);
        return json_encode($trajectory); 
    }
    
    function retriveDriverInformation($username){
        $db_connection = pg_connect("host=localhost dbname=Tracking_System_DB user=postgres password=faraz@816#postgres") or die('connection failed' . pg_last_error());
        $query  = "SELECT first_name, last_name, phone FROM drivers WHERE username = '{$username}'";
        $result = pg_query($query);
        $driverInformation = array();
        while ($row = pg_fetch_row($result)){
            $driverInformation['firstName'] = $row[0];
            $driverInformation['lastName'] = $row[1];
            $driverInformation['phone'] = $row[2];
        }
        pg_free_result($result);
        pg_close($db_connection);
        return json_encode($driverInformation);
    }