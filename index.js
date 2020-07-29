const express = require('express')
const app = express()


// llamando hbs y configurando el motor de vistas
const hbs = require('hbs')

hbs.registerPartials(__dirname +'/partials');
app.set('view engine', 'hbs');

//body parser - sirve para la decodificacion de los envios por url y json files(pero yo no lo uso, solo url)
const bodyParser = require('body-parser')

var urlencoder = bodyParser.urlencoded({extended:false})


//conexion a la base de datos
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/recetas2",{ useUnifiedTopology: true, useNewUrlParser: true },(err,connected)=>{
	if(err){
		console.log(err)
	}else{
		console.log("Conexion a la base de datos realizada")
	}
})

//Modelo
receta = require("./models/Models")

configuraciones = require("./crud/crud");









//Redirecionamiento
app.get("/",(req,res)=>{
	res.render("index")
})






app.post("/",urlencoder,(req,res)=>{
	console.log('guardando...')
	
	nueva_receta = {
		titulo:req.body.titulo,
		autor:req.body.autor,
		descripcion:req.body.descripcion,
		ingredientes:req.body.ingredientes,
		procedimiento:req.body.procedimiento
	}

	configuraciones.crear(nueva_receta);
	res.redirect("/")
})




app.get("/recetas",(req,res)=>{
	todas_recetas = configuraciones.leer_todas();
	
	todas_recetas.exec((err,docs)=>{
		if(err){
			console.log("hubo un error con la consulta".err)
		}else{
			console.log(docs)
			res.render('recetas', {'recetas':docs})
		}
	})
})




app.post("/viewer",urlencoder,(req,res)=>{
	id = req.body.id
	query = configuraciones.ver_una(id)
	query.exec((err,receta)=>{
		if(err){
			console.log(err)
		}else{
			res.render("viewer", {'receta':receta})
		}

	})
})




app.post("/update",urlencoder,(req,res)=>{
	id = req.body.id
	
	ingre = req.body.nuevo_ingredientes.split(",")
	proce = req.body.nuevo_procedimiento.split(",")
	
	console.log("esta actualizando")
	nuevos_datos = {
		titulo:req.body.nuevo_titulo,
		ingredientes:ingre,
		procedimiento:proce,
		descripcion: req.body.nuevo_descripcion
	}

	actualizar = configuraciones.buscar_y_actualizar(id,nuevos_datos)
	
	actualizar.exec((err,hecho)=>{
		if(err){
			console.log("hubo un error con la actualización", err)
		}else{
			res.redirect("/recetas")
		}

	})
})


app.post("/eliminar",urlencoder,(req,res)=>{
	configuraciones.eliminar(req.body.id)
	res.redirect("/recetas")
})



app.listen(3000)
console.log("localhost:3000")