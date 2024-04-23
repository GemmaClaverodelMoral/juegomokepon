# Mokepon
Proyecto simulación de un Juego de batalla entre Jugadores para hacer batalla de ataques de elementos (agua, fuego o tierra) entre mascotas
- conectados a la misma web
- con configuracion rensposiva
- videos de fondo y botones especiales  

## ¿Como se juega?
Cada jugador elige su mascota Se puede ejecutar desde diferentes dispositivos: 
Puede estar un usuario en computador, otro en un dispositivo mobil
Si ,o deseas probar debes descargarlo a tu computador, y desde la raiz del directorio en el terminal, 

- 1. Consigues la IP de tu conexxion a tu red en windows ejecutando desde la terminal: ipconfig
  2. Tomas el valor de la IPv4 de la conexion de los datos que te responde. suele empezar por "192."
  3. En todas las lineas del codigo del JS: codigo.js, que se encuentra en la subcarpeta js/, cambias las lineas que contengan la IP 192.xxx.... por la IP de tu computador.  
  4. Desde la linea de terminal ejecutas el servidor index.js con la instruccion: node index.js.
  5. Recibes el mensaje en terminal: Servidor iniciado en http://localhost:8080    
  6. Para acceder al programa desde cada dispositivo:
       En la linea de comandos del navegador del computador o dispositivo mobil pones la siguiente instruccion:
       https://192.xxx.xxx:8080 cambiando las xxx por el valor de para acceder a tu IP 
  8. Empieza a jugar.
  <br/>
  <div align = 'center'>
    <img src="https://github.com/GemmaClaverodelMoral/juegomokepon/blob/master/public/assets/mokeponpantallainicio.png">
  </div>
  Enlace al video demostracion:
  <br/>
  - [SIMULACION JUEGO MOKEPON] <br/> 
  - [https://youtu.be/jGJeAIJpbDY](https://youtu.be/t7RxgL8aQxs) <br/>
  9. Al acabar, desde la linea de comandos del terminal, apaga las escuchas del servidor con ctrl + C. 
