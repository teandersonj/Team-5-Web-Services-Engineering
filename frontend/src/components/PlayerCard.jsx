import LabeledInput from "./LabeledInput";
import Avatar from "./Avatar";
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

export default function PlayerCard(props) {
    const { player, orientation, size } = props;
    return (
        <div className={`PlayerCard PlayerCard-${size}`}>
            <div className="justifyContentCenter">
                <Avatar avatar={player.avatar} size={size} />
            </div>
            <LabeledInput type="text" id="username" label="Username" defaultValue={player.username || "Unset"} orientation="vertical" disabled />
            {size !== "small" && (
                <>
                    <LabeledInput type="text" id="first_name" label="First Name" defaultValue={player.first_name || "Unset"} orientation="vertical" disabled />
                    <LabeledInput type="text" id="last_name" label="Last Name" defaultValue={player.last_name || "Unset"} orientation="vertical" disabled />
                </>
            )}
        </div>
    )
}
