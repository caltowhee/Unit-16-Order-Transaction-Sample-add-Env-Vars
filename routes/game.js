
const express = require('express');
const router = express.Router();

const database = require('../database');

// get route

router.get("/", (request, response) => {

	var query = "SELECT * FROM game LIMIT 10";
  //console.log(query);
	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
      //console.log(data);
		 	response.render('game.ejs', {title:'Mega Game Store', action:'list', gameData:data});
  }

	});

});

module.exports = router;