const API_KEY = "AIzaSyBAnUK2y4aS4wV71EgzW53NhihLX9fAyDg";
const HttpError = require("../models/httperror");
const axios = require("axios");

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )},+CA&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "cant find location for the specified address",
      422
    );
    throw error;
  }
  const coordinate = data.results[0].geometry.location;
  return coordinate;
}

module.exports = getCoordsForAddress;
