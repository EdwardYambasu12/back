
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const cors = require("cors");
const bodyParser = require('body-parser');


router.use(cors());
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://sportsup14:a4gM6dGvo7SHk9aX@cluster0.db0ee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(' connect to MongoDB', err));

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

var register_model = RegisterModel



router.get("/users", (req, res)=>{
  async function reloader(){
      const month = await register_model.find()
      res.json(month)
  }

  reloader()
})

router.post("/update_token", async (req, res) => {
    const { id_, token } = req.body;

    if (!id_ || !token) {
        return res.status(400).json({ message: "User ID and token are required." });
    }

    try {
        const updatedUser = await register_model.findByIdAndUpdate(
            id_,
            { phone_string: token },
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        if (!updatedUser) {
            console.log({ message: "User not found." });
        }

        console.log({ message: "Phone token updated successfully." });
    } catch (error) {
        console.error('Error updating token:', error);
        res.status(500).json({ message: "Internal server error." });
    }
});















/////////////////////////////////////////////////FOR LEAGUE ADDING

router.post('/favorite_league', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log(req.body);

    // Ensure req.body.pinned is a valid JSON string and parse it



    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.id_ },
      { $push: { favorite_league: req.body.league_id } } // Assuming pinnedData contains the league data
    );

    // Log a success message
    console.log('Favorite League added successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite League added successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error adding favorite League:', err);
    res.status(500).json({ message: 'Error adding favorite Player', error: err.message });
  }
});


router.post("/favorite_league_remove", async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request Body:', req.body);

       
 

    // Validate that necessary fields are present
    if (!req.body.id_) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }
 const updateResult = await register_model.updateOne(
      { _id: req.body.  id_ },
      { $pull: { favorite_league: req.body.league_id } }
    );


    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      console.log({ message: 'User not found or no changes made' });
    }

    // Log a success message
    console.log('Favorite   League removed successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite League removed successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error removing favorite League:', err);
    res.status(500).json({ message: 'Error removing favorite Player', error: err.message });
  }
});






////////////////////////////////////////////////////FOR TEAM ADDING

router.post('/favorite_team', async (req, res) => {
  try {
    // Log the request body for debugging
    console.log(req.body);

    // Ensure req.body.pinned is a valid JSON string and parse it
    
    // Update the user's favorite leagues
     const updateResult = await register_model.updateOne(
      { _id: req.body.id_ },
      { $push: { favorite_team: req.body.league_id } } // Assuming pinnedData contains the league data
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

       
 

    // Validate that necessary fields are present
    if (!req.body.id_) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }

    // Update the user's favorite leagues by pulling (removing) the object where league_id matches userId
     const updateResult = await register_model.updateOne(
      { _id: req.body.  id_ },
      { $pull: { favorite_team: req.body.league_id } }
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



    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.id_ },
      { $push: { favorite_player: req.body.player_id } } // Assuming pinnedData contains the league data
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

       
 

    // Validate that necessary fields are present
    if (!req.body.id_) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }
 const updateResult = await register_model.updateOne(
      { _id: req.body.  id_ },
      { $pull: { favorite_player: req.body.player_id } }
    );


    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      console.log({ message: 'User not found or no changes made' });
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
    const pinnedData = req.body.player_id
    console.log(pinnedData);

    // Update the user's favorite leagues
    const updateResult = await register_model.updateOne(
      { _id: req.body.id_ },
      { $push: { pinned_matches: req.body.player_id } } // Assuming pinnedData contains the league data
    );

    // Log a success message
    console.log('Favorite match added successfully', updateResult);

    // Send a success response to the client
    res.status(200).json({ message: 'Favorite match added successfully' });

  } catch (err) {
    // Log the error and send an error response to the client
    console.error('Error adding favorite match:', err);
    res.status(500).json({ message: 'Error adding favorite match', error: err.message });
  }
})

router.post("/unpinned_matches", async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request Body:', req.body);

       
 

    // Validate that necessary fields are present
    if (!req.body.id_) {
      return res.status(400).json({ message: 'Missing required field: userId' });
    }
 const updateResult = await register_model.updateOne(
      { _id: req.body.  id_ },
      { $pull: { pinned_matches: req.body.player_id } }
    );


    // Check if any document was modified
    if (updateResult.modifiedCount === 0) {
      console.log({ message: 'User not found or no changes made' });
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



module.exports = {router, register_model}