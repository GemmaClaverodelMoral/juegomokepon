// M O K E P O N 

// ATAJOS 
//    vsCode  
//        F12: Para ir directo al codigo de la funcion apuntada
//        Alt F12: para ir donde al llamado de una funcion 
//        Alt + ←: Para devolverse al punto donde estaba el cursor antes 
//        shift + Alt + A: Comentar parafo /*     */
window.addEventListener('load',iniciarJuego) //En cuanto el DOM esta cargado, ejecutar iniciarJuego()
// C O N S T   &   V A R S
const btnReiniciar                  = document.getElementById('boton-reiniciar')

// Variables / Constantes - Mapa / Canvas

const mapaAnchoMax = 360
const AnchoCanvas = 360
const AltoCanvas = 270
const MedidaAnchoCabezasMapa = 40
const MedidaAltoCabezasMapa = 40

const sectionSeleccionarMokepon     = document.getElementById('seleccionar-mokepon')
const spanMokeponJugador            = document.getElementById('eleccion-mokepon-jugador')
const spanMokeponOponente           = document.getElementById('eleccion-mokepon-oponente')
const inputMokeponJugador           = document.getElementsByName('mokepon')
const contenedorTargetas            = document.getElementById('contenedor-targetas')
const sectionVerMapa                = document.getElementById('ver-mapa')
const mapa                          = document.getElementById('mapa')
const sectionBatalla                = document.getElementById('batalla')
const btnIniciarBatalla             = document.getElementById('div-iniciar-batalla')
const sectionMensajes               = document.getElementById('batalla-resultados')
const sectionAtaquesJugador         = document.getElementById('ataques-del-jugador')
const sectionAtaquesOponente        = document.getElementById('ataques-del-oponente')
const sectionNumeroAsalto           = document.getElementById('numero-asalto')
const contenedorBotonesDeAtaque     = document.getElementById('contenedor-botones-ataque')

class Mokepon {
    constructor(tipo, nombre, foto, vidas, elemento, emoticon, color, fotoCara) {
        this.tipo = tipo
        this.nombre = nombre
        this.foto = foto
        this.vidas = vidas
        this.elemento = elemento
        this.emoticon = emoticon 
        this.color= color
        this.fotoCara = fotoCara
        this.tipoAtaques = []
        this.x = aleatorio(0, (AnchoCanvas - MedidaAnchoCabezasMapa));
        this.y = aleatorio(0, (AltoCanvas - MedidaAltoCabezasMapa));
        this.velocidadX = 0;
        this.velocidadY = 0;
}}

let hipodoge  = new Mokepon('hipodoge', 'Hipodoge' ,'./assets/mokepons_mokepon_hipodoge_attack.webp', 5,'AGUA','💧','#83BEDA','./assets/hipodoge.png')
let capipepo  = new Mokepon('capipepo', 'Capipepo' ,'./assets/mokepons_mokepon_capipepo_attack.webp', 5,'TIERRA','🌱','#99C35F','./assets/capipepo.png')
let ratigueya = new Mokepon('ratigueya','Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.webp',5,'FUEGO', '🔥','#F47930','./assets/ratigueya.png')

const ataqueElementoAgua = {
    nombre:'AGUA',
    emoticon:'💧', 
    tipoBoton:'boton-agua', 
    foto:'../assets/ATAQUEAGUA.png',
}
const ataqueElementoFuego = {
    nombre:'FUEGO',
    emoticon:'🔥', 
    tipoBoton:'boton-fuego', 
    foto:'../assets/ATAQUEFUEGO.png',
}
const ataqueElementoTierra = {
    nombre:'TIERRA',
    emoticon:'🌱',
    tipoBoton:'boton-tierra',
    foto:'../assets/ATAQUETIERRA.png',
}
const HIPODOGE_ATAQUES = [
    ataqueElementoAgua,
    ataqueElementoAgua,
    ataqueElementoAgua,
    ataqueElementoTierra,
    ataqueElementoFuego,
]
const CAPIPEPO_ATAQUES = [
    ataqueElementoTierra,
    ataqueElementoTierra,
    ataqueElementoTierra,
    ataqueElementoAgua,
    ataqueElementoFuego,
]
const RATIGUEYA_ATAQUES = [
    ataqueElementoFuego, 
    ataqueElementoFuego,
    ataqueElementoFuego,
    ataqueElementoAgua,
    ataqueElementoTierra,
]
hipodoge.tipoAtaques.push(...HIPODOGE_ATAQUES)
capipepo.tipoAtaques.push(...CAPIPEPO_ATAQUES)
ratigueya.tipoAtaques.push(...RATIGUEYA_ATAQUES)

