const express = require("express")
const router = express.Router();

var database = require('../database');

// Add a customer
console.log("orders")
router.get("/", (request, response) => {

  response.render('order.ejs', {title: 'Megaverse Shopping Cart', action: 'add' });

});

//_____________________________________________________________
// Insert new Order

 router.post("/add", (request, response) => {


var query1 = "INSERT INTO " + "`order`" + "( customer_id, shipping, coupon_code) VALUES (3013,	'UPS',	NULL)"

/* Begin transaction */ 
database.beginTransaction ((err) => {

if (err) { throw err; } 

  database.query(query1, (err, result) => {
    if (err) 
    { 
      database.rollback(() => { throw err; });
     }

    const newOrder = result.insertId; 
    var query2 = `INSERT INTO order_detail (order_id, game_id, quantity, total) VALUES (${newOrder}, 89, 1, 25);`
     database.query(query2, (err, result) => { 
       if (err) 
       { 
         database.rollback(() => { throw err; }); 
       } 
       console.log(result)
       database.commit((err) => { 
         if (err) 
         { 
           database.rollback(() => { throw err; }); 
         } 
         console.log('Transaction Completed Successfully.'); 
               });
         }); 
    }); 
}); 

}); 
module.exports = router;

