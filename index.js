//    LINEA DE COMANDOS
//        node -v : Version de node desde la linea de comandos
//        npm  -v: Versi+on de npm desde la linea de comandos
//        ls: listas el directorio en el que me encuentre
//        cd..: Ir a la carpeta padre
//        ce <directorio>: Ir al directorio hijo con el nombre <directorio>
//        npm init: Iniciar proyecto npm
//        npm <index.js> Ejecuta el archivo <index.js>
//        npm install express y luego en el codigo const express = require("express")
//        node <index.js> : Ejecuta el servidor
//        Ctrl C: Apaga el servidor
//        En la barra del navegador: localhost:8080 (servidor:yo y luerto 8080)
//        npm install cors: Libreria para usar con express para control de errores de permisos. creo. Y en el codigo  const cors = require("cors")
//        como vamos a trabajar con posts, necesitamos el codogo necesario para soportar JSON's


// express
const express = require("express") // Importamos Express.js para poder urilizarlo en nuestro proyecto
const app = express() // Creamos una aplicacion con express.js
app.use(express.json()) // Habilita entorno para recibir post's en formato JSON
http://LAPTOP-RNO175BH.local:8080
app.use(express.static('public'))

const cors = require("cors")
app.use(cors()) // dehabilita los errores ocasionados por cors

const mokepones = []

class Mokepon {
  constructor(id) {
      // Inicializa las propiedades básicas
      this.id = id;
      this.tipo = "";
      this.x = -40;
      this.y = -40;
      this.ataques = [];
  }

  // Método para asignar el tipo de mokepon
  asignarTipo(tipo) {
      this.tipo = tipo;
  }

  // Método para actualizar las coordenadas
  actualizarCoordenadas(x, y) {
      this.x = x;
      this.y = y;
  }

  // Método para asignar el ataque
  asignarAtaque(ataque) {
      this.ataques.push(ataque);
  }
  devolverAtaque() {
    return this.ataques;
  }
}

// Servicio #1: Peticion get() llamado "unirse" donde se le entrega un id a un mokepon especifico
app.get("/unirse", (req, res) => {
    const id =`${Math.random()}`
    const mokepon = new Mokepon(id)
    mokepones.push(mokepon)
    console.log('nuevo jugador:', mokepon)
    res.setHeader('Access-Control-Allow-Origin','*')
    res.send(id)
})

// Servico #2: 
// Peticon post() Entrega de datos por parte del usuario , typo post manejado con informacion tipo JSON
// 
//     nombre:  </mokepon/>  
//     variable <:id> 
//     funcion: callback que procesa la solicitud
//     

app.post("/mokepon/:id", (req, res) => {
    const id = req.params.id || "no encontrado"
    const tipo = req.body.tipo || "no encontrado"
    let index = -1
    index = mokepones.findIndex((mokepon) => id === mokepon.id)
    if (index >= 0) {
      mokepones[index].asignarTipo(tipo)
      console.log('mokepones despues de asignar tipo:',mokepones)
    }
    res.end()
})

app.post("/mokepon/:id/posicion", (req, res) => {
  const id = req.params.id || "id mokepon no encontrado"
  const x = req.body.x || 0
  const y = req.body.y || 0
  const index = mokepones.findIndex((mokepon) => id === mokepon.id)
  if (index >= 0) {
    if (mokepones[index].x !== x || mokepones[index].y !== y){
       mokepones[index].actualizarCoordenadas(x, y)
    }
  }
  const oponentes = mokepones.filter((mokepon) => id !== mokepon.id)
  console.log('lista de oponentes:', oponentes)
  res.send({
    oponentes
  })
})

app.post("/mokepon/:id/enviarataque", (req, res) => {
  const id = req.params.id || ""
  const ataque = req.body.ataque || ""

  let index = mokepones.findIndex((mokepon) => mokepon.id === id)
  if (index >= 0) {
    mokepones[index].asignarAtaque(ataque)
    console.log('mi mokepon despues de asignar ataque:',mokepones[index])
  }
  res.end()
})

app.get("/mokepon/:id/recibirataques", (req, res) => {
  const id = req.params.id || ""
  const mokepon = mokepones.find((mokepon) => mokepon.id === id)
  res.send({
    ataques: mokepon.ataques || []
  })
})
app.listen(8080, ()=> {//  Activar conexion del servidor - Escuchando interacciones - Que escuche continuamente en el puerto 8080 las peticioes de los clientes
  console.log(`Servidor iniciado en http://localhost:8080`)
})



