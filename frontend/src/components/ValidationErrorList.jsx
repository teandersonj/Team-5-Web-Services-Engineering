/** 
 * Takes in an object like { [inputId]: { [validationRule1]: "Validation error message 1", ... } }
 * And returns an unordered list of the error messages
 * @param {Object} errors - An object of errors {[inputId]: { [validationRule1]: "Validation error message 1", ... } }
 * @returns <ValidationErrorList /> - An unordered list of the error messages
 */
const ValidationErrorList = ({ errors }) => {
    /* This is for the list of validation errors that we'll display to the user */
    const styles = {
        listStyleType: "none",
        padding: "10px",
        margin: "10px auto",
        color: "var(--color-red)",
        fontWeight: "bold",
        fontSize: "1em",
        textAlign: "center",
        border: "1px solid var(--color-red)"
    };

    return (
        <ul style={styles}>
            {Object.entries(errors).map(([k, v], idx) => (
                <li key={k} className="error">{v}</li>
            ))}
        </ul>
    );
}

export default ValidationErrorList;
