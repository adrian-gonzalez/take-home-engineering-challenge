var express = require('express');
var router = express.Router();
let csvToJson = require('convert-csv-to-json');

const axios = require('axios');

router.get('/', function(req, res, next) {
  // TODO: normally should do input validation and sanitization for all params

  let longitude = req.query.longitude || "-122";
  let latitude = req.query.latitude || "37";



  //TODO: If address is defined, then use this instead of latitude and longitude
  if(false) {
    //req.query.address

    let geocoderResult = getLatLongFromAddress('2453 zachary woods drive');
    latitude = geocoderResult[0];
    longitude = geocoderResult[1];    
  }

  //TODO: if max distance is provided, then provide only those whose latitidue and longitude are within the distance
  let maxDistance = req.query.maxDistance || 100;
  
  let foodType = req.query.foodType || null;

  let options = generateData(latitude, longitude, foodType, maxDistance);

  if(req.query.randomize) {
    let index = Math.floor(Math.random() * (options.length) + 0);
    console.log('index = ' + index);
    options = options[index];
    options = [options];
  }
  
  res.send(options);
});



function generateData(latitude, longitude, foodType, maxDistance) {

  let fileInputName = 'Mobile_Food_Facility_Permit.csv'; 
  let options = csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);

  // Get data
  let data = options.map(option => Object.assign(option, { "distance": distance(latitude, longitude, option.Latitude, option.Longitude, "M") }));
  
  // Filter Data based on distance

  let filteredResult = data.filter(option => option.distance < maxDistance);

  // Filter data based on food type
  if(foodType) {
    filteredResult = filteredResult.filter(option => option.FoodItems.toLowerCase().includes(foodType.toLowerCase()));
  }
  

  // TODO: The sort should probably be configurable and have more flexibility

  let result = filteredResult.sort(function(a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
});
  return result;

}

function distance(lat1, lon1, lat2, lon2, unit) {
  
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		let radlat1 = Math.PI * lat1/180;
		let radlat2 = Math.PI * lat2/180;
		let theta = lon1-lon2;
		let radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

//TODO: unable to finish
async function getLatLongFromAddress (address) {

  let addressEncoded = address.replace(/\s+/g,"+");

  let url = "https://www.mapquestapi.com/geocoding/v1/address?key=bWAgVh2rbLF7Y1C3fnfWSBDG1OlGln9W&inFormat=kvp&outFormat=json&location=" + addressEncoded + "&thumbMaps=false&maxResults=1";

  console.log(url);

  axios.get(url).then(response => {
    console.log(response.data.results.locations);
    return [1, 0];
  })
  .catch(error => {
    console.log("ERROR: " + error);
    return [0, 0];
  })

}

module.exports = router;
