const info = document.querySelectorAll("#inputInfo");
const boton = document.querySelectorAll("#BOTON");
const boton_otro = document.querySelectorAll("#BOTON-OTRO");
const boton_descargar = document.querySelectorAll("#BOTON-DESCARGAR");

// Variables para transferencia de datos.
let data = "";
let colorPrincipal = "";
let colorBase = "";

boton.forEach((boton) => {
    boton.addEventListener("click", () => {
        // Obtención del value del input.
        info.forEach((info) => {
            data = info.value;
        });
        
        if (data === "") {
            return alert("¡No ingresaste texto!");
        }
        // Obtención de datos de color personalizado.
        colorPrincipal = document.getElementById("colorPrincipal").value;
        colorBase = document.getElementById("colorBase").value;
        
        // Generación código QR
        new QRCode(document.getElementById("qrcode"), {
            text: data,
            width: 256,
            height: 256,
            colorDark: colorPrincipal,
            colorLight: colorBase,
        });
        
        // Modificación de visibilidad de los contenedores.
        document.getElementById("containerText").style.display = "none"
        document.getElementById("container-generar").style.display = "none"
        document.getElementById("containerQr").style.display = "flex"
        document.getElementById("containerQr").style.justifyContent = "center"
        document.getElementById("container-descargar").style.display = "flex"
        boton_otro.forEach((boton_otro) => {
            boton_otro.style.display = "inline";
            boton.style.display = "none";
            boton_descargar.forEach((boton_descargar) => {
                boton_descargar.style.display = "inline"
            });
            info.forEach((info) => {
                info.style.display = "none";
            });
        });
    });
});


boton_otro.forEach((boton_otro) => {
    const nuevoQr = () => {
        window.location.reload()
    }
    boton_otro.addEventListener("click", nuevoQr);
});


boton_descargar.forEach((boton_descargar) => {
    const descargarQr = () => {
        html2canvas(document.getElementById("qrcode"), {
            onrendered: function(canvas) {
                //theCanvas = canvas;
                document.body.appendChild(canvas)
                canvas.toBlob(function(blob) {
                  saveAs(blob, "Qr.png")
                });
            }
        });
        setTimeout(() => {
            alert("QR Descargado")
            window.location.reload()
        }, 100);
    };
    boton_descargar.addEventListener("click", descargarQr);
});

