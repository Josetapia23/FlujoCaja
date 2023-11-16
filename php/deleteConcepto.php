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

        // Preparar la consulta DELETE
        $sql = "DELETE FROM conceptos WHERE id = ?";
        $stmtDeleteConcepto = $conn->prepare($sql);

        // Verificar si la preparación de la consulta fue exitosa
        if ($stmtDeleteConcepto->num_rows > 0) {
            // Enlazar el parámetro
            $stmtDeleteConcepto->bind_param("i", $idConcepto);

            // Ejecutar la consulta DELETE
            if ($stmtDeleteConcepto->execute()) {
                $response = array('result' => 'success', 'message' => 'Registro eliminado con éxito.');
            } else {
                $response = array('result' => 'error', 'message' => 'Error al eliminar el registro: ' . $stmtDeleteConcepto->error);
            }

            // Cerrar la consulta preparada
            $stmtDeleteConcepto->close();
        } else {
            $response = array('result' => 'error', 'message' => 'Error el id no existe: ' . $conn->error);
        }

        // Cerrar la conexión a la base de datos
        $conn->close();
    }
}

// Establecer la cabecera de respuesta
header('Content-Type: application/json');
echo json_encode($response);
?>
