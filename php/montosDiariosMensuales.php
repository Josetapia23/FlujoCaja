<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idUser"]) || empty($data["idTipo"]) || empty($data["fecha1"]) || empty($data["fecha2"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idUser = $conn->real_escape_string($data["idUser"]);
        $idTipo = $conn->real_escape_string($data["idTipo"]);
        $fecha1 = $conn->real_escape_string($data["fecha1"])+" 00:00:00";
        $fecha2 = $conn->real_escape_string($data["fecha2"])+" 23:59:59";

        $conn->autocommit(false); // Iniciar transacción

        // Obtener departamentos
        $sql = "SELECT m.id, m.monto, c.nombreConcepto, t.nombreTipo, m.fecha, m.descripcion
                FROM movimientos m
                JOIN conceptos c ON c.id = m.idConcepto
                JOIN tipos t ON t.id = m.idTipo
                WHERE m.idUser = ? AND m.idTipo = ?
                AND m.fecha BETWEEN ? AND ?
                ORDER BY m.fecha";

        // Utilizar consultas preparadas para evitar inyección SQL
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiss", $idUser, $idTipo, $fecha1, $fecha2);
        $stmt->execute();
        $stmt->bind_result($idMov, $montoMov, $nombreConceptoMov, $nombreTipoMov, $fechaMov, $descripcion);

        $listMovimientos = array();
        while ($stmt->fetch()) {
            // Formatear el monto antes de agregarlo al array
            $montoMov = number_format($montoMov);
            $listMovimientos[] = array(
                'id' => $idMov,
                'monto' => $montoMov,
                'nombreConcepto' => $nombreConceptoMov,
                'nombreTipo' => $nombreTipoMov,
                'fecha' => $fechaMov,
                'descripcion' => $descripcion
            );
        }
        $stmt->close(); /


        // Obtener el monto total
        $sql3 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.fecha BETWEEN ? AND ? AND m.idTipo= ?";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param("ss", $fecha1, $fecha2);
        $stmt3->execute();
        $stmt3->bind_result($montoTotal);

        if ($stmt3->fetch()) {
            $montoTotal = number_format($montoTotal);
        } else {
            $montoTotal = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt3->close(); // Cerrar la tercera consulta preparada

        $response = array('result' => 'success',
            'message' => 'Registros obtenidos exitosamente',
            'listaMovimientos3' => $listMovimientos,
            'montoTotal' => $montoTotal);

        $conn->autocommit(true); // Restaurar modo autocommit
    }

    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
