/**
 * Avatar Component - Displays an avatar image
 * @param {Object props.containerStyle} [ContainerStyle] - Any CSS rules to apply to the container
 * @param {Object props.imageStyle} [ImageStyle] - Any CSS rules to apply to the image
 * @param {Object props.rest} [Rest] - Any other props to apply to the image
 * @returns {JSX.Element} - The Avatar component
 */
export default function Avatar(props) {
    return (
        <div className="avatarContainer" style={props.containerStyle}>
            <img src={"/img/avatars/" + props.avatar + ".jpg"} alt="User Avatar" className="avatar" style={props.imageStyle} {...props.rest} />
        </div>
    );
};
