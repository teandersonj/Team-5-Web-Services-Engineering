import LabeledInput from "./LabeledInput";
import Avatar from "./Avatar";
import PlayerStatusDisplay from "./PlayerStatusDisplay";

// eslint-disable-next-line no-unused-vars
const styles = {
    small: {
        width: "100px",
        height: "100px",
        padding: "5px",
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "var(--color-gray)",
        boxShadow: "0 0 5px 0px black",
        borderRadius: "5px",
    },
    large: {
        width: "300px",
        height: "300px",
        padding: "5px",
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "var(--color-gray)",
        boxShadow: "0 0 5px 0px black",
        borderRadius: "5px",
    },
};

const overrideStatusStyle = {
    width: "fit-content",
    // maxWidth: "30%"
};

export default function PlayerCard(props) {
    const { player, noLabels=false, withPlayerStatus=true, size } = props;

    return (
        <div className={`PlayerCard PlayerCard-${size}`}>
            <div className="justifyContentCenter">
                <Avatar avatar={player.avatar} size={size} />
            </div>
            <LabeledInput type="text" id="username" label={!noLabels && "Username"} defaultValue={player.user.username || player.username || "Unset"} orientation="vertical" inputStyle={{ background: "none" }} disabled />
            {withPlayerStatus && <PlayerStatusDisplay status={player.currentStatus} overrideStyle={overrideStatusStyle} />}
            {size !== "small" && (
                <>
                    <LabeledInput type="text" id="first_name" label={!noLabels && "First Name"} defaultValue={player?.user.first_name || player.first_name || "Unset"} orientation="vertical" disabled />
                    <LabeledInput type="text" id="last_name" label={!noLabels && "Last Name"} defaultValue={player?.user?.last_name || player.last_name || "Unset"} orientation="vertical" disabled />
                </>
            )}
        </div>
    )
}
