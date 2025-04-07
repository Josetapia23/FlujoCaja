<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idUser"]) || empty($data["idEmprendimiento"]) ) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idUser = $conn->real_escape_string($data["idUser"]);
        $idIngreso = 1;
        $idGasto = 2;
        $fecha1 = date("Y-m-d")." 00:00:00"; //Dia actual
        $fecha2 = date("Y-m-d")." 23:59:59"; //Dia actual
        $currentMonth = date('m'); //Mes actual
        $idEmprendimiento = $conn->real_escape_string($data["idEmprendimiento"]);
        $conn->autocommit(false); // Iniciar transacción


        // Obtener el monto total del mes actual sobre ingresos
        $sql1 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND MONTH(m.fecha) = ? AND m.idEmprendimiento=?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->bind_param("iisi", $idUser, $idIngreso, $currentMonth, $idEmprendimiento);
        $stmt1->execute();
        $stmt1->bind_result($montoIngresoMes);

        if ($stmt1->fetch()) {
            $montoIngresoMes = number_format($montoIngresoMes);
        } else {
            $montoIngresoMes = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt1->close(); // Cerrar consulta

         // Obtener el monto total del mes actual sobre gastos
       $sql2 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND MONTH(m.fecha) = ? AND m.idEmprendimiento=?";
       $stmt2 = $conn->prepare($sql2);
       $stmt2->bind_param("iisi", $idUser, $idGasto, $currentMonth, $idEmprendimiento);
       $stmt2->execute();
       $stmt2->bind_result($montoGastoMes);

       if ($stmt2->fetch()) {
           $montoGastoMes = number_format($montoGastoMes);
       } else {
           $montoGastoMes = 0; // O algún valor predeterminado si no hay resultados
       }

       $stmt2->close(); // Cerrar consulta

        // Obtener el monto total del dia actual sobre ingresos
        $sql3 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND m.fecha BETWEEN ? AND ? AND m.idEmprendimiento=?";
        $stmt3 = $conn->prepare($sql3);
        $stmt3->bind_param("iissi", $idUser, $idIngreso, $fecha1, $fecha2, $idEmprendimiento);
        $stmt3->execute();
        $stmt3->bind_result($montoIngresoDiario);

        if ($stmt3->fetch()) {
            $montoIngresoDiario = number_format($montoIngresoDiario);
        } else {
            $montoIngresoDiario = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt3->close(); // Cerrar la tercera consulta preparada

        // Obtener el monto total del dia actual sobre gastos
        $sql4 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND m.fecha BETWEEN ? AND ? AND m.idEmprendimiento=?";
        $stmt4 = $conn->prepare($sql4);
        $stmt4->bind_param("iissi", $idUser, $idGasto, $fecha1, $fecha2, $idEmprendimiento);
        $stmt4->execute();
        $stmt4->bind_result($montoGastoDiario);

        if ($stmt4->fetch()) {
            $montoGastoDiario = number_format($montoGastoDiario);
        } else {
            $montoGastoDiario = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt4->close(); // Cerrar consulta

        $response = array('result' => 'success',
            'message' => 'Registros obtenidos exitosamente',
            'ingresoDiario' => $montoIngresoDiario,
            'gastoDiario' => $montoGastoDiario,
            'ingresoMensual' => $montoIngresoMes,
            'gastoMensual' => $montoGastoMes);

        $conn->autocommit(true); // Restaurar modo autocommit
    }

    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