let mokeponesDisponibles = []; 
let mokeponesOponentesDisponibles = []
let mokeponJugador
let mokeponOponente
let jugadorId
let oponenteId
let opcionDeMokepones
let opcionDeAtaque
let inputTargetaHipodoge
let inputTargetaCapipepo 
let inputTargetaRatigueya 
let lienzo
let intervalo1
let intervalo2

let mapaBackGround

const emogiResultado = {
    'EMPATASTE': '🫤',
    'GANASTE':   '🎉',
    'PERDISTE': '😭',
}

let botones = []
let ataqueJugador = ""
let ataquesOponente = []
let ataqueOponente = ""
let listaTipoAtaquesOponente = []
let listaTipoAtaquesJugador = []
let numeroAsalto  = 1
let resultadoPartida
let victoriasJugador
let victoriasOponente
let asaltosFaltantes = 5

function iniciarJuego() { // inicializar el DOM
    unirseAlJuego()
    btnReiniciar.style.display = 'none'  //no ver el boton de Game Over hasta acabar partida
    pintarTargetasMokepones()
  
    inputTargetaHipodoge  = document.getElementById('hipodoge')
    inputTargetaCapipepo  = document.getElementById('capipepo')
    inputTargetaRatigueya = document.getElementById('ratigueya')
     
    inputMokeponJugador.forEach(input => {// Escuchar si hay alguna targeta de mokepon seleccionado
        input.addEventListener('change', () => {
            mokeponJugador = cambiarDOMPantallaInicio(input.id)
            //console.log('mokepon Jugador recien con los datos minimos:',mokeponJugador)
        })        
    });
    btnIniciarBatalla.addEventListener('click',iniciarBatalla)
    btnReiniciar.addEventListener('click',reiniciarJuego) 
}

function pintarTargetasMokepones() {
    mokeponesDisponibles.push(hipodoge, capipepo, ratigueya)
    mokeponesDisponibles.forEach((mokepon) => {// Pintar mokeponesDisponibles para elejir
        opcionDeMokepones = `
            <input type="radio" name="mokepon" id=${mokepon.tipo} value = ${mokepon.tipo} />
            <label for=${mokepon.tipo} class = "targeta-mokepon">
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt="${mokepon.nombre}" id="img-cen" />
            </label> `
        contenedorTargetas.innerHTML += opcionDeMokepones
    })
}  

function cambiarDOMPantallaInicio(tipo){ // revisar seleccion de mokepon, seleccion de mokepon oponente aleatoria, activas section ataques y desac section mokepons
    let mokepon = mokeponesDisponibles.find(mokepon => mokepon.tipo == tipo); //console.log('Mokepon encontrado:', mokepon )
    const subPrefijo          = document.querySelector('.subtitulo-prefijo');
    subPrefijo.textContent = `Elegiste a :`;      
    const subMokepon       = document.querySelector('.subtitulo-mokepon-elegido');
    subMokepon.textContent = mokepon.nombre + mokepon.emoticon;
    subMokepon.style.color = mokepon.color
    spanMokeponJugador.innerHTML = mokepon.nombre //console.log('envio tipo:',mokepon.tipo, ' al backEnd')
    enviarTipoMokeponAlBackEnd(mokepon.tipo)
    return mokepon
}

function unirseAlJuego() {
    fetch('http://192.168.10.16:8080/unirse')
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        jugadorId = respuesta;
                        console.log('jugadorId', jugadorId);
                    })
                    .catch(function (error) {
                        console.error('Error al obtener la respuesta del servidor:', error);
                        console.log('Esperando conexión del servidor para iniciar el juego. Active el servidor (node index.js desde el terminal del servidor) y refresque su pantalla de juego.');
                    });
            } else {
                console.error('Error en la respuesta del servidor:', res.status);
                console.log('Esperando conexión del servidor para iniciar el juego. Active el servidor (node index.js desde el terminal del servidor) y refresque su pantalla de juego.');
            }
        })
        .catch(function (error) {
            console.error('Error en la petición al servidor:', error);
            console.log('Esperando conexión del servidor para iniciar el juego. Active el servidor (node index.js desde el terminal del servidor) y refresque su pantalla de juego.');
        });
}

