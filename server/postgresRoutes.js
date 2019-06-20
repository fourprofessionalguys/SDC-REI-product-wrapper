// SETUP
//
require('dotenv').config();
const db = require('./../db/sql/dbConfig.js');


// DB ROUTES
//

module.exports.images = (req, res, next) => {
  // const id = Math.floor(Math.random() * 312500) * 32;
  //
  // comment line 9 and uncomment line 13 for querying from the last 100
  //
  const id = Math.floor(Math.random() * 101) * 32 + 9996800;

  db('images').select('*').whereBetween('id', [id - 31, id]).then((results) => {
    results = results.sort((a, b) => a.color - b.color);
    res.locals.images = results;
    res.locals.activeImage = results.find(img => img.size === 'full' && img.color === 'flame');
    next()
  });
};

module.exports.products = (req, res, next) => {
  // const id = Math.floor(Math.random() * 10000001);
  //
  // comment line 24 and uncomment line 28 for querying from the last 100
  //
  const id = Math.floor(Math.random() * 101) + 9999000;

  db('products').select('*').where({ 'id': id }).then((result) => {
    result = result[0];
    db('shoe_size').select('*').then(shoe_sizes => {
      const response = {
        productName: result.product_name,
        companyName: result.company_name,
        itemNumber: result.item_number,
        color: result.color,
        price: result.price,
        rating: result.rating,
        noRatings: result.no_ratings,
        shoeSizes: shoe_sizes.map(x => x.size),
      };
      res.locals.product = response;
      next();
    });
  });
};


