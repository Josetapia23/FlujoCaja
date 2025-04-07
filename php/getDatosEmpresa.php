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
if (isset($data["id"])) {
    $id = $conn->real_escape_string($data["id"]);

    // Verificar las credenciales en la tabla "usuarios"
    $sqlGetEmprendimiento = "SELECT * FROM emprendimiento WHERE idUser = '$id' LIMIT 1"; // Limitar a 1 resultado
    $resultEmprendimiento = $conn->query($sqlGetEmprendimiento);

    if ($resultEmprendimiento->num_rows > 0) {
        // Si se encontró un emprendimiento relacionado con el usuario
        $emprendimiento = $resultEmprendimiento->fetch_assoc();
        //$sqlNombreMunicipio = "SELECT m.municipio from emprendimiento e, municipios m where e.idMuni=m.id_municipio"; // Limitar a 1 resultado
        $response = array('success' => true, 'emprendimiento' => $emprendimiento);
    } else {
        // No se encontró ningún emprendimiento relacionado con el usuario
        $response = array('success' => false, 'message' => 'No se encontró emprendimiento relacionado con este usuario');
    }
} else {
    // Si los campos "id" no están presentes en los datos
    $response = array('success' => false, 'message' => 'Faltan campos requeridos');
}

// Enviar la respuesta como JSON con código de estado 200 (OK)
http_response_code(200);
header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
