const express = require("express")
const router = express.Router();

var database = require('../database');

// Add a customer

router.get("/add", (request, response) => {
  response.render('customer.ejs', { title: 'Welcome to the Megaverse', action: 'add' });

});

//_____________________________________________________________
// Insert new Customer

router.post("/add_customer", (request, response) => {

  var first_name = request.body.fname;
  var last_name = request.body.lname;
  var ship_street1 = request.body.address1;
  var ship_street2 = request.body.address2;
  var ship_city = request.body.city;
  var ship_county = request.body.county;
  var ship_state = request.body.state;
  var ship_country = request.body.country;
  var ship_zip_post = request.body.zip;
  var ship_DOB = request.body.bday;
  ///onsole.log ("ship_ship_DOB)
  if (ship_DOB == '') {

    ship_DOB = "NULL"
  }

  var query = `
	INSERT INTO customer 
	(fname, lname, ship_street1, ship_street2, ship_city, ship_county, ship_state, ship_zip_post, ship_country, DOB) 
	VALUES ("${first_name}", "${last_name}", "${ship_street1}","${ship_street2}", "${ship_city}","${ship_county}", "${ship_state}", "${ship_zip_post}", "${ship_country}", ${ship_DOB})
	`;

  //console.log (query);

  database.query(query, (error, data) => {

    if (error) {
      //console.log (error);
      throw error;
    }
    else {
      response.redirect("/"); //Send back to homepage
    }

  });
});

//_____________________________________________________________
// Open customer form to get ID  

router.get("/get", (request, response) => {
   response.render('customer.ejs', { title: 'Enter Customer ID ', action: 'get' });
});

//_____________________________________________________________
// Get customer by ID 

router.post("/get/:id", (request, response) => {

  var id = parseInt(request.body.custId);
    // console.log ("body " + parseInt(request.body.custId));
  // console.log ("param " + parseInt(request.params.id));

  var query = `SELECT * FROM customer WHERE customer_id = ${id}`;
  //console.log (query);

  database.query(query, (error, data) => {

    if (error) {
      throw error;
    } else if (data.length > 0) {
      response.render('customer.ejs', { title: 'Edit Customer', action: 'edit', custData: data[0] });
    } else {
      response.render('customer.ejs', { title: 'No Customer with the ID entered', action: 'edit', custData: data[0] });
    }
  });
});

//_____________________________________________________________
//Update Customer

router.post('/edit/:id', (request, response) => {

  console.log("i am here" + request.params.id);
  
  var id = request.params.id;
  var first_name = request.body.fname;
  var last_name = request.body.lname;
  var ship_street1 = request.body.address1;
  var ship_street2 = request.body.address2;
  var ship_city = request.body.city;
  var ship_county = request.body.county;
  var ship_state = request.body.state;
  var ship_country = request.body.country;
  var ship_zip_post = request.body.zip;
  var ship_DOB = request.body.bday;
  if (ship_DOB == '') {

    ship_DOB = "NULL";
  }
  var query = `
	UPDATE customer  
	SET fname = "${first_name}", 
	lname = "${last_name}", 
	ship_street1 = "${ship_street1}", 
	ship_street2 = "${ship_street2}",
  ship_city = "${ship_city}", 
	ship_county = "${ship_country}", 
	ship_state = "${ship_state}", 
  ship_zip_post = "${ship_zip_post}", 
	ship_country = "${ship_country}", 
	dob = ${ship_DOB} 
	WHERE customer_id = ${id} `;


  console.log(query)

  database.query(query, (error, data) => {

    if (error) {
       throw error;
    } else {
     response.render('home.ejs', {title:'Update Successful'});
    }
  });
});

// router.all ('*', (request, response) => {
//   console.log("----------------")
//   console.log(request.pathname);
//   console.log(request.path);
//   console.log(request.href);

// });

//______________________________________________________

router.get("/delete/:id", (request, response) => {
  var id = request.params.id;

  var query = `DELETE FROM customer WHERE customer_id = ${id} `;
  console.log(query);
  
  database.query(query, (error, data) => {
    if (error) {
      throw error
    }
    else {
      response.render('home.ejs', {title:'Delete Successful'});
    }
  });
});

  module.exports = router;

