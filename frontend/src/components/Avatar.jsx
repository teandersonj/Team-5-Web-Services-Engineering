/**
 * Avatar Component - Displays an avatar image
 * @param {String props.avatar} [Avatar] - The name of the avatar image to display
 * @param {String props.alt} [Alt] - The alt text to display if the image fails to load
 * @param {String props.size} [Size] - The size of the avatar image to display
 * @param {String props.containerClassName} [ContainerClassName] - Any CSS classes to apply to the container
 * @param {String props.imageClassName} [ImageClassName] - Any CSS classes to apply to the image
 * @param {Object props.containerStyle} [ContainerStyle] - Any CSS rules to apply to the container
 * @param {Object props.imageStyle} [ImageStyle] - Any CSS rules to apply to the image
 * @param {Object props.rest} [Rest] - Any other props to apply to the image
 * @returns {JSX.Element} - The Avatar component
 */
export default function Avatar(props) {
    const { avatar, alt, size="small", containerClassName, imageClassName, containerStyle, imageStyle, ...rest } = props;

    const containerStyles = {
        small: {
            width: "50px",
            height: "50px",
        },
        medium: {
            width: "150px",
            height: "150px",
        },
        large: {
            width: "200px",
            height: "200px",
        },
        fill: {
            width: "auto", // TODO: Might need to change this to 100%
            height: "auto"
        }
    };

    const imageStyles = {
        borderRadius: "50%",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    };
    
    return (
        <div className={containerClassName} style={{ ...containerStyles[size], ...containerStyle }}>
            <img className={imageClassName} src={"/img/avatars/" + props.avatar + ".jpg"} alt={alt || "User Avatar"} style={{ ...imageStyles, ...imageStyle }} {...props.rest} />
        </div>
    );
};
