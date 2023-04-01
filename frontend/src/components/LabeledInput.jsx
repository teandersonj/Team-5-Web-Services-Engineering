/**
 * LabeledInput component for forms, consisting of a label and a specified input
 * @param {string props.id} ID - The ID of the input, used to identify it
 * -- Currently, the ID is also used as the name of the input
 * @param {string props.label} Label - The label to display before the input
 * @param {string props.type} Type - The type of input to display (text(area), email, password, etc.)
 * @param {string props.value} [DefaultValue] - The defaultValue of the input
 * @param {bool props.disabled} [Disabled] - Whether or not the input is disabled
 * @param {bool props.required} [Required] - Whether or not the input is required
 * @param {string props.orientation} [Orientation] - Horizontal: Display the label and input side by side. Vertical: Display the label above the input
 * @param {string props.placeholder} [Placeholder] - The placeholder text to display in the input
 * @param {Object props.containerStyle} [containerStyle] - The style to apply to the container div
 * @param {Object props.labelStyle} [labelStyle] - The style to apply to the label
 * @param {Object props.inputStyle} [inputStyle] - The style to apply to the input
 * @param {string props.containerClassName} [containerClassName] - The className to apply to the container div
 * @param {string props.labelClassName} [labelClassName] - The className to apply to the label
 * @param {string props.inputClassName} [inputClassName] - The className to apply to the input
 * @param {object props.children} children - Any children to display after the input
 * @param {bool props.innerContainer} [innerContainer] - Whether or not to wrap the input in a div
 * @param {Object props.innerContainerStyle} [innerContainerStyle] - The style to apply to the inner container div
 * @param {string props.innerContainerClassName} [innerContainerClassName] - The className to apply to the inner container div
 * @param {object props.innerContainerChildren} [innerContainerChildren] - Any children to display inside the inner container div after the input
 * @param {object props.rest} rest - Any other props to pass to the input
 * -- This could include validation rules and event handlers { maxLength: 8, onClick: () => { console.log("Clicked") }
 * @returns <LabeledInput /> LabeledInput JSX component
 */
export default function LabeledInput(props) {
    const { id, label, type = "text", defaultValue, disabled = false, required = false, orientation = "vertical", placeholder, containerStyle, labelStyle, inputStyle, containerClassName, labelClassName, inputClassName, children, innerContainer, innerContainerStyle, innerContainerClassName, innerContainerChildren, ...rest } = props;

    let orientationStyle = orientation === "horizontal" ? { display: "flex", flexDirection: "row", alignItems: "center" } : { display: "flex", flexDirection: "column", alignItems: "flex-start" };

    const input =
            (type === "textarea")
            ?
            (<textarea disabled={!!disabled} key={"inputElement-textarea" + id} id={id} name={id} defaultValue={defaultValue} placeholder={placeholder} className={inputClassName} style={inputStyle} required={!!required} {...rest} />)
            :
            (type === "select") ?
                // We want to apply all the rest props except options
                (<select disabled={!!disabled} key={"inputElement-select" + id} id={id} name={id} defaultValue={defaultValue} placeholder={placeholder} className=
                    {inputClassName} style={inputStyle} required={!!required} {...Object.entries(rest).reduce((acc, [key, value]) => { if (key !== "options") { acc[key] = value; } return acc; }, {})}>
                    {rest.options?.map((option) => {
                        return <option key={"selectOption-" + option.value} value={option.value}>{option.label}</option>
                    }) || null}
                </select >)
            :
            (<input disabled={!!disabled} key={"inputElement-" + type + id} id={id} name={id} type={type} defaultValue={defaultValue} placeholder={placeholder} className={inputClassName} style={inputStyle} required={!!required} {...rest} />);

    return (
        <div key={"LabeledInput" + id} className={"LabeledInput" + (containerClassName ? " " + containerClassName : "")} style={{ ...containerStyle, ...orientationStyle }}>
            <label htmlFor={id} className={labelClassName} style={labelStyle}>{label}</label>
            {innerContainer ?
                <div key={"innerContainer" + id} className={innerContainerClassName} style={innerContainerStyle}>
                    {input}
                    {innerContainerChildren}
                </div>
                :
                input
            }
            {children}
        </div>
    );
};
