<?php

//$servername = "www.plataforma50.com";
$servername = "107.180.57.13";
$username = "aprendiz23";
$password = "aprendiz23*";
$dbname = "tecnoparque_2023";

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