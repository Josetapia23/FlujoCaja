<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["nombreEmpresa"]) || empty($data["nit"]) || empty($data["direccion"]) || empty($data["telefonoEmpresarial"]) || empty($data["emailEmpresarial"]) || empty($data["idUser"]) || empty($data["registroEmpresa"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $nombre = $conn->real_escape_string($data["nombreEmpresa"]);
        $emailEmpresarial = $conn->real_escape_string($data["emailEmpresarial"]);
        $nit = $conn->real_escape_string($data["nit"]);
        $direccion = $conn->real_escape_string($data["direccion"]);
        $telefono = $conn->real_escape_string($data["telefonoEmpresarial"]);
        $idUser = $conn->real_escape_string($data["idUser"]);
        $registroEmpresa = $conn->real_escape_string($data["registroEmpresa"]);

        $conn->autocommit(false); // Iniciar transacción

        $sqlCheckNit = "SELECT * FROM emprendimiento WHERE nit = ?";
        $stmtCheckNit = $conn->prepare($sqlCheckNit);
        $stmtCheckNit->bind_param("s", $nit);
        $stmtCheckNit->execute();
        $stmtCheckNit->store_result();

        if ($stmtCheckNit->num_rows > 0) {
            $response = array('result' => 'error', 'message' => 'Este nit ya le pertenece a una empresa.');
        } else {
            $sqlInsertEmpresa = "INSERT INTO emprendimiento (nombreEmprendimiento, nit, direccion, telefonoEmpresarial, emailEmpresarial,idUser) VALUES (?, ?, ?, ?, ?, ?)";
            $stmtInsertEmpresa = $conn->prepare($sqlInsertEmpresa);
            $stmtInsertEmpresa->bind_param("sssssi", $nombre, $nit, $direccion, $telefono, $emailEmpresarial, $idUser);

            if ($stmtInsertEmpresa->execute()) {
                $sqlUpdateUser = "UPDATE usuarios SET RegistroEmpresa='SI' WHERE id=?";
                $stmtUpdateUser = $conn->prepare($sqlUpdateUser);
                $stmtUpdateUser->bind_param("i", $idUser);

                if ($stmtUpdateUser->execute()) {
                    $conn->commit(); // Confirmar transacción
                    $response = array('result' => 'success', 'message' => 'Registro exitoso y usuario modificado.');
                } else {
                    $conn->rollback(); // Revertir transacción en caso de error
                    $response = array('result' => 'error', 'message' => 'Error al modificar el usuario: ' . $stmtUpdateUser->error);
                }
            } else {
                $conn->rollback(); // Revertir transacción en caso de error
                $response = array('result' => 'error', 'message' => 'Error al insertar datos en la tabla "emprendimiento": ' . $stmtInsertEmpresa->error);
            }
        }
        $conn->autocommit(true); // Restaurar modo autocommit
    }
    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>