function iniciarBatalla(){ 
    const hayMokeponElegido   = document.querySelector('input[name="mokepon"]:checked');
    
    if (!hayMokeponElegido){ // si no ha elegido mokepon
        alert("Elige algun Moképom")
    } else {
        actualizarJugador()
        cambioDePantallaInicioAMapa()
        actividadMapa()
        dibujarAtaques()
        escucharAtaquesYCombate()
    }
}

function actualizarJugador() {
        customizarMokeponJugador(mokeponJugador)
}

function enviarTipoMokeponAlBackEnd(tipo) {
    fetch(`http://192.168.10.16:8080/mokepon/${jugadorId}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tipo: tipo
            })
        }); //console.log('Tipo de mokepon ', tipo,'enviado correctamente al backend');
}

function customizarMokeponJugador(mokepon){
    // console.log('entro a customizar mokepon:', mokepon)
    mokepon.id = jugadorId
    mokepon.pintarMokepon = 
        function () {
            //console.log('imagen para draw:',mokepon.fotoCara)
            mokepon.mapaFoto = new Image()
            mokepon.mapaFoto.src = mokepon.fotoCara 
            //console.log('mapaFoto antes del draw.', mokepon.mapaFoto)
            lienzo.drawImage(
                mokepon.mapaFoto,
                mokepon.x,
                mokepon.y,
                MedidaAnchoCabezasMapa,
                MedidaAltoCabezasMapa
            )
        }
    //console.log('mokeponJuador despues de actualizar toda la info de mokepon elegido:', mokepon)
}

function aleatorio(min,max){ //numero aleatorio entero entre min y max
    let resultado = Math.floor(Math.random() * (max - min + 1) + min)
    return resultado 
}

function cambioDePantallaInicioAMapa() {
    sectionSeleccionarMokepon.classList.toggle('hidden');
    sectionSeleccionarMokepon.classList.toggle('visible-flex');
    sectionVerMapa.classList.toggle('visible-flex');
    sectionVerMapa.classList.toggle('hidden');
}

function actividadMapa(){
    intervalo1 = setInterval(pintarYColisiones, 50)
    escucharMovimientos()
}
function escucharMovimientos(){
    window.addEventListener('keydown', sePresionaUnaTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function pintarYColisiones() {
    pintarMapa()
    pintarMokeponJugador()
    enviarPosicion(mokeponJugador.x,mokeponJugador.y)
    pintarOponentesYRevisarColisiones()
}

function pintarMapa(){
    adaptarMedidasMapa();
    lienzo.clearRect(0, 0, mapa.width, mapa.height);  //console.log('imagen para draw:',mapaBackGround)
    lienzo.drawImage(
    mapaBackGround,
    0,
    0,
    mapa.width,
    mapa.height
    )
}

function adaptarMedidasMapa(){ // adaptar medidas canvas/mapa a pantallas pequeñas
    lienzo = mapa.getContext("2d")
    mapaBackGround = new Image()
    mapaBackGround.src = './assets/mokemap.png'; //console.log('Background mapa:',mapaBackGround)
    mapa.width = window.innerWidth - 50
    if (mapa.width > mapaAnchoMax) {
        mapa.width = mapaAnchoMax
    }
    mapa.height = mapa.width * 3/4
    alto = mapa.width
    alto = mapa.height
}

function pintarMokeponJugador(){
    mokeponJugador.x = mokeponJugador.x + mokeponJugador.velocidadX
    mokeponJugador.y = mokeponJugador.y + mokeponJugador.velocidadY
    mokeponJugador.pintarMokepon(); //console.log('despues de pintar el mokepon del jugador en la pantalla:',mokeponJugador)
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.10.16:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ oponentes }) {
                    mokeponesOponentesDisponibles = oponentes.map(function (oponente) {
                        let mokeponOponente = null
                        const mokeponOponenteTipo = oponente.tipo || ""
                        if (mokeponOponenteTipo === 'hipodoge'){
                            mokeponOponente =  new Mokepon('hipodoge', 'Hipodoge' ,'', 5,'AGUA','💧','#83BEDA','./assets/hipodoge.png')
                        }else if(mokeponOponenteTipo === 'capipepo'){
                            mokeponOponente = new Mokepon('capipepo', 'Capipepo' ,'', 5,'TIERRA','🌱','#99C35F','./assets/capipepo.png')
                        }else if(mokeponOponenteTipo === 'ratigueya'){
                            mokeponOponente = new Mokepon('ratigueya','Ratigueya','',5,'FUEGO', '🔥','#F47930','./assets/ratigueya.png')
                        }
                        if (mokeponOponenteTipo !== ''){
                            //console.log('coordenadas oponente:',oponente.x, oponente.y)
                            mokeponOponente.x = oponente.x;
                            mokeponOponente.y = oponente.y;
                            mokeponOponente.id = oponente.id;
                            //console.log('mokeponOponente:',mokeponOponente)
                            return mokeponOponente
                        }
                    })
                })
        }
    })
}

function pintarOponentesYRevisarColisiones(){
    console.log('mokeponesOponentesDisponibles:', mokeponesOponentesDisponibles)
    mokeponesOponentesDisponibles.forEach(function(mokepon) {
        //console.log('mokepon antes de if mokepon.tipo:',mokepon,'lista', mokeponesOponentesDisponibles)
        if ( mokepon.tipo !== "" && mokepon.tipo !== undefined ){
            mokepon.pintarMokepon = 
            function () {
                //console.log('imagen para draw:',mokepon.fotoCara)
                mokepon.mapaFoto = new Image()
                mokepon.mapaFoto.src = mokepon.fotoCara 
                //console.log('mapaFoto antes del draw.', mokepon.mapaFoto)
                lienzo.drawImage(
                    mokepon.mapaFoto,
                    mokepon.x,
                    mokepon.y,
                    MedidaAnchoCabezasMapa,
                    MedidaAltoCabezasMapa
                )
            }
            //console.log('mokepon antes de pintar:', mokepon)
            mokepon.pintarMokepon(); //console.log('supuestamente pinte el oponente:',mokeponOponente)
            //si alguno de los jugadores tiene velocidad
            revisarColision(mokepon)
        }
    })
}

function revisarColision(oponente) {
    //console.log('cordenadas mi mokepon:', mokeponJugador.x, mokeponJugador.y)
    const oponenteArriba = oponente.y
    const oponenteAbajo = oponente.y + MedidaAltoCabezasMapa
    const oponenteDerecha = oponente.x + MedidaAnchoCabezasMapa
    const oponenteIzquierda = oponente.x

    const jugadorArriba = mokeponJugador.y
    const jugadorAbajo = mokeponJugador.y + MedidaAltoCabezasMapa
    const jugadorDerecha = mokeponJugador.x + MedidaAnchoCabezasMapa
    const jugadorIzquierda = mokeponJugador.x

    if( jugadorAbajo     < oponenteArriba    || // pegue por debajo
        jugadorArriba    > oponenteAbajo     || // pegue por encima
        jugadorDerecha   < oponenteIzquierda || // pegue por derecha
        jugadorIzquierda > oponenteDerecha   ){ // pegue por izquierda 
        return
    }else{
        //console.log('Me choque')
        detenerMovimiento()
        clearInterval(intervalo1)
        cambiarAPantallaPelea()
        actualizarMokeponOponenteDOM(oponente)
    }
}

function sePresionaUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function moverAbajo(){
    mokeponJugador.velocidadY = 5
}

function moverArriba(){
    mokeponJugador.velocidadY = -5
}

function moverDerecha(){
    mokeponJugador.velocidadX = 5
}

function moverIzquierda(){
    mokeponJugador.velocidadX = -5
}

function detenerMovimiento(){
    mokeponJugador.velocidadX = 0
    mokeponJugador.velocidadY = 0
}

function cambiarAPantallaPelea(){
    sectionVerMapa.classList.toggle('visible-flex');
    sectionVerMapa.classList.toggle('hidden');
    sectionBatalla.classList.toggle('visible-flex');
    sectionBatalla.classList.toggle('hidden');
}

function actualizarMokeponOponenteDOM(mokepon){
    spanMokeponOponente.innerHTML = mokepon.nombre
    listaTipoAtaquesOponente = mokepon.tipoAtaques
    oponenteId = mokepon.id
} 

function dibujarAtaques(){ //Extrae los tipos de ataque correspondientes al mokepon que elegiste y los muestra en pantalla
    listaTipoAtaquesJugador = mokeponesDisponibles.find(mokepon => mokepon.tipo === mokeponJugador.tipo).tipoAtaques;

    victoriasJugador = parseInt(document.getElementById('victorias-mokepon-jugador').innerHTML)
    victoriasOponente = parseInt(document.getElementById('victorias-mokepon-oponente').innerHTML)
    listaTipoAtaquesJugador.forEach((tipoAtaque) => {
        opcionDeAtaque = `
        <img class="${tipoAtaque.tipoBoton} boton-ataque" src="${tipoAtaque.foto}" alt= "${tipoAtaque.nombre}" />`
        contenedorBotonesDeAtaque.innerHTML += opcionDeAtaque
    })
    botones = document.querySelectorAll('.boton-ataque') //Areglo de opciones de boton de ataque
}

function escucharAtaquesYCombate(){ //Crea una escucha del DOM para saber que boton de la lista de ataques ha elegido mi mascota
    botones.forEach((boton)=> {
        boton.addEventListener('click', (e) => {
            ataqueJugador = e.target.alt
            e.target.classList.add('disabled')
            asaltosFaltantes--
            combate()
           }
        )
    })
}

function combate(){ //Ataque aleatorio del oponente, enviar resultado del ataque y revisar victorias y ataque pendientes
    enviarAtaqueJugador(ataqueJugador)
    intervalo2 = setInterval(recibirAtaquesOponente, 50);
    
}

function enviarAtaqueJugador(ataque){//Envio el tipo de ataque al Servidor
    fetch(`http://192.168.10.16:8080/mokepon/${jugadorId}/enviarataque`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataque
        })
    })
}

