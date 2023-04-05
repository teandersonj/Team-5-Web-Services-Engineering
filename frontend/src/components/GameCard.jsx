import PlayerCard from "./PlayerCard";

export default function GameCard(props) {
    const { game, withPlayers, style, className } = props;

    return (
        <div key={game.GameId} className={className || "GameCard"} style={style}>
            {/* Card Container */}
            <div className="flexDirectionRow flexGrow-1 justifyContentSpaceBetween">
                {/* Game Info Content */}
                {/* Game Image, Name,etc. */}
                <div className="flexDirectionRow">
                    <div className="flexDirectionColumn justifyContentCenter centerText" style={{ flexGrow: 0.5 }}>
                        <img style={{ display: "block", flexGrow: 0.5, maxHeight: "125px" }} alt={`Game ${game.name}`} src={"/img/Logo.png"} />
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 0.5, justifyContent: "center" }}>
                            <div>{game.name}</div>
                            <div>{game.genre}</div>
                        </div>
                    </div>
                    <div className="flexDirectionColumn justifyContentCenter" style={{ padding: "10px" }}>
                        {game.description}
                    </div>
                </div>
                {withPlayers && (
                    // Game Players and Stats Container
                    <div className="flexDirectionColumn" style={{ flexGrow: 0.5 }}>
                        {/* Game Player Stats */}
                        <div className="flexDirectionRow justifyContentSpaceBetween">
                            {/* TODO: Clean this up or move the title above it and space the player counts */}
                            <div>
                                Total Players: {game.totalPlayerCount || 0}
                            </div>
                            {/* <div>
                                    Game Stats (?)
                                </div> */}
                            <div>
                                Active Players: {game.activePlayerCount || 0}
                            </div>
                        </div>
                        {/* Game Players */}
                        <div className="flexDirectionColumn">
                            <p>Recommended Players</p>
                            <div className="flexDirectionRow justifyContentSpaceEvenly">
                                {game.recommendedPlayers?.map((player) => (
                                    <PlayerCard key={player.id} player={player} size={"small"} />
                                )) || "No recommended players"}
                            </div>
                            <p>Active Players</p>
                            <div className="flexDirectionRow justifyContentSpaceEvenly">
                                {game.activePlayers?.map((player) => (
                                    <PlayerCard key={player.id} player={player} size={"small"} />
                                )) || "No active players"}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
