let servicioSeleccionado = '';
let reciboGuardado = false;
function seleccionarServicio(servicio) {
    servicioSeleccionado = servicio;
    alert(`Servicio seleccionado: ${servicio.charAt(0).toUpperCase() + servicio.slice(1)}`);
}
function guardarRecibo() {
    const nombre = document.getElementById("nombre").value;
    const referencia = document.getElementById("referencia").value;
    const consumo = document.getElementById("consumo").value;
    if (nombre && referencia && consumo) {
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('referencia', referencia);
        localStorage.setItem('consumo', consumo);
        localStorage.setItem('servicio', servicioSeleccionado);
        document.getElementById("nombre").disabled = true;
        document.getElementById("referencia").disabled = true;
        document.getElementById("consumo").disabled = true;
        document.querySelector("button[onclick='guardarRecibo()']").disabled = true;
        document.querySelector("button[onclick='modificarRecibo()']").disabled = false;
        reciboGuardado = true;
        alert("Recibo guardado correctamente.");
    } else {
        alert("Por favor, complete todos los campos antes de guardar.");
    }
}
function modificarRecibo() {
    if (!reciboGuardado) {
        alert("No se ha guardado un recibo aún.");
        return;
    }
    document.getElementById("nombre").disabled = false;
    document.getElementById("referencia").disabled = false;
    document.getElementById("consumo").disabled = false;
    document.querySelector("button[onclick='guardarRecibo()']").disabled = false;
    document.querySelector("button[onclick='modificarRecibo()']").disabled = true;
    alert("Campos habilitados para modificar.");
}
function generarRecibo() {
    if (!reciboGuardado) {
        alert("Primero debe guardar un recibo.");
        return;
    }
    document.getElementById("resultado").style.display = "block";
    document.getElementById("resultadoNombre").innerText = `Nombre: ${document.getElementById("nombre").value}`;
    document.getElementById("resultadoReferencia").innerText = `Referencia: ${document.getElementById("referencia").value}`;
    document.getElementById("resultadoConsumo").innerText = `Consumo: ${document.getElementById("consumo").value}`;
}
function consultarValor() {
    const consumo = parseFloat(document.getElementById("consumo").value);
    let total = 0;
    switch (servicioSeleccionado) {
        case 'agua':
            total = consumo * 730;
            break;
        case 'gas':
            total = consumo * 710;
            break;
        case 'energia':
            total = consumo * 536;
            break;
        default:
            alert("Seleccione un servicio.");
            return;
    }
    document.getElementById("resultadoTotal").innerText = `Total a pagar: $${total.toFixed(2)}`;
}
function pagar() {
    if (!reciboGuardado) {
        alert("Primero debe guardar un recibo.");
        return;
    }
    document.getElementById("pago").style.display = "block";
    document.getElementById("confirmacionPago").style.display = "none";
}
function mostrarCamposPago() {
    const tipoPago = document.getElementById("tipoPago").value;
    if (tipoPago === "tarjeta" || tipoPago === "paypal") {
        document.getElementById("camposPago").style.display = "block";
    } else {
        document.getElementById("camposPago").style.display = "none";
    }
}
function confirmarPago() {
    const tipoPago = document.getElementById("tipoPago").value;
    const numeroCuenta = document.getElementById("numeroCuenta").value;
    const contraseña = document.getElementById("contraseña").value;

    if (tipoPago && numeroCuenta && contraseña) {
        document.getElementById("confirmacionPago").style.display = 'block';
        alert("¡Pago realizado con éxito!");
        document.getElementById("pago").style.display = "none";
        document.querySelector("button[onclick='pagar()']").disabled = true;
    } else {
        alert("Por favor, complete todos los campos antes de pagar.");
    }
}
function salir() {
    alert("Saliendo de la aplicación...");
    window.close();
}