function recibirAtaquesOponente(){
    fetch(`http://192.168.10.16:8080/mokepon/${oponenteId}/recibirataques`)
    .then(function (res) {
     if (res.ok) {
         res.json()
            .then(function ({ ataques }) {
                ataquesOponente = ataques
                console.log('ataques recuperados:',ataques, 'numeroAsalto:', numeroAsalto)
            })
     }
    })
    ataqueOponente = ataquesOponente[numeroAsalto -1]
    if (ataqueOponente == 'FUEGO' ||
        ataqueOponente == 'TIERRA' ||
        ataqueOponente == 'AGUA' ){ 
        console.log('ataquesOponente + numeroAsalto', ataquesOponente, numeroAsalto)
        clearInterval(intervalo2)
        enviarMensajeResultadoAtaque()
        revisarVictorias()
    } 
}

function enviarMensajeResultadoAtaque(){ //escribe en DOM texto con caracteristicas de ataque, resultado, vidad que quedan
    let resAsalto

    resAsalto = resultadoAsalto() 
    sectionMensajes.innerHTML = resAsalto + ' EL ASALTO';
    sectionNumeroAsalto.appendChild(crearMensajeAsalto(`Asalto #: ${numeroAsalto} ${emogiResultado[resAsalto]}`));
    sectionAtaquesJugador.appendChild(crearMensajeAsalto(ataqueJugador));
    sectionAtaquesOponente.appendChild(crearMensajeAsalto(ataqueOponente));
    numeroAsalto ++;
    document.getElementById('victorias-mokepon-jugador').innerHTML = victoriasJugador
    document.getElementById('victorias-mokepon-oponente').innerHTML = victoriasOponente
}

