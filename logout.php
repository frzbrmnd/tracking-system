<?php
    session_start();
    unset($_SESSION["username"]);
    unset($_SESSION["loggedin"]);
    unset($_SESSION["title"]);
    header("Location: login.php");
?>