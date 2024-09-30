require('dotenv').config();
const express = require("express")
const cors = require("cors")
//const {router}= require("./auth.js")
const bodyParser = require('body-parser');
const news = require("./news.js")
const search = require("./search.js")
const app = express()
const axios = require("axios")
const reloader = require("./reload.js")
const matches = require("./get_matches.js")
const result = require("./result.js")
const league = require("./inner_league.js")
const team = require("./team.js")
const player = require("./player.js")


const {router} = require("./auth.js")

// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed

// For URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(router)
app.use(cors())
app.use(league)
app.use(bodyParser.json({ limit: '50mb' })); 
app.use(express.urlencoded({extended : true}), bodyParser.urlencoded({ limit: '50mb', extended: true }) )
app.use(news)
app.use(matches)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(search)				
app.use(result)
app.use(team)
app.use(player)





app.listen(5000, ()=>{
	console.log("server is loading on port 5000")
})
