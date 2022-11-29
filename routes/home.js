const express = require("express")
const router = express.Router();



router.get("/", (request, response) => {
		 	response.render('home.ejs', {title:'Videogame Mega Metaverse'});

	});

module.exports = router;

