<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Verificar si el campo "id" está presente y no está vacío
if (empty($data["id"])) {
    $response = array('result' => 'error', 'message' => 'Falta el campo "id".');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        // Escapar el valor del ID para evitar inyección de SQL
        $idConcepto = $conn->real_escape_string($data["id"]);

        // Verificar si el registro con el ID proporcionado existe
        $checkIfExistsSql = "SELECT id FROM conceptos WHERE id = ?";
        $stmtCheckIfExists = $conn->prepare($checkIfExistsSql);
        $stmtCheckIfExists->bind_param("i", $idConcepto);
        $stmtCheckIfExists->execute();
        $stmtCheckIfExists->store_result();

        // Si el registro existe, proceder con la eliminación
        if ($stmtCheckIfExists->num_rows > 0) {
            // Preparar la consulta DELETE
            $deleteSql = "DELETE FROM conceptos WHERE id = ?";
            $stmtDeleteConcepto = $conn->prepare($deleteSql);
            $stmtDeleteConcepto->bind_param("i", $idConcepto);

            // Ejecutar la consulta DELETE
            if ($stmtDeleteConcepto->execute()) {
                $response = array('result' => 'success', 'message' => 'Registro eliminado con éxito.');
            } else {
                $response = array('result' => 'error', 'message' => 'Error al intentar eliminar el registro: ' . $conn->error);
            }

            // Cerrar el statement DELETE
            $stmtDeleteConcepto->close();
        } else {
            // El registro no existe
            $response = array('result' => 'error2', 'message' => 'No existe un registro con el ID proporcionado.');
        }

        // Cerrar el statement de verificación de existencia
        $stmtCheckIfExists->close();

        // Cerrar la conexión a la base de datos
        $conn->close();
    }
}

// Establecer la cabecera de respuesta
header('Content-Type: application/json');
echo json_encode($response);
?>
