<?php
    // Start the session
    session_start();
?>
<?php require_once("functions.php"); ?>  
<?php   
    $errorMessage;
    if (!empty($_POST)){
        $userType = $_POST["userType"];
        $username = pg_escape_string($_POST['username']);
        $password = pg_escape_string($_POST['password']);
        
        if (empty($_POST['userType'])){                                         //check if user type is defined
            $errorMessage .= "User type is not defined <br/>";
        }
        if (empty($_POST['username'])){                                           //check if username is defined
            $errorMessage .= "Username is not defined.<br/>";
        }
        if (empty($_POST['password'])){                                          //check if password is defined
            $errorMessage .= "password is not defined.<br/>";
        }
        if(empty($errorMessage)){
            if (checkUsernamePassword($username, $password, $userType)){
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $username;
                $_SESSION['title'] = ($userType == 'admin' ? "Tracking Food Trucks | Admins panel" : "Tracking Food Trucks | Drivers panel");;
                header("location: {$userType}.php");
            }else{
                $errorMessage .= "username or Password is incorrect";
            }
        }
        if(!empty($errorMessage)){
?>
            <script>alert('<?php echo $errorMessage; ?>');</script>
<?php
        }
    } 
 ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Tracking Food Trucks | login page</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <link rel="shortcut icon" href="#"> <!--for netbeans favicon error-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
        <link rel="stylesheet" href="./css/login.css">
    </head>
    <body>      
        <form id="loginForm" class="row col-sm-7 col-md-4 col-xl-3" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post">
            <div id="title" class="col-12"><h1>Log in</h1></div>
            <div class="col-12"><input id="username" type="text" class="form-control" placeholder="username" aria-label="username" name="username"></div>
            <div class="col-12"><input id="password" type="password" class="form-control" placeholder="password" aria-label="password" name="password"></div>
            <div id="userType" class="col-12">
                <label class="form-check-label">Log in as:</label>
                <input class="form-check-input" type="radio" name="userType" id="admin" value="admin">
                <label class="form-check-label" for="admin">Admin</label>
                <input class="form-check-input" type="radio" name="userType" id="driver" value="driver">
                <label class="form-check-label" for="driver">Driver</label>
            </div>
            <div class="col-12"><button id="btnSubmit" type="submit" name="btnSubmit" class="btn btn-primary">Log in</button></div>
        </form>
        <script src="./js/loginFormValidation.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    </body>
</html>
