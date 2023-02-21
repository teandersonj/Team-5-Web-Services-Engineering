/**
 * LabeledInput component for forms, consisting of a label and a specified input
 * @param {props.id} ID - The ID of the input, used to identify it
 * @param {props.label} Label - The label to display before the input
 * @param {props.type} Type - The type of input to display (text, email, password, etc.)
 * @param {props.value} DefaultValue - The defaultValue of the input
 * @param {props.orientation} Orientation - Horizontal: Display the label and input side by side. Vertical: Display the label above the input
 * @param {props.placeholder} Placeholder - The placeholder text to display in the input
 * @param {props.onChange} onChange - The function to call when the input changes
 * @returns <LabeledInput /> LabeledInput JSX component
 */
export default function LabeledInput(props) {
    const { id, label, type, defaultValue, orientation="vertical", placeholder, onChange } = props;
    return (
        <div className={orientation === "vertical" ? "inputVertical" : "inputHorizontal"}>
            <label htmlFor={id}>{label}: </label>
            <input key={id} id={id} type={type} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}
