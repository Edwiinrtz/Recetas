const mongoose = require('mongoose')

const schema = mongoose.Schema;

const receta_squema = new schema({
	titulo:String,
	autor:String,
	descripcion:String,
	ingredientes:[],
	procedimiento:[]
})


let receta = mongoose.model("receta", receta_squema)

module.exports=receta
