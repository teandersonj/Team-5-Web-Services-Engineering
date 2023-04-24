const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();
const cors = require('cors');
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

app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CLIENT_ORIGIN : "http://localhost:3000",
    credentials: true
}));

app.get("/search/by/title/:title", async (req, res) => {
    const title = req.params["title"];
    axios({
        url: gameUrl,
        method: 'POST',
        headers,
        data: `${fields}; search "${title}"; ((where genre.name != null) & (summary != null) & (cover.url != null)); limit 10;`
    })
        .then(response => {
            const filteredResults = response?.data;
            const formattedResults = filteredResults?.map?.(result => {
                const randomTotalPlayers = Math.floor(Math.random() * 100000);
                // Pick a number that is less than the Total Players stat to use as the Active Players stat
                const randomActivePlayers = Math.floor(Math.random() * randomTotalPlayers);

                return {
                    GameId: result?.id,
                    name: result?.name,
                    image: result?.cover?.url,
                    genre: result?.genres?.map?.(genre => genre.name).join(", "),
                    description: result.summary,
                    totalPlayerCount: randomTotalPlayers,
                    activePlayerCount: randomActivePlayers
                }
            }) || [];

            return res.json(formattedResults);
        })
        .catch(err => {
            console.log("Error: " + err);
            return res.send(err)
        });
});

app.get("/search/by/genre/:genre", async (req, res) => {
    const genre = req.params["genre"];
    axios({
        url: gameUrl,
        method: 'POST',
        headers,
        data: `${fields}; where ((genres.name ~ "${genre}"*) | (genres.name ~ *"${genre}") | (genres.name ~ *"${genre}"*) & (cover.url != null)); limit 10;`
    })
        .then(response => {
            const filteredResults = response?.data; // .filter?.(result => result.cover !== undefined && result.genres !== undefined && result.summary !== undefined);
            // Format the results to match the format of the data from the database
            const formattedResults = filteredResults.map?.(result => {
                const randomTotalPlayers = Math.floor(Math.random() * 100000);
                // Pick a number that is less than the Total Players stat to use as the Active Players stat
                const randomActivePlayers = Math.floor(Math.random() * randomTotalPlayers);

                return {
                    GameId: result.id,
                    name: result.name,
                    image: result.cover?.url,
                    genre: result?.genres?.map?.(genre => genre.name).join(", "),
                    description: result.summary,
                    totalPlayerCount: randomTotalPlayers,
                    activePlayerCount: randomActivePlayers
                }
            }) || [];

            return res.json(formattedResults);
        })
        .catch(err => {
            console.log("Error: " + err);
            return res.send(err);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
