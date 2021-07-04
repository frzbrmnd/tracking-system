<?php session_start(); ?>
<?php require_once("functions.php"); ?>
<?php
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];
    $timestamp = $_POST['timestamp'];
    $tableName = $_SESSION['username'] . "_" . $_SESSION['date'];
    InsertCoordinateIntoTable($tableName, $timestamp, $longitude, $latitude);    
?>