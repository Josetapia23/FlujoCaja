<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idEmpresa"]) || empty($data["nombreEmpresa"]) || empty($data["direccion"])  || empty($data["emailEmpresarial"]) || empty($data["telefonoEmpresarial"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idEmpresa = $conn->real_escape_string($data["idEmpresa"]);
        $nombreEmpresa = $conn->real_escape_string($data["nombreEmpresa"]);
        $direccion = $conn->real_escape_string($data["direccion"]);
        $emailEmpresarial = $conn->real_escape_string($data["emailEmpresarial"]);
        $telefono = $conn->real_escape_string($data["telefonoEmpresarial"]);

        $sqlUpdateEmpresa = "UPDATE emprendimiento SET nombreEmprendimiento = ?, direccion = ?, telefonoEmpresarial = ?, emailEmpresarial=? WHERE id = ?";
        $stmtUpdateEmpresa = $conn->prepare($sqlUpdateEmpresa);
        $stmtUpdateEmpresa->bind_param("ssssi", $nombreEmpresa, $direccion, $telefono, $emailEmpresarial, $idEmpresa);

        if ($stmtUpdateEmpresa->execute()) {
            $response = array('result' => 'success', 'message' => 'Datos de empresa modificados con éxito.');
        } else {
            $response = array('result' => 'error', 'message' => 'Error al modificar los datos de la empresa: ' . $stmtUpdateEmpresa->error);
        }

        $conn->close();
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
