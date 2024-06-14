# Easy-QR-Generator

Utiliza 3 librerias:
La primera, genera el QR, es la libreria qrCode.
La segunda, trasnforma el qr en un canvas, es la libreria html2canvas.
La tercera, fileSaver, permite descargar el qr como imagen en formato ".png".

No hace falta instalar ninguna dependencia ni paquete, solo utiliza JS vanilla, HTML 5 y Css.

Su funcionamiento se basa en generar un código QR utilizando el comando new QRCode() y pasandole los parámetros necesarios. Ancho y alto estan por defecto, en cambio el texto y los colores son perzonalizables por el usuario.
