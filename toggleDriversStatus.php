<?php session_start(); ?>
<?php require_once("functions.php"); ?> 
<?php
    $username = $_SESSION['username'];
    toggleStatus($username, $_POST['status']);
