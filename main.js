const info = document.querySelectorAll("#inputInfo");
const boton = document.querySelectorAll("#BOTON");
const boton_otro = document.querySelectorAll("#BOTON-OTRO");

let data = ""

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