function crearMensajeAsalto(mensaje){
    let newp    
    newp  = document.createElement('p');
    newp.innerHTML  = mensaje;
    return newp
}

function resultadoAsalto() { //devuelve empate, ganaste o perdiste
    let resultado = ""
    if (ataqueJugador == ataqueOponente){
        resultado = 'EMPATASTE'
    } else if((ataqueJugador == 'FUEGO'  && ataqueOponente == 'TIERRA') ||
            (ataqueJugador == 'TIERRA' && ataqueOponente == 'AGUA')   ||
            (ataqueJugador == 'AGUA'   && ataqueOponente == 'FUEGO')){
                    resultado = 'GANASTE'
                    victoriasJugador++
            } else {
                    resultado = 'PERDISTE'
                    victoriasOponente++
            }
    return resultado
}

function revisarVictorias(){ // Al llegar a 0 vidas, envia texto con resultado partida, deshabilita section de ataques
    if (asaltosFaltantes == 0){
        if(victoriasJugador > victoriasOponente){ 
            enviarMensajeResultadoPartida('🎉 GANASTE :) 🎉')
        }else if (victoriasOponente > victoriasJugador){
            enviarMensajeResultadoPartida('😿 PERDISTE :( 😿')
        }else {
            enviarMensajeResultadoPartida('🎉 EMPATASTE 😿')
        }
        //Eliminar el mokepon que ya jugó del servidor. Dejar el jugador limpio.
        
        btnReiniciar.style.display = 'block'
    }
}

function enviarMensajeResultadoPartida(mensaje){// Codigo de creacion de elementos p para los mensajes de los resultados
    sectionMensajes.innerHTML = mensaje
}

function reiniciarJuego(){//Escucha el boton de reiniciar Juego
    location.reload()
}
