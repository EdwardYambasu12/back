const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
const bodyParser = require('body-parser');

router.use(cors());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const registerSchema = new mongoose.Schema({
  email: { type: String,  },
  password: { type: String, },
  favorite_team: [{ type: String }],
  favorite_player: [{ type: String }],
  favorite_league: [{ type: String }],
  pinned_matches: [{ type: String }],
  phone_string: { type: String }
});

const RegisterModel = mongoose.model("User", registerSchema);

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, phone_string } = req.body;

    const user = new RegisterModel({ email, password, phone_string });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Registration failed.", error: e.message });
  }
});

var register_model = registerSchema

router.post("/register", (req, res)=>{

  try{
  res.send("recieving information from the informative tower")
  console.log(req.body)

  const {body}  = req
  

  const poster= new register_model ({

    
    email : body.email_reader,
    password : body.password_reader


  })

  poster.save()
  }

  catch(e){
    console.log("e")
  }

})

router.get("/users", (req, res)=>{
  async function reloader(){
      const month = await register_model.find()
      res.json(month)
  }

  reloader()
})















/////////////////////////////////////////////////FOR LEAGUE ADDING

router.post('/favorite_leagues', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log(req.body);

    // Ensure req.body.pinned is a valid JSON string and parse it
    const pinnedData = JSON.parse(req.body.pinned);
    console.log(pinnedData);

    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $push: { favorite_league: pinnedData } } // Assuming pinnedData contains the league data
    );

    // Log a success message
    console.log('Favorite League added successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite League added successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error adding favorite League:', err);
    res.status(500).json({ message: 'Error adding favorite League', error: err.message });
  }
});


router.post("/favorite_leagues_remove", async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request Body:', req.body);

       const pinnedData = JSON.parse(req.body.pinned);
 

    // Validate that necessary fields are present
    if (!req.body.userId) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }

    // Update the user's favorite leagues by pulling (removing) the object where league_id matches userId
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $pull: { favorite_league: { league_id: pinnedData.league_id} } } // Remove the object where league_id matches userId
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    // Log a success message
    console.log('Favorite League removed successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite League removed successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error removing favorite League:', err);
    res.status(500).json({ message: 'Error removing favorite League', error: err.message });
  }
});



////////////////////////////////////////////////////FOR TEAM ADDING

router.post('/favorite_team', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log(req.body);

    // Ensure req.body.pinned is a valid JSON string and parse it
    const pinnedData = JSON.parse(req.body.pinned);
    console.log(pinnedData);

    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $push: { favorite_team: pinnedData } } // Assuming pinnedData contains the league data
    );

    // Log a success message
    console.log('Favorite Team added successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite Team added successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error adding favorite League:', err);
    res.status(500).json({ message: 'Error adding favorite Team', error: err.message });
  }
});


router.post("/favorite_team_remove", async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request Body:', req.body);

       const pinnedData = JSON.parse(req.body.pinned);
 

    // Validate that necessary fields are present
    if (!req.body.userId) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }

    // Update the user's favorite leagues by pulling (removing) the object where league_id matches userId
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $pull: { favorite_team : { team_key: pinnedData.team_key} } } // Remove the object where league_id matches userId
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    // Log a success message
    console.log('Favorite Team removed successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite Team removed successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error removing favorite Team:', err);
    res.status(500).json({ message: 'Error removing favorite Team', error: err.message });
  }
});





////////////////////////////////////////////////////FOR PLAYER ADDING

router.post('/favorite_player', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log(req.body);

    // Ensure req.body.pinned is a valid JSON string and parse it
    const pinnedData = JSON.parse(req.body.pinned);
    console.log(pinnedData);

    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $push: { favorite_player: pinnedData } } // Assuming pinnedData contains the league data
    );

    // Log a success message
    console.log('Favorite Player added successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite Player added successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error adding favorite League:', err);
    res.status(500).json({ message: 'Error adding favorite Player', error: err.message });
  }
});


router.post("/favorite_player_remove", async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request Body:', req.body);

       const pinnedData = JSON.parse(req.body.pinned);
 

    // Validate that necessary fields are present
    if (!req.body.userId) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }

    // Update the user's favorite leagues by pulling (removing) the object where league_id matches userId
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $pull: { favorite_player: { player_key: pinnedData.player_key} } } // Remove the object where league_id matches userId
    );

    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: 'User not found or no changes made' });
    }

    // Log a success message
    console.log('Favorite   Player removed successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite Player removed successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error removing favorite Player:', err);
    res.status(500).json({ message: 'Error removing favorite Player', error: err.message });
  }
});

router.post("/pinned_matches",async(req, res)=>{
            try {
    // Log the request body for debugging
    console.log(req.body);

    // Ensure req.body.pinned is a valid JSON string and parse it
    const pinnedData = JSON.parse(req.body.pinned);
    console.log(pinnedData);

    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.userId },
      { $push: { favorite_player: pinnedData } } // Assuming pinnedData contains the league data
    );

    // Log a success message
    console.log('Favorite Player added successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite Player added successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error adding favorite League:', err);
    res.status(500).json({ message: 'Error adding favorite Player', error: err.message });
  }
})



module.exports = {router, register_model}
