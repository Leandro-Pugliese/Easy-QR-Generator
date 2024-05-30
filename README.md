# Easy-QR-Generator

Utiliza 3 librerias:
La primera es para generar el QR es la libreria qrCode.
La segunda es para transformar el qr en un canvas, es la libreria html2canvas.
La tercera es la libreria fileSaver, este última es para descargar el qr en formato png como imagen.

No hace falta instalar ninguna dependencia ni paquete, solo utiliza JS vanilla, HTML 5 y Css.

Su funcionamiento se basa en generar un código QR utilizando el comando new QRCode() y pasandole los parámetros necesarios. Ancho y alto estan por defecto, en cambio el texto y los colores son perzonalizables para el usuario.

Pueden probarla en https://easy-qr-generator-chi.vercel.app/
