<?php
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
if (empty($data["nombre"]) || empty($data["email"]) || empty($data["contrasena"]) || empty($data["edad"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    // Datos a insertar en la tabla "usuarios"
    $nombre = $conn->real_escape_string($data["nombre"]);
    $email = $conn->real_escape_string($data["email"]);
    $contrasena = $conn->real_escape_string($data["contrasena"]);
    $edad = $conn->real_escape_string($data["edad"]);

    // Verificar si el email ya existe en la base de datos
    $sqlCheckEmail = "SELECT * FROM usuarios WHERE email = ?";
    $stmtCheckEmail = $conn->prepare($sqlCheckEmail);
    $stmtCheckEmail->bind_param("s", $email);
    $stmtCheckEmail->execute();
    $stmtCheckEmail->store_result();

    if ($stmtCheckEmail->num_rows > 0) {
        // El email ya existe, devolver un error
        $response = array('result' => 'error', 'message' => 'El email ya está en uso.');
    } else {
        // Insertar datos en la tabla "usuarios" utilizando consultas preparadas
        $sqlInsertUser = "INSERT INTO usuarios (nombre, email, contrasena, edad) VALUES (?, ?, ?, ?)";
        $stmtInsertUser = $conn->prepare($sqlInsertUser);
        $stmtInsertUser->bind_param("sssi", $nombre, $email, $contrasena, $edad);

        if ($stmtInsertUser->execute()) {
            // Los datos se insertaron correctamente
            $response = array('result' => 'success', 'message' => 'Registro exitoso.');
        } else {
            // Ocurrió un error al insertar los datos en la tabla "usuarios"
            $response = array('result' => 'error', 'message' => 'Error al insertar datos en la tabla "usuarios": ' . $stmtInsertUser->error);
        }
    }
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$stmtCheckEmail->close();
$stmtInsertUser->close();
$conn->close();
?>