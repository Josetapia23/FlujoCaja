<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idUser"]) || empty($data["idTipo"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idUser = $conn->real_escape_string($data["idUser"]);
        $idTipo = $conn->real_escape_string($data["idTipo"]);

        $conn->autocommit(false); // Iniciar transacción

        // Obtener departamentos
        $sql = "SELECT mo.id, mo.monto, mo.nombreConcepto, mo.nombreTipo, mo.fecha
                FROM (
                    SELECT m.id, m.monto, c.nombreConcepto, t.nombreTipo, m.fecha
                    FROM movimientos m
                    JOIN conceptos c ON c.id = m.idConcepto
                    JOIN tipos t ON t.id = m.idTipo
                    WHERE m.idUser = ? AND m.idTipo = ?
                    ORDER BY m.fecha DESC
                    LIMIT 10
                ) AS mo
                ORDER BY mo.fecha;";

        // Utilizar consultas preparadas para evitar inyección SQL
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $idUser, $idTipo);
        $stmt->execute();
        $stmt->bind_result($idMov, $montoMov, $nombreConceptoMov, $nombreTipoMov, $fechaMov);

        $listMovimientos = array();
        while ($stmt->fetch()) {
            // Formatear el monto antes de agregarlo al array
            $montoMov = number_format($montoMov);
            $listMovimientos[] = array(
                'id' => $idMov,
                'monto' => $montoMov,
                'nombreConcepto' => $nombreConceptoMov,
                'nombreTipo' => $nombreTipoMov,
                'fecha' => $fechaMov
            );
        }

        $stmt->close(); // Cerrar la consulta preparada para liberar los resultados

        $currentMonth = date('m');

        $sql2 = "SELECT m.id, m.monto, c.nombreConcepto, t.nombreTipo, m.fecha, m.descripcion
                    FROM movimientos m
                    JOIN conceptos c ON c.id = m.idConcepto
                    JOIN tipos t ON t.id = m.idTipo
                    WHERE m.idUser = ? AND m.idTipo = ?
                    AND MONTH(m.fecha) = ?
                    ORDER BY m.fecha";

        $stmt2 = $conn->prepare($sql2);
        $stmt2->bind_param("iii", $idUser, $idTipo, $currentMonth);
        $stmt2->execute();
        $stmt2->bind_result($idMov2, $montoMov2, $nombreConceptoMov2, $nombreTipoMov2, $fechaMov2, $descripcionMov2);

        $listMovimientos2 = array();
        while ($stmt2->fetch()) {
            // Formatear el monto antes de agregarlo al array
            $montoMov2 = number_format($montoMov2);
            $listMovimientos2[] = array(
                'id' => $idMov2,
                'monto' => $montoMov2,
                'nombreConcepto' => $nombreConceptoMov2,
                'nombreTipo' => $nombreTipoMov2,
                'fecha' => $fechaMov2,
                'descripcion' => $descripcionMov2
            );
        }

        $stmt2->close(); // Cerrar la segunda consulta preparada

        // Obtener el monto total
        $sql3 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE MONTH(m.fecha) = ?";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param("i", $currentMonth);
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
            'listaMovimientos' => $listMovimientos,
            'listMovimientos2' => $listMovimientos2,
            'montoTotal' => $montoTotal);

        $conn->autocommit(true); // Restaurar modo autocommit
    }

    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
