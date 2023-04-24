import { useState, useEffect } from "react";
import PlayerCard from "./PlayerCard";

const gameCardImgStyle = {
    maxHeight: "175px",
    maxWidth: "200px"
};

/**
 * Game Card Component, used to display a game's information, including the game's image, name, description, genre, and players.
 * @param {*} props 
 * @param {Object} props.game The game object to display.
 * @param {boolean} props.withPlayers Whether or not to display the players for the game.
 * @param {Object} props.style The style object to apply to the GameCard.
 * @param {string} props.className The class name to apply to the GameCard.
 * @returns {JSX.Element} <GameCard />
 */
export default function GameCard(props) {
    const { game, withPlayers, style, className } = props;

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (withPlayers) {
            // TODO: For now get dummy users to show as the players for each game
            // Otherwise get the recommended players and active players from the server
            fetch("/dummyData.json", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        const dummyPlayers = data.users;
                        // TODO: Get the recommended players from the server
                        // For now, take some random players from the dummy data
                        setPlayers(dummyPlayers?.sort?.(() => Math.random() - 0.5).slice(0, 5));
                    });
                }
            });
        }
    }, [withPlayers]);

    return (
        <div key={game?.GameId || "gameCardKey"} className={`GameCard${className ? (" " + className) : ""} flexGrow-1 justifyContentSpaceBetween`} style={style}>
            {/* Card Container */}
            {/* Game image and genre? */}
            <div className="flexDirectionColumn justifyContentCenter centerText" style={{ width: "10%" }}>
                <img style={gameCardImgStyle} alt={`Game ${game?.name}`} src={game?.image || "/img/Logo.png"} />
                <div style={{ flexGrow: 0.5 }} className="flexDirectionColumn justifyContentCenter">
                    <em>{game?.genre || "Unset"}</em>
                </div>
            </div>
            {/* Game Name and Description */}
            <div className="flexDirectionColumn justifyContentFlexStart" style={{ padding: "0.7em", width: "30%" }}>
                <strong style={{ fontSize: "1.5em" }}>{game?.name || "No name available."}</strong>
                <div style={{ overflowY: "auto", overflowX: "hidden", wordWrap: "break-word", marginTop: "0.5em" }}>{game?.description || "No description available."}</div>
            </div>
            {withPlayers && (
                // Game Player Counts / Stats Container
                <div className="flexDirectionColumn flexWrap" style={{ width: "60%", borderLeft: "1px solid var(--color-gold)", paddingLeft: "0.5em" }}>
                    {/* Game Player Counts */}
                    <div className="flexDirectionRow justifyContentSpaceBetween fontSizeSemiLarge">
                        <div>
                            <span style={{ color: "var(--color-gold)" }}>{game?.totalPlayerCount || 0}</span> Total Players
                        </div>
                        <div className="flexGrow-1 centerText fontInter" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            Players
                        </div>
                        <div>
                            <span style={{ color: "var(--color-gold)" }}>{game?.activePlayerCount || 0}</span> Active Players
                        </div>
                    </div>
                    {/* Game Players */}
                    {players?.length > 0 ? (
                        <div className="flexDirectionRow centerContent flexGrow-1" style={{ overflowX: "hidden" }}>
                            {players?.map?.((player, index) => (
                                <PlayerCard key={"recent" + (player?.pk || player?.user?.id || index)} player={player} size={"small"} noLabels={true} />
                            ))}
                        </div>
                    ) : (
                        <div className="centerContent flexGrow-1">No players found.</div>
                    )}
                </div>
            )}
        </div>
    );
};
