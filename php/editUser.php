<?php
// Datos de conexión a la base de datos
require('config.db.php');

// Obtener los datos enviados por la solicitud en formato JSON<?php
// Datos de conexión a la base de datos
require('config.db.php');

// Obtener los datos enviados por la solicitud en formato JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Crear una conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    error_log("Error de conexión: " . $conn->connect_error);
    echo json_encode(array('result' => 'error', 'message' => 'Error de conexión a la base de datos.'));
    exit();
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
?>