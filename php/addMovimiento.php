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
if (empty($data["monto"]) || empty($data["descripcion"]) || empty($data["idTipo"]) || empty($data["idUser"]) || empty($data["idConcepto"]) || empty($data["idEmprendimiento"]))  {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    // Datos a insertar en la tabla "usuarios"
    $monto = $conn->real_escape_string($data["monto"]);
    $descripcion = $conn->real_escape_string($data["descripcion"]);
    $idTipo = $conn->real_escape_string($data["idTipo"]);
    $idUser = $conn->real_escape_string($data["idUser"]);
    $fechaMovimiento = date('Y-m-d H:i:s');
    $idConcepto = $conn->real_escape_string($data["idConcepto"]);
    $idEmprendimiento = $conn->real_escape_string($data["idEmprendimiento"]);
    // Verificar si el nombreConcepto ya existe para el usuario
    $sqlInsertMonto = "INSERT INTO movimientos (monto, descripcion, idTipo, idUser, fecha, idConcepto, idEmprendimiento) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmtCheckMonto = $conn->prepare($sqlInsertMonto);
    $stmtCheckMonto->bind_param("isiisii", $monto, $descripcion, $idTipo, $idUser,  $fechaMovimiento, $idConcepto, $idEmprendimiento);
    if ($stmtCheckMonto->execute()) {
        $response = array('result' => 'success', 'message' => 'Monto registrado exitosamente.');
    } else {
        $response = array('result' => 'error', 'message' => 'Error al insertar datos en la tabla "movimientos": ' . $stmtCheckMonto->error);
    }
    // Cerrar la declaración preparada
    $stmtCheckMonto->close();
}
// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
// Cerrar la conexión
$conn->close();
?>
