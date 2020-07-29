const modelo = require("../models/Models.js")


crear=(data)=>{
	ingre = data.ingredientes.split(",")
	proces = data.procedimiento.split("\r\n")

	nueva_receta = new modelo({
		titulo: data.titulo,
		autor:data.autor,
		descripcion:data.descripcion,
		ingredientes:ingre,
		procedimiento:proces
	})

	nueva_receta.save((err,res)=>{
		if(err){
			console.log(err)
		}else{
			console.log("Registro realizado")
		}
	})
}

leer_todas = ()=>{
	recetas = modelo.find({})
	return recetas
}

ver_una=(id)=>{
	receta = modelo.findOne({_id:id},(err,succes)=>{
		if(err){
			console.log("error",err)
		}else{
			console.log("todo salio bien")
		}
	})
	return receta
}

buscar_y_actualizar=(id,data)=>{
	receta_editar = modelo.findOneAndUpdate({_id:id},data,(err,ok)=>{
		if(err){
			console.log(err)
		}else{
			console.log("actualizado")
		}
	})
	return receta_editar
}

eliminar=(id)=>{
	modelo.findOneAndDelete({_id:id},(err,ok)=>{
		if(err){
			console.log(err)
		}else{
			console.log("Eliminado")
		}
	})
}


module.exports={
	crear,
	leer_todas,
	ver_una,
	buscar_y_actualizar,
	eliminar
}