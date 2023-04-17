import axios from 'axios';

// Given a number of games, return that number of randomly chosen games
// from the list of games stored in dummyData.json
export function getNRandomGames(n) {
    const allGames = axios.get("/dummyData.json", { baseURL: process.env.REACT_APP_FRONTEND_URL });

    return allGames.then((res) => {
        if (res.status === 200) {
            // Shuffle the array and pick the first n elements
            const randomGames = res.data.games.sort(() => Math.random() - 0.5).slice(0, n);
            return randomGames;
        } else {
            return [];
        }
    }).catch((err) => {
        console.log("Error getting random games: ", err.response?.data?.message || err.message);
        return [];
    });
}
