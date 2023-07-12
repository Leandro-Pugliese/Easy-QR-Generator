const info = document.querySelectorAll("#inputInfo");
const boton = document.querySelectorAll("#BOTON");
const boton_otro = document.querySelectorAll("#BOTON-OTRO");
const boton_descargar = document.querySelectorAll("#BOTON-DESCARGAR");

let data = "";

boton.forEach((boton) => {
    boton.addEventListener("click", () => {
        info.forEach((info) => {
            data = info.value;
        });
        
        new QRCode(document.getElementById("qrcode"), {
            text: data,
            width: 250,
            height: 250,
            colorDark: "black",
            colorLight: "white",
        });

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
                theCanvas = canvas;
                document.body.appendChild(canvas)
                canvas.toBlob(function(blob) {
                  saveAs(blob, "Qr.png")
                });
            }
        });
    }
    boton_descargar.addEventListener("click", descargarQr);
});

