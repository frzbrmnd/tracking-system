<?php session_start(); ?>
<?php require_once("functions.php"); ?> 
<?php checkLogin($_SESSION['loggedin']); ?>
<?php require_once("header.php"); ?> 


<label id="trackLabel" class="btn btn-success"><input id="track" type="checkbox"/><span id="trackLabelText">start tracking</span></label>

<!--<p>
    position accuracy : <code id="accuracy"></code>&nbsp;&nbsp;
    altitude : <code id="altitude"></code>&nbsp;&nbsp;
    altitude accuracy : <code id="altitudeAccuracy"></code>&nbsp;&nbsp;
    heading : <code id="heading"></code>&nbsp;&nbsp;
    speed : <code id="speed"></code>

</p>-->
<script src="./js/geolocation.js"></script>

<?php require_once("footer.php"); ?>