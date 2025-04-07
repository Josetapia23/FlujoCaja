<?php
require('config.db.php');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (empty($data["idUser"]) || empty($data["idEmprendimiento"])) {
    $response = array('result' => 'error', 'message' => 'Faltan campos requeridos.');
} else {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        $response = array('result' => 'error', 'message' => 'Error de conexión a la base de datos: ' . $conn->connect_error);
    } else {
        $idUser = $conn->real_escape_string($data["idUser"]);
        $currentDate = date("Y-m-d"); // Fecha actual
        $currentMonth = date('m'); // Mes actual
        $idIngreso = 1;
        $idGasto = 2;
        $idEmprendimiento = $conn->real_escape_string($data["idEmprendimiento"]);
        $conn->autocommit(false); // Iniciar transacción

        // Obtener el monto total del mes actual sobre ingresos
        $sql1 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND MONTH(m.fecha) = ? AND m.idEmprendimiento=?";
        $stmt1 = $conn->prepare($sql1);
        $stmt1->bind_param("iisi", $idUser, $idIngreso, $currentMonth, $idEmprendimiento); // idIngreso = 1
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
        $stmt2->bind_param("iisi", $idUser, $idGasto, $currentMonth, $idEmprendimiento); // idGasto = 2
        $stmt2->execute();
        $stmt2->bind_result($montoGastoMes);

        if ($stmt2->fetch()) {
            $montoGastoMes = number_format($montoGastoMes);
        } else {
            $montoGastoMes = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt2->close(); // Cerrar consulta

        // Obtener el monto total del día actual sobre ingresos
        $sql3 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND m.fecha BETWEEN ? AND ? AND m.idEmprendimiento=?";
        $stmt3 = $conn->prepare($sql3);
        $fechaInicio3 = $currentDate . ' 00:00:00';
        $fechaFin3 = $currentDate . ' 23:59:59';
        $stmt3->bind_param("iissi", $idUser, $idIngreso, $fechaInicio3, $fechaFin3, $idEmprendimiento); // idIngreso = 1
        $stmt3->execute();
        $stmt3->bind_result($montoIngresoDiario);

        if ($stmt3->fetch()) {
            $montoIngresoDiario = number_format($montoIngresoDiario);
        } else {
            $montoIngresoDiario = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt3->close(); // Cerrar consulta

        // Obtener el monto total del día actual sobre gastos
        $sql4 = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND m.fecha BETWEEN ? AND ? AND m.idEmprendimiento=?";
        $stmt4 = $conn->prepare($sql4);
        $fechaInicio4 = $currentDate . ' 00:00:00';
        $fechaFin4 = $currentDate . ' 23:59:59';
        $stmt4->bind_param("iissi", $idUser, $idGasto, $fechaInicio4, $fechaFin4, $idEmprendimiento); // idGasto = 2
        $stmt4->execute();
        $stmt4->bind_result($montoGastoDiario);

        if ($stmt4->fetch()) {
            $montoGastoDiario = number_format($montoGastoDiario);
        } else {
            $montoGastoDiario = 0; // O algún valor predeterminado si no hay resultados
        }

        $stmt4->close(); // Cerrar consulta

        // Obtener los montos por intervalo
        $intervalos = array(
            array("00:00:00", "03:59:59"),
            array("04:00:00", "07:59:59"),
            array("08:00:00", "11:59:59"),
            array("12:00:00", "15:59:59"),
            array("16:00:00", "19:59:59"),
            array("20:00:00", "23:59:59")
        );

        $resultadosIngresos = array();
        $resultadosGastos = array();

        foreach ($intervalos as $intervalo) {
            // Consulta para ingresos por intervalo
            $sqlIngresos = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND m.fecha BETWEEN ? AND ? AND m.idEmprendimiento=?";
            $stmtIngresos = $conn->prepare($sqlIngresos);
            $fechaInicioIngresos = $currentDate . ' ' . $intervalo[0];
            $fechaFinIngresos = $currentDate . ' ' . $intervalo[1];
            $stmtIngresos->bind_param("iissi", $idUser, $idIngreso, $fechaInicioIngresos, $fechaFinIngresos, $idEmprendimiento);
            $stmtIngresos->execute();
            $stmtIngresos->bind_result($montoIngresos);

            if ($stmtIngresos->fetch()) {
                $montoIngresos = number_format($montoIngresos);
            } else {
                $montoIngresos = 0; // O algún valor predeterminado si no hay resultados
            }

            $stmtIngresos->close(); // Cerrar consulta preparada

            // Consulta para gastos por intervalo
            $sqlGastos = "SELECT SUM(m.monto) as total FROM movimientos m WHERE m.idUser =? AND m.idTipo=? AND m.fecha BETWEEN ? AND ? AND m.idEmprendimiento=?";
            $stmtGastos = $conn->prepare($sqlGastos);
            $fechaInicioGastos = $currentDate . ' ' . $intervalo[0];
            $fechaFinGastos = $currentDate . ' ' . $intervalo[1];
            $stmtGastos->bind_param("iissi", $idUser, $idGasto, $fechaInicioGastos, $fechaFinGastos, $idEmprendimiento);
            $stmtGastos->execute();
            $stmtGastos->bind_result($montoGastos);

            if ($stmtGastos->fetch()) {
                $montoGastos = number_format($montoGastos);
            } else {
                $montoGastos = 0; // O algún valor predeterminado si no hay resultados
            }

            $stmtGastos->close(); // Cerrar consulta preparada

            // Agregar los resultados al array correspondiente
            $resultadosIngresos[] = $montoIngresos;
            $resultadosGastos[] = $montoGastos;
        }

        $response = array('result' => 'success',
            'message' => 'Registros obtenidos exitosamente',
            'ingresoDiario' => $montoIngresoDiario,
            'gastoDiario' => $montoGastoDiario,
            'ingresoMensual' => $montoIngresoMes,
            'gastoMensual' => $montoGastoMes,
            'ingresoPorIntervalo' => $resultadosIngresos,
            'gastoPorIntervalo' => $resultadosGastos);

        $conn->autocommit(true); // Restaurar modo autocommit
    }

    $conn->close();
}

header('Content-Type: application/json');
echo json_encode($response);
?>
