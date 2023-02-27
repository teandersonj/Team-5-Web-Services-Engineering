import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import validateElement from '../../services/Validation';

import LabeledInput from '../../components/LabeledInput';
import ValidationErrorList from '../../components/ValidationErrorList';

export default function Register(props) {
    // TODO: We need to have a way the user to move back and forth through the form "steps" preserving state
    const navigate = useNavigate();

    const getInitialState = () => ({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPassword: "",
        passwordStrength: 0,
        playstyle: "",
        formStep: 1,
        errors: {}
    });

    // Define initial state. Ideally we'd define this in a function and just call it here so we can
    // return to the initial state on resets or something
    const [formState, setFormState] = useState(getInitialState());

    // We can use useEffect here to check the password strength and update the state
    // It'll be called whenever the password changes and trigger re-rendering
    useEffect(() => {
        let val = 0;
        // Bail and reset if it's empty
        if (!formState.password) {
            setFormState((prev) => ({ ...prev, passwordStrength: 0 }));
            return;
        }

        if (formState.password.length === 0) {
            setFormState((prev) => ({ ...prev, passwordStrength: 0 }));
            return;
        }

        // TODO: Determine the proper strength requirements
        // Check alpha characters
        if (formState.password.match(/[a-z]/i)) {
            val += 1;
        }
        // Check uppercase characters
        if (formState.password.match(/[A-Z]/i)) {
            val += 1;
        }
        // Check numbers
        if (formState.password.match(/[0-9]/i)) {
            val += 1;
        }
        // Check special characters
        if (formState.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/i)) {
            val += 1;
        }
        // Check length
        if (formState.password.length >= 8) {
            val += 1;
        }
        // Determine the strength
        if (val === 5) {
            val = 100;
        } else {
            val = val * 20;
        }

        setFormState((prev) => ({ ...prev, passwordStrength: val }));
    }, [formState.password]);

    const handleInputChange = (event) => {
        // Perform validation on the input
        validateOnChange(event.target);

        // Update the state with the new value
        setFormState((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    };

    const validateOnChange = (element) => {
        // Check if validating confirmPassword, if so we need to pass the password value as well to match it against
        const validationResult = element.id === "confirmPassword" ? validateElement(element, null, { value: `^${formState.password}$`, message: "Password and Confirm Password must match" }) : validateElement(element);
        // Check if there were new errors
        if (Object.keys(validationResult).length > 0) {
            // We can associate the result of the validation function with the input's id
            // so we'll have an object like errors: { [inputId]: { [validationRule]: "Validation error message" } }
            // Have to keep track of the previous errors so we don't overwrite them later
            const errors = { ...formState.errors, [element.id]: validationResult };

            // Now we begin to update our state here with the new errors,
            // keeping hold of the previous state (including other inputs' errors)
            setFormState((prev) => ({ ...prev, errors }));
        } else {
            // If there were no returned errors from the validation function,
            // we know the input is valid, so we can remove its key from the errors object
            const newErrors = { ...formState.errors };
            delete newErrors[element.id];

            // And update the state with that input's errors removed
            setFormState((prev) => ({ ...prev, errors: newErrors }));
        }
    };

    // TODO: Disable the submit button if there are any errors in the formState.errors object
    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: We need to validate the form before we submit it to the backend for further validation and processing
        // For now let's just show the Confirm Registration page

        if (Object.keys(formState.errors).length > 0) {
            console.log(formState.errors)
            toast.error("Check your inputs and try again");
            return false;
        }

        return navigate('/register/continue', { state: { fName: formState.fName, email: formState.email }, replace: true });
    };

    return (
        <>
            <h1 className="pageHeading">Registration</h1>
            <p>Already have an account? <Link className="Link" style={{ textDecoration: "underline" }} to="/login">Go to Login</Link></p>
            <form id="registerForm" aria-labelledby="Registration Form" action="#" method="POST" onSubmit={handleSubmit}>
                <div className="formRow flexButtonsEitherSide">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
                {formState.errors.fName && <ValidationErrorList errors={formState.errors.fName} />}
                <LabeledInput id="fName" label="First Name" type="text" defaultValue={formState.fName} placeholder="Enter your first name here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                {formState.errors.lName && <ValidationErrorList errors={formState.errors.lName} />}
                <LabeledInput id="lName" label="Last Name" type="text" defaultValue={formState.lName} placeholder="Enter your last name here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                {formState.errors.email && <ValidationErrorList errors={formState.errors.email} />}
                <LabeledInput id="email" label="Email Address" type="email" defaultValue={formState.email} placeholder="Enter your email here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                <div className="formRow">
                    <div className="flexDirectionColumn width-100">
                        <label>Password Strength</label>
                        <progress className="width-100" value={formState.passwordStrength} max="100"></progress>
                    </div>
                </div>
                {formState.errors.password && <ValidationErrorList errors={formState.errors.password} />}
                <LabeledInput id="password" label="Password" type="password" defaultValue={formState.password} placeholder="Enter your password here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                {/* TODO: need to ensure both match */}
                {formState.errors.confirmPassword && <ValidationErrorList errors={formState.errors.confirmPassword} />}
                <LabeledInput id="confirmPassword" label="Confirm Password" type="password" defaultValue={formState.passwordConfirm} placeholder="Enter your password again here" onChange={handleInputChange} containerClassName="width-100 formRow" required />
                <div className="formRow flexDirectionColumn">
                    {/* TODO: Extract this since it'll be used elsewhere */}
                    <label htmlFor='playstyle'>Playstyle Preference</label>
                    <select id="playstyle" name="playstyle" defaultValue={formState.playstyle} onChange={handleInputChange} required>
                        <option value="">Select a playstyle</option>
                        <option value="Casual">Casual</option>
                        <option value="Semi">Semi-Competitive</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                </div>
                <p className="flexButtonsEitherSide">
                    {/* TODO: This could either move to Step 2 directly then from there send all collected data to server at once
                    or send what we have here to server for validation, get a response and then go there */}
                    {/* TODO: I think we'll have to send this all to server first to check for existing accts, then if its validated we come back to Step 2.
                        If the user quits and re-logs before doing Step 2 we can bring that up again */}
                    <button id="submit" form="registerForm" type="submit" className="roundedBlue">Continue</button>
                    <button className="roundedGray"><Link className="Link" style={{ color: "white" }} to="/">Cancel</Link></button>
                </p>
            </form>

            {/* TODO: This is for debugging only */}
            <div style={{ maxWidth: "300px", wordWrap: 'break-word' }}>
                <h3>Current State: </h3>
                <code>
                    {JSON.stringify(formState)}
                </code>
            </div>
        </>
    );
};
