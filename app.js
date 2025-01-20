const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Initialize Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Get access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body["access_token"]);
    console.log("Access token set!");
  })
  .catch(err => console.error("Error getting access token", err));

// Example route to search tracks
app.get("/search", async (req, res) => {
  const query = req.query.q; // Example: ?q=Imagine Dragons
  try {
    const data = await spotifyApi.searchTracks(query);
    res.json(data.body);
  } catch (err) {
    res.status(500).send("Error searching tracks");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
