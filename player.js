const express = require("express")
const axios = require("axios")

const player = express.Router()


player.get("/player", async(req, res)=>{

	try{


	const response = await axios.get("https://www.fotmob.com/api/playerData?id="+req.query.id)

	res.json(response.data)
	
}

catch (e){
	console.log(e)
}
})

module.exports = player


