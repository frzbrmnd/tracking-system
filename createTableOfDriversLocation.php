<?php session_start(); ?>
<?php require_once("functions.php"); ?> 
<?php 
    $username = $_SESSION['username'];
    $date = $_SESSION['date'];
    createTableOfLocations($username, $date);