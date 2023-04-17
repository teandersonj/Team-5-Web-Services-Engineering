import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

import { UserContext } from '../../providers/UserProvider';
import validateElement from '../../services/Validation';

import LabeledInput from '../../components/LabeledInput';
import ValidationErrorList from '../../components/ValidationErrorList';

/** 
 * Login component, used to log in a user
 * @param {*} props
 * @returns <Login />
 **/
export default function Login(props) {
    const navigate = useNavigate();
    const { user, updateUser } = useContext(UserContext);

    // On page refresh or initial load, check if the user's already logged in
    useEffect(() => {
        if (user.loggedIn) {
            navigate("/profile");
        }
    });

    const [formState, setFormState] = useState({
        // TODO: We'll need to determine whether they entered an email or username.
        username: "",
        password: "",
        disabled: false,
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button so the user can't spam the form
        setFormState((prev) => ({ ...prev, disabled: true }));

        // Ensure there are no errors in the form before submitting
        if (Object.keys(formState.errors).length > 0) {
            toast.error("Check your inputs and try again");
            return false;
        }

        const newUserData = {};

        // Send the login info to the server to validate and login, retrieving the rest of the user's details
        // If successful, update the user state and navigate to the profile page
        await axios.post("/api/login/", formState).then(async (res) => {
            if (process.env.NODE_ENV === "development")
                console.log("Login response: ", res);

            if (res.status !== 200) 
                throw new Error({ status: res.status, response: res.data });
            
            const { data } = res;
            const { player } = data;
            const { user } = player;

            newUserData.accessToken = data.access;
            newUserData.refreshToken = data.refresh;
            newUserData.attitude = player.Attitude;
            newUserData.avatar = player.AvatarName;
            newUserData.compositeSkillLevel = player.CompositeSkillLevel;
            newUserData.playstyle = player.Playstyle;
            newUserData.bio = player.Bio;
            newUserData.playerId = player.pk;
            newUserData.username = user.username;
            newUserData.email = user.email;
            newUserData.first_name = user.first_name;
            newUserData.last_name = user.last_name;
            newUserData.id = user.id;
            newUserData.loggedIn = true;

            updateUser(newUserData);
            // Navigate to the profile page
            // return navigate("/profile");
        }).catch((err) => {
            if (process.env.NODE_ENV === "development")
                console.log("Login error: ", err.status, err.response?.data?.error || err.response?.data || err);

            toast.error("Login failed, please try again");

            // Re-enable the submit button
            setFormState((prev) => ({ ...prev, disabled: false }));
            return false;
        });
    }

    return (
        <>
            <h1 className="centerText"><span style={{ color: "var(--color-gold)" }}>Fireside</span> Gaming</h1>
            <img className="Logo imageShadow" src="/img/logo.png" alt="Fireside Gaming Logo" />
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
                    <input type="submit" className="roundedBlueBtn" value="Login" disabled={formState.disabled} />
                </div>
                <div className="flexDirectionRow justifyContentSpaceBetween">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
            </form>
        </>
    )
};
