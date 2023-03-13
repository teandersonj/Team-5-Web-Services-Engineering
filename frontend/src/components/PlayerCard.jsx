export default function PlayerCard(props) {
    const { player } = props;
    return (
        <div className="PlayerCard flexDirectionColumn">
            <img style={{ display: "block" }} src={player.avatar || "/img/Logo.png"} width="75px" height="75px" />
            <div>{player.username}</div>
            <div>{player.status}</div>
        </div>
    )
}
