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

// Verificar si los datos requeridos están presentes en la solicitud
if (empty($data["nombreIngreso"]) || empty($data["idTipo"]) || empty($data["idUser"]))  {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    // Datos a insertar en la tabla "usuarios"
    $nombreIngreso = $conn->real_escape_string($data["nombreIngreso"]);
    $idTipo = $conn->real_escape_string($data["idTipo"]);
    $idUser = $conn->real_escape_string($data["idUser"]);

    // Verificar si el nombreConcepto ya existe para el usuario
    $sqlCheckExistence = "SELECT COUNT(*) AS count FROM conceptos WHERE nombreConcepto = ? AND idUser = ?";
    $stmtCheckExistence = $conn->prepare($sqlCheckExistence);
    $stmtCheckExistence->bind_param("si", $nombreIngreso, $idUser);
    $stmtCheckExistence->execute();
    $stmtCheckExistence->bind_result($count);
    $stmtCheckExistence->fetch();
    $stmtCheckExistence->close();

    if ($count > 0) {
        // Ya existe un registro con el mismo nombreConcepto e idUser
        $response = array('result' => 'error1', 'message' => 'Ya existe un registro con el mismo nombre. Por favor, elige otro nombre.');
    } else {
        // No hay registros existentes, procede con la inserción
        $sqlInsertIngreso = "INSERT INTO conceptos (nombreConcepto, idTipo, idUser) VALUES (?, ?, ?)";
        $stmtInsertIngreso = $conn->prepare($sqlInsertIngreso);
        $stmtInsertIngreso->bind_param("sii", $nombreIngreso, $idTipo, $idUser);

        if ($stmtInsertIngreso->execute()) {
            $response = array('result' => 'success', 'message' => 'Registro exitoso.');
        } else {
            $response = array('result' => 'error', 'message' => 'Error al insertar datos en la tabla "conceptos": ' . $stmtInsertIngreso->error);
        }

        // Cerrar la declaración preparada
        $stmtInsertIngreso->close();
    }
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
?>