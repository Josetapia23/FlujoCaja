<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$idConcepto = null;
$fecha1 = null;
$fecha2 = null;

if (empty($data["idUser"]) || empty($data["idTipo"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idUser = $conn->real_escape_string($data["idUser"]);
        $idTipo = $conn->real_escape_string($data["idTipo"]);
        // Verificar si los campos opcionales están presentes y asignarlos si es necesario
        if (isset($data["idConcepto"])) {
            $idConcepto = $conn->real_escape_string($data["idConcepto"]);
        }
        if (isset($data["fecha1"])) {
            $fecha1 = new DateTime($conn->real_escape_string($data["fecha1"]));
            $fecha1->setTime(0, 0, 0);
            $fecha1 = $fecha1->format('Y-m-d H:i:s');
        }
        if (isset($data["fecha2"])) {
            $fecha2 = new DateTime($conn->real_escape_string($data["fecha2"]));
            $fecha2->setTime(23, 59, 59);
            $fecha2 = $fecha2->format('Y-m-d H:i:s');
        }

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
        $stmt->close(); // Cerrar la tercera consulta preparada

        
        $sql2 = "SELECT m.id, m.monto, c.nombreConcepto, t.nombreTipo, m.fecha, m.descripcion
                FROM movimientos m
                JOIN conceptos c ON c.id = m.idConcepto
                JOIN tipos t ON t.id = m.idTipo
                WHERE m.idUser = ? AND m.idTipo = ?
                AND m.idConcepto= ?
                ORDER BY m.fecha";

            $stmt2 = $conn->prepare($sql2);
            $stmt2->bind_param("iii", $idUser, $idTipo, $idConcepto);
            $stmt2->execute();
            $stmt2->bind_result($idMov, $montoMov, $nombreConceptoMov, $nombreTipoMov, $fechaMov, $descripcion);

            $listMovimientos2 = array();
            while ($stmt2->fetch()) {
                // Formatear el monto antes de agregarlo al array
                $montoMov = number_format($montoMov);
                $listMovimientos2[] = array(
                    'id' => $idMov,
                    'monto' => $montoMov,
                    'nombreConcepto' => $nombreConceptoMov,
                    'nombreTipo' => $nombreTipoMov,
                    'fecha' => $fechaMov,
                    'descripcion' => $descripcion
                );
            }
            $stmt2->close(); // Cerrar la tercera consulta preparada

            // Obtener el monto total
            $sql3 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser= ? AND m.fecha BETWEEN ? AND ?";
            $stmt3 = $conn->prepare($sql3);
            $stmt3->bind_param("iss", $idUser, $fecha1, $fecha2);
            $stmt3->execute();
            $stmt3->bind_result($montoTotal);

            if ($stmt3->fetch()) {
                $montoTotal = number_format($montoTotal);
            } else {
                $montoTotal = 0; // O algún valor predeterminado si no hay resultados
            }

            $stmt3->close(); // Cerrar la tercera consulta preparada


            $sql4 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser= ? AND m.idConcepto = ?";
            $stmt4 = $conn->prepare($sql4);
            $stmt4->bind_param("ss", $idUser, $idConcepto);
            $stmt4->execute();
            $stmt4->bind_result($montoTotal2);

            if ($stmt4->fetch()) {
                $montoTotal2 = number_format($montoTotal2);
            } else {
                $montoTotal2 = 0; // O algún valor predeterminado si no hay resultados
            }


            $stmt4->close(); // Cerrar la tercera consulta preparada


        


        $response = array('result' => 'success',
            'message' => 'Registros obtenidos exitosamente',
            'listaMovimientos3' => $listMovimientos,
            'listaMovimientos4' => $listMovimientos2,
            'montoTotal' => $montoTotal,
            'monTotal2' => $montoTotal2);

        $conn->autocommit(true); // Restaurar modo autocommit
    }

    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
