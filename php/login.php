<?php
// Datos de conexión a la base de datos
require('config.db.php');

// Obtener los datos enviados por la solicitud
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Crear una conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Datos para el inicio de sesión
if (isset($data["email"]) && isset($data["contrasena"])) {
    $email = $conn->real_escape_string($data["email"]);
    $contrasena = $conn->real_escape_string($data["contrasena"]);

    // Verificar las credenciales en la tabla "usuarios"
    $sqlLogin = "SELECT * FROM usuarios WHERE email = '$email' && contrasena = '$contrasena'";
    $resultLogin = $conn->query($sqlLogin);

    if ($resultLogin->num_rows > 0) {
        // Las credenciales son válidas
        // Consulta para obtener todos los datos del usuario
        $sqlGetUserData = "SELECT * FROM usuarios WHERE email = '$email'";
        $resultGetUserData = $conn->query($sqlGetUserData);

        if ($resultGetUserData->num_rows > 0) {
            $userData = $resultGetUserData->fetch_assoc();
            // Crear una respuesta con los datos del usuario directamente (sin user_data)
            $response = $userData;
        } else {
            // No se encontraron datos del usuario
            $response = array('success' => false, 'message' => 'No se encontraron datos del usuario');
        }
    } else {
        // Credenciales inválidas
        $response = array('success' => false, 'message' => 'Credenciales inválidas');
    }
} else {
    // Si los campos "email" y "contrasena" no están presentes en los datos
    $response = array('success' => false, 'message' => 'Faltan campos requeridos');
}


// Enviar la respuesta como JSON con código de estado 200 (OK)
http_response_code(200);
header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>