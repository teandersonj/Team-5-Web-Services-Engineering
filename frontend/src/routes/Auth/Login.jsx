import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { UserContext } from '../../providers/UserProvider';
import validateElement from '../../services/Validation';

import Logo from '../../components/images/Logo.png';
import LabeledInput from '../../components/LabeledInput';
import ValidationErrorList from '../../components/ValidationErrorList';

export default function Login(props) {
    const navigate = useNavigate();
    const { user, login: userLogin } = useContext(UserContext);

    // On page refresh or initial load, check if the user's already logged in
    useEffect(() => {
        if (user.loggedIn) {
            navigate("/profile");
        }
    }, []);

    const [formState, setFormState] = useState({
        // TODO: We'll need to determine whether they entered an email or username.
        username: "",
        password: "",
        errors: {}
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        // Perform validation on the specific input that changed
        validateOnChange(event);
        // Update the state with the input's new value
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const validateOnChange = ({ target }) => {
        // Validate the changed input, if there are any errors they'll be returned as an object
        // like { [validationRule]: "Validation error message" }
        // If there are no errors, the object will be empty
        // We have to check if the username is being used as an email entry and validate it accordingly
        const validationResult = target.id === "username" && target.value.includes("@") ? validateElement(target, "email") : validateElement(target);

        // If there were new errors...
        if (Object.keys(validationResult).length > 0) {
            // We can associate the result of the validation function with the input's id
            // so we'll have an object like errors: { [inputId]: { [validationRule]: "Validation error message" } }
            // Have to keep track of the previous errors so we don't overwrite them later
            const errors = { ...formState.errors, [target.id]: validationResult };
            
            // Now we begin to update our state here with the new errors,
            // keeping hold of the previous state (including other inputs' errors)
            setFormState((prev) => ({ ...prev, errors }));
        } else {
            // If there were no returned errors from the validation function,
            // we know the input is valid, so we can remove its key from the errors object
            const newErrors = { ...formState.errors };
            delete newErrors[target.id];

            // And update the state with that input's errors removed
            setFormState((prev) => ({ ...prev, errors: newErrors }));
        }
        return;
    };

    // TODO: Disable the submit button if there are any errors in the formState.errors object
    const handleSubmit = (e) => {
        e.preventDefault();
        // We should re-validate the form
        // And we could style the inputs to indicate which ones are invalid
        // But for now we'll just check if there are any errors in the formState.errors object
        if (Object.keys(formState.errors).length > 0) {
            console.log(formState.errors)
            toast.error("Check your inputs and try again");
            return false;
        }

        // Need to detect if the user entered an email or username
        // If it's an email we'll pass it as an email, otherwise we'll pass it as a username
        const newUser = formState.username.includes("@") ?
            {
                email: formState.username,
                password: formState.password
            } :
            {
                username: formState.username,
                password: formState.password
            };

        // Pass the user's login info to the userLogin function,
        // which will send it to the server for validation
        // If there's an error, it'll return an object with an errors property
        // And we can display those errors to the user
        const result = userLogin(newUser);
        if (result.errors) {
            toast.error("Login failed, check your inputs and try again");
            setFormState((prev) => ({ ...prev, ...result.errors }));
            return false;
        } else {
            toast.success("Login successful");
            return true;
        }
    };

    return (
        <>
            <h1 className="pageHeading"><span style={{ color: "var(--color-gold)" }}>Fireside</span> Gaming</h1>
            <img className="Logo imageShadow" src={Logo} alt="Fireside Gaming Logo" />
            <h2 className="pageHeading">Login</h2>
            <form id="loginForm" aria-labelledby="Login Form" action="#" method="post" onSubmit={handleSubmit}>
                {/* We want to put any errors relevant to a specific input, above the input
                    For now, we'll just account for client-side errors, which'll be in formState.errors[inputID]*/}
                {/* Note that the top-level error keys will only indicate which field has errors, the actual errors are stored as its children/values */}
                {formState.errors.username && <ValidationErrorList errors={formState.errors.username} />}
                <LabeledInput id="username" label="Username / Email" placeholder="Enter email or username here" type="text" orientation="vertical" containerClassName="formRow" required onChange={handleInputChange} />
                {formState.errors.password && <ValidationErrorList errors={formState.errors.password} />}
                <LabeledInput id="password" label="Password" placeholder="Enter password here" type="password" orientation="vertical" containerClassName="formRow" required onChange={handleInputChange} />
                <div className="formRow">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                </div>
                <p>Forgot your password? Click <Link className="Link" to="/forgot-password">here</Link> to reset your password.</p>
                <p>Don't have an account? <Link className="Link" to="/register">Register Now</Link></p>
                <div className="formRow centerContent">
                    <input type="submit" className="roundedBlue" value="Login" />
                </div>
                <div className="flexButtonsEitherSide">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
            </form>

            {/* TODO: This is for debugging only */}
            <div style={{ maxWidth: "300px", wordWrap: 'break-word' }}>
                <h3>Form State: </h3>
                <code>
                    {JSON.stringify(formState)}
                </code>
            </div>
            <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                <h3>User State: </h3>
                <code>
                    {JSON.stringify(user)}
                </code>
            </div>
        </>
    )
};
