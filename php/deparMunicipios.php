<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idDepar"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        // $estado = $conn->real_escape_string($data["estado"]);
        // $idUser = $conn->real_escape_string($data["idUser"]);
        $idDepar = $conn->real_escape_string($data["idDepar"]);

        $conn->autocommit(false); // Iniciar transacción

        // Obtener departamentos
        $sql = "SELECT * FROM departamentos2";
        $result = $conn->query($sql);

        if ($result) {
            $departamentos = array();

            while ($row = $result->fetch_assoc()) {
                $departamentos[] = $row;
            }

            // Obtener municipios
            $sql2 = "SELECT m.id_municipio, m.municipio FROM municipios as m WHERE m.departamento_id=?";
            $stmtSql2 = $conn->prepare($sql2);
            $stmtSql2->bind_param("i", $idDepar);
            $stmtSql2->execute();
            $stmtSql2->bind_result($id_municipio, $municipio);
            $municipios = array();

            while ($stmtSql2->fetch()) {
                $municipios[] = array('id_municipio' => $id_municipio, 'municipio' => $municipio);
            }

            $sql3 = "SELECT m.id_municipio, m.municipio FROM municipios AS m WHERE m.departamento_id = ? ORDER BY m.id_municipio ASC LIMIT 1";
            $stmtSql3 = $conn->prepare($sql3);
            $stmtSql3->bind_param("i", $idDepar);
            $stmtSql3->execute();
            $stmtSql3->bind_result($municipio1_id, $municipio1_nombre);

            $municipio1 = array();
            while ($stmtSql3->fetch()) {
                $municipio1[] = array('id_municipio' => $municipio1_id, 'municipio' => $municipio1_nombre);
            }

            $response = array('result' => 'success', 'message' => 'Registros obtenidos exitosamente', 'municipio1' => $municipio1, 'departamentos' => $departamentos, 'municipios' => $municipios);
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
