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
        $sql = "SELECT * FROM departamentos";
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
            $resultMunicipios = $stmtSql2->get_result();
            $municipios = array();

            while ($rowMunicipio = $resultMunicipios->fetch_assoc()) {
                $municipios[] = $rowMunicipio;
            }

            $sql3 = "SELECT m.id_municipio, m.municipio FROM municipios AS m WHERE m.departamento_id = ? ORDER BY m.id_municipio ASC LIMIT 1";
            $stmtSql3 = $conn->prepare($sql3);
            $stmtSql3->bind_param("i", $idDepar);
            $stmtSql3->execute();
            $resultMunicipio1 = $stmtSql3->get_result();
            $municipio1 = array();
            while ($rowMunicipio1 = $resultMunicipio1->fetch_assoc()) {
                $municipio1[] = $rowMunicipio1;
            }

            $response = array('result' => 'success', 'message' => 'Registros obtenidos exitosamente',  'municipio1' => $municipio1, 'departamentos' => $departamentos, 'municipios' => $municipios);
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
