<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idUser"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idUser = $conn->real_escape_string($data["idUser"]);

        $conn->autocommit(false); // Iniciar transacción

        // Obtener departamentos
        $sql = "SELECT mo.id, mo.monto, mo.nombreConcepto, mo.nombreTipo, mo.fecha
        FROM (
            SELECT m.id, m.monto, c.nombreConcepto, t.nombreTipo, m.fecha
            FROM movimientos m
            JOIN conceptos c ON c.id = m.idConcepto
            JOIN tipos t ON t.id = m.idTipo
            WHERE m.idUser = $idUser
            ORDER BY m.fecha DESC
            LIMIT 10
        ) AS mo
        ORDER BY mo.fecha;" ;

        $result = $conn->query($sql);

        if ($result) {
            $listMovimientos = array();

            while ($row = $result->fetch_assoc()) {
                // Formatear el monto antes de agregarlo al array
                $row['monto'] = number_format($row['monto']);
                $listMovimientos[] = $row;
            }
            // $currentMonth = date('m');

            // $sql = "SELECT m.id, m.monto, c.nombreConcepto, t.nombreTipo, m.fecha 
            //         FROM movimientos m, conceptos c, tipos t 
            //         WHERE m.idUser=$idUser AND c.id = m.idConcepto AND t.id = m.idTipo
            //         AND MONTH(m.fecha) = $currentMonth";

            $response = array('result' => 'success', 'message' => 'Registros obtenidos exitosamente', 'listaMovimientos' => $listMovimientos);
        } else {
            $response = array('result' => 'error', 'message' => 'Error en la consulta: ' . $conn->error);
        }

        $conn->autocommit(true); // Restaurar modo autocommit
    }
    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
