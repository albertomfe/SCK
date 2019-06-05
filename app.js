var express=require("express");//importat libreria express
var app=new express(); //instanciar
var http=require("http").Server(app);//importar el server
var io=require("socket.io")(http);//importar libreria socket => esto permite utilizar el /socket.io/socket.io.js en el html

//const log = require("log");

//configurar el puerto
var port=process.env.PORT || 3000; //SI NO EXISTE LA VARIABLE DE ENTORNO AGREGA EL PUERTO 3000
app.use(express.static(__dirname+"/public"));//retorna la direccion actual e ingresa a la carpeta publica


app.get('/',function(req,res)//ruta principal request y response
{
  res.redirect('index.html');//redirigimos a index.html por qeu usaremos archivos estaticos ,si no existe el archivo manda error del tipo Cannot GET /index.html
});

//escuchar la trasmision =>localiza si existe una peticion del cliente
io.on('connection',function(socket)
{
  socket.on('stream',function(image)//verifica peticion de tipo stream y retorna una imagen
  {
    socket.broadcast.emit('stream',image);  //trasmite a lso demas
  })
});


http.listen(port,function()
{
  console.log('servidor escuchando atraves del puerto %s',port);
});
