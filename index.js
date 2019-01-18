require('dotenv').config()
const express = require('express');
const path = require('path');
const yelp = require('yelp-fusion');
const app = express();
const client = yelp.client(process.env.YLP);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/api/hotels', function(req, res) {
	 console.log(req.query.city, req.query.chain);	
	client.search({
/*	  term: JSON.stringify(req.query.chain),*/
	  location: JSON.stringify(req.query.city),
	  categories: 'hotels',
	  limit:50
		})
	.then(response => {
			var val = response.jsonBody.businesses
		  res.json(val)
		})
	.catch(e => {
		  console.log(e);
});
})
app.get('/api/details', function(req, res) {
	 console.log(req.query.longitude, req.query.latitude);
var test = req.query
	client.search({	  
	  longitude: /*req.query.longitude*/-0.5950,
	  latitude: /*req.query.latitude*/44.8500,
	  radius: 1000,
	  limit: 50,
	  categories: 'restaurants',
	  rating: '3,4,5',
	  price: '1,2,3,4'
		})
	.then(response => {
			var val = response.jsonBody.businesses
		 console.log(req.query)
		  res.json(val)
		})
	.catch(e => {
		  console.log(e);
});
})
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`dining distance listening on ${port}`);