const textArea = document.getElementById("inputInfo");
const select_colores = document.getElementById("select-general");
const boton_otro = document.getElementById("boton-otro");
const boton_descargar = document.getElementById("boton-descargar");
const boton_fondo = document.getElementById("cambiar-fondo");
const boton_fondo_automatico = document.getElementById("fondo-automatico");
const boton_iniciar = document.getElementById("iniciar-app");
const boton_siguiente = document.getElementById("siguiente"); 
const container_inputs = document.getElementById("containerText");
const container_qr = document.getElementById("containerQr");
const container_descargar = document.getElementById("container-descargar");
const canvas_qr_container = document.getElementById("qrcode");
const svg_qr = document.getElementById("svg-qr");

//Menu desplegable mobile
const boton_lista = document.getElementById("menu__lista");
const boton_listaClose = document.getElementById("menu__lista-close");
const ul_lista = document.getElementById("lista__desplegable");
const boton_fondo_desplegable = document.getElementById("cambiar-fondo__desplegable");
const boton_fondo_automatico_desplegable = document.getElementById("fondo-automatico__desplegable");

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
        console.log(select_colores.classList)
        //Modifico el texto del boton.
        boton_siguiente.innerHTML = `Generar QR`
        contadorBotonSiguiente ++
        console.log(contadorBotonSiguiente)
    } else if (contadorBotonSiguiente === 1) { //Generar el QR
        console.log("entre a generar el qr")
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
       indice += 2;
       contadorIndice ++;
    } else {
        canvas_qr_container.children[indice].style.display = "none";
        indice += 2;
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

// Cambio fondo fijo manual.
let contadorFondo = 1
const cambiar = () => {
    if (contadorFondo === 7) {
        contadorFondo = 0
    }
    let fondoAleatorio = contadorFondo + 1
    if (fondoAleatorio === 1) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/horizonte.jpg)";
    } else if (fondoAleatorio === 2) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/costaBrillante.jpg)";
    } else if (fondoAleatorio === 3) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/universo.jpg)";
    } else if (fondoAleatorio === 4) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/Volcan.jpg)";
    } else if (fondoAleatorio === 5) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/isla.jpg)";
    } else if (fondoAleatorio === 6) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/muelle.jpg)";
    } else {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/oceano-montaña.jpg)";
    }
    contadorFondo ++
}
boton_fondo.addEventListener("click", cambiar);


// Cambio de fondo automático. (activación / desactivación)
let fondoAutomatico = true
let menuDesplegableActivo = false
const activarFondoAutomatico = () => {
    if (fondoAutomatico === true) { //Desactivación.
        if (menuDesplegableActivo === true) {
            boton_fondo_desplegable.style.display = "flex";
        }
        boton_fondo_automatico.innerHTML = "Activar fondo automático"
        boton_fondo_automatico_desplegable.innerHTML = "Activar fondo automático"
        boton_fondo.classList.remove('hidden');
        boton_fondo.classList.add('visible2');
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/horizonte.jpg)";
        contadorFondo = 1
        return fondoAutomatico = false
    }
    if (fondoAutomatico === false) { //Activación.
        if (menuDesplegableActivo === true) {
            boton_fondo_desplegable.style.display = "none";
        }
        boton_fondo_automatico.innerHTML = "Desactivar fondo automático"
        boton_fondo_automatico_desplegable.innerHTML = "Desactivar fondo automático"
        boton_fondo.classList.remove('visible2');
        boton_fondo.classList.add('hidden');
        cambioDeFondoAutomatico()
        return fondoAutomatico = true
    }
    
}
boton_fondo_automatico.addEventListener("click", activarFondoAutomatico);

// Cambio de fondo automático. (ejecución)
const cambioDeFondoAutomatico = () => {
    let fondo = Math.floor(Math.random() * 7) + 1;
    if (fondo === 1) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/oceano-montaña.jpg)";
    } else if (fondo === 2) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/costaBrillante.jpg)";
    } else if (fondo === 3) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/universo.jpg)";
    } else if (fondo === 4) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/Volcan.jpg)";
    } else if (fondo === 5) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/muelle.jpg)";
    } else if (fondo === 6) {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/isla.jpg)";
    } else {
        document.getElementById("body").style.backgroundImage = "url(./assests/imagenes/horizonte.jpg)";
    }
    setTimeout(() => {
        if (fondoAutomatico === true) {
            cambioDeFondoAutomatico()
        }
    }, 5000);
}
cambioDeFondoAutomatico()


// Funcionalidades menu desplegable para mobile.
const activarMenu = () => {
    ul_lista.classList.remove('hidden');
    ul_lista.classList.add('visible2');
    boton_listaClose.style.display = "flex"
    boton_listaClose.style.marginLeft = "25rem"
    boton_lista.style.display = "none"
    menuDesplegableActivo = true
}
boton_lista.addEventListener("click", activarMenu);

const desactivarMenu = () => {
    ul_lista.classList.remove('visible2');
    ul_lista.classList.add('hidden');
    boton_listaClose.style.display = "none"
    boton_lista.style.display = "flex"
    menuDesplegableActivo = false
}
boton_listaClose.addEventListener("click", desactivarMenu);

boton_fondo_automatico_desplegable.addEventListener("click", activarFondoAutomatico);
boton_fondo_desplegable.addEventListener("click", cambiar);