/**
 * LabeledInput component for forms, consisting of a label and a specified input
 * @param {props.id} ID - The ID of the input, used to identify it
 * -- Currently, the ID is also used as the name of the input
 * @param {props.label} Label - The label to display before the input
 * @param {props.type} Type - The type of input to display (text, email, password, etc.)
 * @param {props.value} DefaultValue - The defaultValue of the input
 * @param {props.orientation} Orientation - Horizontal: Display the label and input side by side. Vertical: Display the label above the input
 * @param {props.placeholder} Placeholder - The placeholder text to display in the input
 * @param {props.onChange} onChange - The function to call when the input changes
 * @param {props.containerStyle} containerStyle - The style to apply to the container div
 * @param {props.labelStyle} labelStyle - The style to apply to the label
 * @param {props.inputStyle} inputStyle - The style to apply to the input
 * @param {props.containerClassName} containerClassName - The className to apply to the container div
 * @param {props.labelClassName} labelClassName - The className to apply to the label
 * @param {props.inputClassName} inputClassName - The className to apply to the input
 * @returns <LabeledInput /> LabeledInput JSX component
 */
export default function LabeledInput(props) {
    const { id, label, type, defaultValue, orientation = "vertical", placeholder, onChange, containerStyle, labelStyle, inputStyle, containerClassName, labelClassName, inputClassName } = props;
    
    let orientationStyle = orientation === "horizontal" ? { display: "flex", flexDirection: "row", alignItems: "center" } : { display: "flex", flexDirection: "column", alignItems: "flex-start" };

    return (
        <div className={containerClassName} style={{ ...containerStyle, ...orientationStyle }}>
            <label htmlFor={id} className={labelClassName} style={labelStyle}>{label}</label>
            <input key={id} id={id} name={id} type={type} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} className={inputClassName} style={inputStyle} />
        </div>
    );
};
