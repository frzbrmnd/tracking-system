<?php session_start(); ?>
<?php require_once("functions.php"); ?> 
<?php checkLogin($_SESSION['loggedin']); ?>
<?php require_once("header.php"); ?> 
<div id="test"><div>

<script src="./js/retrieveDriversLoction.js"></script>
<?php require_once("footer.php"); ?>