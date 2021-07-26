<!DOCTYPE html>
<html lang="en">
    <head>
        <title><?php echo $_SESSION['title']; ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <script src="./js/ol.js"></script>
        <link rel="shortcut icon" href="#"> <!--for netbeans favicon error-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <link rel="stylesheet" href="./css/ol.css" type="text/css">
        <link rel="stylesheet" href="./css/mapStyle.css">
        <link rel="stylesheet" href="./css/navbar.css" type="text/css">
        <link rel="stylesheet" href="./css/driver.css">
        <link rel="stylesheet" href="./css/admin.css">
    </head>
    <body>   
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <h1 class="navbar-brand" href="#">Tracking System</h1>
                <div class="dropdown">
                    <div id="options" class="btn btn-outline-success" data-bs-toggle="dropdown" aria-expanded="false">
                        <button id="btnOptions"><?php echo $_SESSION['username']; ?></button>
                        <svg id="btnOptionsSVG" xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="white" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </div>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a id="btnLogout" class="dropdown-item" href="logout.php">Log out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="map" class="map container-fluid"></div>
        <script src="./js/createMap.js"></script>
