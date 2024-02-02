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
if (empty($data["gastoMensual"]) || empty($data["gananciaMensual"]) || empty($data["ventaPorUnidad"]) || empty($data["costoPorUnidad"]) || empty($data["idUser"]) )  {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    // Datos a insertar en la tabla "usuarios"
    $gfm = $conn->real_escape_string($data["nombreIngreso"]);
    $gap = $conn->real_escape_string($data["gananciaMensual"]);
    $vpu = $conn->real_escape_string($data["ventaPorUnidad"]);
    $cpu = $conn->real_escape_string($data["costoPorUnidad"]);
    $observacion = $conn->real_escape_string($data["observacion"]);
    $idUser = $conn->real_escape_string($data["idUser"]);

    // Verificar si el nombreConcepto ya existe para el usuario
    $sqlCheckExistence = "SELECT COUNT(*) AS count FROM rentabilidad WHERE gastoMenusal = ? AND gananciaMensual = ? AND precioVenta = ? AND costoPorUnidad = ? AND idUser = ?";
    $stmtCheckExistence = $conn->prepare($sqlCheckExistence);
    $stmtCheckExistence->bind_param("iiiii", $gfm, $gap, $vpu, $cpu, $idUser);
    $stmtCheckExistence->execute();
    $stmtCheckExistence->bind_result($count);
    $stmtCheckExistence->fetch();
    $stmtCheckExistence->close();

    if ($count > 0) {
        $sqlGetRentabilidad = "SELECT * FROM rentabilidad WHERE gastoMenusal = ? AND gananciaMensual = ? AND precioVenta = ? AND costoPorUnidad = ? AND idUser = ?";
        $stmtGetRentabilidad = $conn->prepare($sqlGetRentabilidad);
        $stmtGetRentabilidad->bind_param("iiiii", $gfm, $gap, $vpu, $cpu, $idUser);

        if ($stmtGetRentabilidad->execute()) {
            $response = array('result' => 'success1', 'message' => 'Datos obtenidos exitosamente.');
        } else {
            $response = array('result' => 'error1', 'message' => 'Error al obtener datos en la tabla "conceptos": ' . $stmtGetRentabilidad->error);
        }

        // Cerrar la declaración preparada
        $stmtGetRentabilidad->close();

    } else {
        // No hay registros existentes, procede con la inserción
        $sqlInsertRentabilidad = "INSERT INTO rentabilidad (gastoMensual, gananciaMensual, precioVenta, costoPorUnidad, Observacion, idUser) VALUES (?, ?, ?, ?, ?, ?)";
        $stmtInsertRentabilidad = $conn->prepare($sqlInsertRentabilidad);
        $stmtInsertRentabilidad->bind_param("iiiisi", $gfm, $gap, $vpu, $cpu, $observacion, $idUser);

        if ($stmtInsertRentabilidad->execute()) {
            $response = array('result' => 'success2', 'message' => 'Registro exitoso.');
        } else {
            $response = array('result' => 'error2', 'message' => 'Error al insertar datos en la tabla "conceptos": ' . $stmtInsertRentabilidad->error);
        }

        // Cerrar la declaración preparada
        $stmtInsertRentabilidad->close();
    }
}

// Devolver la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);

// Cerrar la conexión
$conn->close();
?>