const express = require("express")
const axios = require("axios")
const team = express.Router()


team.get("/team", async(req, res)=>{

	try{
	const response = await axios.get("https://www.fotmob.com/api/teams?id="+req.query.id);
res.json(response.data)
}

catch(e){
	console.log(e)
}
})


team.get("/team_news", async(req, res)=>{
	const response = await axios.get("https://www.fotmob.com/api/tlnews?id="+req.query.id+"&type=team&language=en&startIndex=0");
	res.json(response.data)
})

module.exports = team