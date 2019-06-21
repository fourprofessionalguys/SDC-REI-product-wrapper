// IMPORTS
//
require('dotenv').config();
const redis = require('redis');

// SETUP
//
const client = redis.createClient({ port: process.env.REDIS_PORT, host: process.env.REDIS_HOST });
let SHOE_SIZES;

// LOG REDIS CONNECTION AND FETCH SHOE_SIZES
//
client.on('connect', () => {
  console.log('Redis Server Started...');

  const multi = client.multi();

  for (let i = 1; i <= 20; i++) {
    multi.hgetall(`shoesize:${i}`);
  }

  multi.exec((error, shoe_sizes) => {
    SHOE_SIZES = shoe_sizes;
  });
});

// ROUTES
//
module.exports.fetchImages = (req, res) => {
  const id = req.params.id;
  const multi = client.multi();

  for (let i = id - 31; i <= id; i++) {
    multi.hgetall(`image:${i}`);
  }

  return new Promise((resolve, reject) => {

    multi.exec((err, results) => {
      if (err) res.json({ error: err });

      const images = results.sort((a, b) => a.color - b.color);
      const activeImage = images.find(img => img.size === 'full' && img.color === 'flame');

      resolve({ images, activeImage });
    });
  });
};


module.exports.fetchProduct = (req, res) => {
  const id = req.params.id;

  return new Promse((resolve, reject) => {
    client.hgetall(`product:${id}`, (err, result) => {
      if (err) res.json({ error: err });

      const product = {
        productName: result.product_name,
        companyName: result.company_name,
        itemNumber: result.item_number,
        color: result.color,
        price: result.price,
        rating: result.rating,
        noRatings: result.no_ratings,
        shoeSizes: SHOE_SIZES.map(x => x.size).sort(),
      };
      resolve({ product });
    });
  });
};