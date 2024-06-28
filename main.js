const textArea = document.getElementById("inputInfo");
const select_colores = document.getElementById("select-general");
const boton_otro = document.getElementById("boton-otro");
const boton_descargar = document.getElementById("boton-descargar");
const boton_iniciar = document.getElementById("iniciar-app");
const boton_siguiente = document.getElementById("siguiente"); 
const container_inputs = document.getElementById("containerText");
const container_qr = document.getElementById("containerQr");
const container_descargar = document.getElementById("container-descargar");
const canvas_qr_container = document.getElementById("qrcode");
const svg_qr = document.getElementById("svg-qr");

// Variables para transferencia de datos.
let data = "";
let colorPrincipal = "";
let colorBase = "";

const iniciarApp = () => {
    textArea.classList.remove('hidden');
    textArea.classList.add('visible');
    boton_siguiente.classList.remove('hidden');
    boton_siguiente.classList.add('visible2');
    boton_iniciar.classList.add('hidden');
    svg_qr.classList.add('hidden');
}
boton_iniciar.addEventListener("click", iniciarApp);

let contadorBotonSiguiente = 0
const siguientePaso = () => {
    const msjError = document.getElementById("mensaje-error");
    if (contadorBotonSiguiente === 0) { //Paso de textarea a select colores.
        // Obtención del value del textarea.
        data = textArea.value;
        if (data === "") {
            msjError.style.display = "flex";
            return msjError.innerHTML = `¡No ingresaste texto para convertir!`
        }
        msjError.style.display = "none"; // Lo volvemos a esconder por si aparecio por data vacia.
        //Escondo el textarea.
        textArea.classList.remove('visible');
        textArea.classList.add('hidden');
        //Muestro los select colores
        select_colores.classList.remove('hidden');
        select_colores.classList.add('visible');
        //Modifico el texto del boton.
        boton_siguiente.innerHTML = `Generar QR`
        contadorBotonSiguiente ++
    } else if (contadorBotonSiguiente === 1) { //Generar el QR
        // Obtención de datos de color personalizado.
        colorPrincipal = document.getElementById("colorPrincipal").value;
        colorBase = document.getElementById("colorBase").value;
        if (colorPrincipal === colorBase) {
            msjError.style.display = "flex";
            return msjError.innerHTML = `¡Color principal y color base no pueden ser iguales!`
        }
        msjError.style.display = "none"; // Lo volvemos a esconder por si aparecio por colores iguales.
        // Generación código QR
        new QRCode(document.getElementById("qrcode"), {
            text: data,
            width: 280,
            height: 280,
            colorDark: colorPrincipal,
            colorLight: colorBase,
        });
        // Modificación de visibilidad de los contenedores.
        container_inputs.style.display = "none"
        container_qr.style.display = "flex"
        container_qr.style.justifyContent = "center"
        container_descargar.style.display = "flex"
    }
}   
boton_siguiente.addEventListener("click", siguientePaso)

let contadorIndice = 1
let indice = 1
let indiceCanvas = 0
const nuevoQr = () => {
    // Limpio los valores para un nuevo qr
    data = "";
    colorPrincipal = "";
    colorBase = "";
    // Limpio el texto del textarea
    textArea.value = ``
    // Muestro textartea.
    textArea.classList.remove('hidden');
    textArea.classList.add('visible');
    // Escondo select colores.
    select_colores.classList.remove('visible');
    select_colores.classList.add('hidden');
    // Cambio los display de los containers.
    container_inputs.style.display = "flex";
    container_qr.style.display = "none";
    container_descargar.style.display = "none";
    // Paso a display none los canvas de los qr generados anteriormente para solo mostrar el ultimo en pantalla.
    if (contadorIndice === 1) {
       canvas_qr_container.children[indice].style.display = "none";
       canvas_qr_container.children[indiceCanvas].style.display = "none";
       indice += 2;
       indiceCanvas += 2
       contadorIndice ++;
    } else {
        canvas_qr_container.children[indice].style.display = "none";
        canvas_qr_container.children[indiceCanvas].style.display = "none";
        indice += 2;
        indiceCanvas += 2
        contadorIndice ++;
    }
    contadorBotonSiguiente = 0
    boton_siguiente.innerHTML = `Siguiente`
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
