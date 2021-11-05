const palabras = ['CABALLO', 'GATO', 'PERRO', 'CONEJO', 'ÑANDU', 'AGUILA'
,'PEZ','OSO','ARAÑA','HORMIGA','LECHUZA','GALLINA','COYOTE','OVEJA','VACA'
,'PINGUINO','TORTUGA','RATON','RATA','NUTRIA','ABEJA','GRILLO','MARMOTA'
,'CASTOR','ARDILLA','PIOJO','GUSANO','MARIPOSA','LOMBRIZ','PAJARO','LEON'
,'TIGRE','ZEBRA','GIRAFA','RINOCERONTE','HIPOPOTAMO','HIENA','ALCE','PUMA'
,'LEOPARDO','GAZELA','GAVIOTA','FOCA','MORZA','CARACOL','TIBURON','YAGUARETE'
,'PAVO','BISONTE'];
const palabraoculta = document.querySelector('.palabraoculta');
/* const errores = document.querySelector('.errores'); */
const imagen = document.querySelector('.img-pupi');

let palabra;
let letras;
let letrasGuiones = [];
let guiones = '';
let cantidadErrores = 1;
let letrasIncorrectas = [];
let letrasErrores = '';
let botones =[]

window.onload = () => {

    
    botones = document.querySelectorAll('.btn');
    const botonR = document.querySelector('.btn-r');

    botones.forEach(boton => {
        boton.addEventListener('click', probarLetra);
    })

    botonR.addEventListener('click', reiniciarJuego);

    elegirPalabra();
}

function probarLetra(e) {
    e.target.disabled = true
    comprobarLetra(e.target.value); 
}

function elegirPalabra() {

    palabra = palabras[Math.floor(Math.random() * (47 - 1)) + 1];
    guionarPalabra();
}

function guionarPalabra() {
    letras = [...palabra];

    for (let i = 0; i < letras.length; i++) {
        letrasGuiones.push('-');
    }
    cargarPalabraOculta(letrasGuiones);
}

function comprobarLetra(letra) {

    if (letras.includes(letra)) {
        modificarLetras(letra);
    } else {
        cantidadErrores++;
        letrasIncorrectas.push(letra);
        cambiarImagen();
    }
}

function modificarLetras(letra) {
    for (let i = 0; i < letras.length; i++) {
        if (letras[i] === letra) {
            letrasGuiones[i] = letra
        }
    }
    actualizarPalabraOculta();
    comprobarSiGano();
}

function comprobarSiGano() {
    let contador = 0;
    for (let i = 0; i < letrasGuiones.length; i++) {
        if (letrasGuiones[i] === letras[i]) {
            contador++
        }
    }
    if (contador === letrasGuiones.length) {
        setTimeout(() => {
            swal("Muy bien!", `la palabra era ${palabra}`, "success");
            reiniciarJuego();
        }, 1000);
       
    }
}

function cargarPalabraOculta(letrasGuiones) {
    for (let i = 0; i < letrasGuiones.length; i++) {
        guiones = guiones + ' - '
    }
    palabraoculta.textContent = guiones;
}

function reiniciarJuego() {
    palabra = '';
    letras = [];
    letrasGuiones = [];
    letrasIncorrectas=[];
    guiones = '';
    cantidadErrores = 1;
    imagen.src = `img/Horca1_opt.jpg`;
    habilitarBotones();
    elegirPalabra();
}

function habilitarBotones(){
    botones.forEach((boton)=>{
        boton.disabled = false;
    })
}

//-------------funciones que se encargan de lo visual--------------------------

function actualizarPalabraOculta() {
    palabraoculta.textContent = '';
    guiones = '';
    for (let i = 0; i < letrasGuiones.length; i++) {
        guiones += letrasGuiones[i];
    }
    palabraoculta.textContent = guiones;
}

function cambiarImagen(){
    imagen.src = `img/Horca${cantidadErrores}_opt.jpg`;
    if(cantidadErrores === 8){
        imagen.src = `img/Horca8_opt.jpg`;
        setTimeout(() => {
            swal("Perdiste!", `la palabra era ${palabra}`, "error");
            reiniciarJuego();
        }, 2000);    
    }
}

