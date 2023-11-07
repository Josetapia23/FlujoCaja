<?php

//$servername = "www.plataforma50.com";
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "manejocaja";

// Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
date_default_timezone_set("America/Bogota"); //ZONA HORARIA DEL SERVIDOR O PC


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

?>