const info = document.getElementById("inputInfo");
const boton = document.getElementById("boton");
const boton_otro = document.getElementById("boton-otro");
const boton_descargar = document.getElementById("boton-descargar");
const boton_fondo = document.getElementById("cambiar-fondo");
const boton_fondo_automatico = document.getElementById("fondo-automatico");

// Variables para transferencia de datos.
let data = "";
let colorPrincipal = "";
let colorBase = "";

boton.addEventListener("click", () => {
    // Obtención del value del input.
    data = info.value;
    const msjError = document.getElementById("mensaje-error");
    if (data === "") {
        msjError.style.display = "flex";
        return msjError.innerHTML = `¡No ingresaste texto para convertir!`
    }
    // Obtención de datos de color personalizado.
    colorPrincipal = document.getElementById("colorPrincipal").value;
    colorBase = document.getElementById("colorBase").value;
    if (colorPrincipal === colorBase) {
        console.log(msjError)
        msjError.style.display = "flex";
        return msjError.innerHTML = `¡Color principal y color base no pueden ser iguales!`
    }
    msjError.style.display = "none"; // Lo volvemos a esconder por si aparecio algun msj de error antes de crear el QR.
    // Generación código QR
    new QRCode(document.getElementById("qrcode"), {
        text: data,
        width: 280,
        height: 280,
        colorDark: colorPrincipal,
        colorLight: colorBase,
    });
    // Modificación de visibilidad de los contenedores.
    document.getElementById("containerText").style.display = "none"
    document.getElementById("container-generar").style.display = "none"
    document.getElementById("containerQr").style.display = "flex"
    document.getElementById("containerQr").style.justifyContent = "center"
    document.getElementById("container-descargar").style.display = "flex"
    boton_otro.style.display = "inline";
    boton.style.display = "none";
    boton_descargar.style.display = "inline"
    info.style.display = "none";
});


const nuevoQr = () => {
    window.location.reload()
}
boton_otro.addEventListener("click", nuevoQr);


const descargarQr = () => {
    html2canvas(document.getElementById("qrcode"), {
        onrendered: function (canvas) {
            document.body.appendChild(canvas)
            // Modificamos el texto en data para que no se repita el nombre del archivo en la descarga.
            let textoDescarga = data.replaceAll(' ', '-')
            canvas.toBlob(function (blob) {
                saveAs(blob, `Qr-${textoDescarga}.png`)
            });
        }
    });
};
boton_descargar.addEventListener("click", descargarQr);

// Cambio fondo fijo manual.
let contadorFondo = 1
const cambiar = () => {
    if (contadorFondo === 5) {
        contadorFondo = 0
    }
    let fondoAleatorio = contadorFondo + 1
    if (fondoAleatorio === 1) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/horizonte.jpg)";
    } else if (fondoAleatorio === 2) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/arbolRosa.jpg)";
    } else if (fondoAleatorio === 3) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/montaña.jpg)";
    } else if (fondoAleatorio === 4) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/Volcan.jpg)";
    } else {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/oceano-montaña.jpg)";
    }
    contadorFondo ++
}
boton_fondo.addEventListener("click", cambiar);


// Cambio de fondo automático. (activación)
let fondoAutomatico = true
const activarFondoAutomatico = () => {
    if (fondoAutomatico === true) {
        boton_fondo_automatico.innerHTML = "Activar Fondo Automático"
        boton_fondo.style.display = "flex";
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/horizonte.jpg)";
        contadorFondo = 1
        return fondoAutomatico = false
    }
    if (fondoAutomatico === false) {
        boton_fondo_automatico.innerHTML = "Desactivar Fondo Automático"
        boton_fondo.style.display = "none";
        cambioDeFondoAutomatico()
        return fondoAutomatico = true
    }
    
}
boton_fondo_automatico.addEventListener("click", activarFondoAutomatico);

// Cambio de fondo automático. (ejecución)
const cambioDeFondoAutomatico = () => {
    let fondo = Math.floor(Math.random() * 5) + 1;
    if (fondo === 1) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/oceano-montaña.jpg)";
    } else if (fondo === 2) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/arbolRosa.jpg)";
    } else if (fondo === 3) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/montaña.jpg)";
    } else if (fondo === 4) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/Volcan.jpg)";
    } else {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/horizonte.jpg)";
    }
    console.log("ejecucion automatica cambio de fondo")
    setTimeout(() => {
        if (fondoAutomatico === true) {
            cambioDeFondoAutomatico()
        }
    }, 5000);
}
cambioDeFondoAutomatico()