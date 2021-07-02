<?php session_start(); ?>
<?php require_once("functions.php"); ?> 
<?php checkLogin($_SESSION['loggedin']); ?>
<?php require_once("header.php"); ?> 

<?php require_once("footer.php"); ?>