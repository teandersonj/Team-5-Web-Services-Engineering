const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const clientId = process.env.CLIENT_ID;
const bearerToken = process.env.BEARER_TOKEN;
const gameUrl = "https://api.igdb.com/v4/games";
const fields = "fields name, cover.url, genres.name, summary";
const headers = {
    'Accept': 'application/json',
    'Client-ID': clientId,
    'Authorization': bearerToken,
};
app.get("/search/by/title/:title", async (req, res) => {
    const title = req.params["title"];
    axios({
        url: gameUrl,
        method: 'POST',
        headers,
        data: `${fields}; search "${title}";`
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send(err)
        });
});

app.get("/search/by/genre/:genre", async (req, res) => {
    const genre = req.params["genre"];
    axios({
        url: gameUrl,
        method: 'POST',
        headers,
        data: `${fields}; where ((genres.name ~ "${genre}"*) | (genres.name ~ *"${genre}") | (genres.name ~ *"${genre}"*) & (cover.url != null));`
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            res.send(err)
        });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

