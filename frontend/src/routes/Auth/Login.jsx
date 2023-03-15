import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

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

    // TODO: Disable the submit button if there are any errors in the formState.errors object
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable the submit button so the user can't spam the form
        setFormState((prev) => ({ ...prev, disabled: true }));

        // Ensure there are no errors in the form before submitting
        if (Object.keys(formState.errors).length > 0) {
            toast.error("Check your inputs and try again");
            return false;
        }

        // Need to detect if the user entered an email or username
        // If it's an email we'll pass it as an email, otherwise we'll pass it as a username
        // const newUser = formState.username.includes("@") ?
        //     {
        //         // TODO: Will we be able to login with an email?
        //         // email: formState.username,
        //         username: formState.username,
        //         password: formState.password
        //     } :
        // {
        //     username: formState.username,
        //     password: formState.password
        // };

        const newUserData = {};

        // Send the login info to the server to validate and login, retrieving the rest of the user's details
        // If successful, update the user state and navigate to the profile page
        await fetch("/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formState.username,
                password: formState.password
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                // TODO: We could extract this message or make it so the very last catch
                // will handle it, but for now we'll just handle it here
                toast.error("Invalid username or password. Please try again.");
                // Re-enable the submit button
                setFormState((prev) => ({ ...prev, disabled: false }));
                return false;
            } else throw new Error({
                status: res.status,
                error: res
            });
        }).then((res) => {
            console.log("Login response: ", res);
            // Update the user state
            newUserData.accessToken = res.access;
            newUserData.refreshToken = res.refresh;
            return res;
        }).then((res) => {
            console.log("Login response: ", res)
            // We have the tokens, now we need to get the user's data
            // Get the user's data from the userInfo endpoint
            fetch("/api/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${res.access}`
                }
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else throw new Error({
                    status: res.status,
                    error: res
                });
            }).then((res) => {
                toast.success("Login successful!");
                // Update the user state
                newUserData.username = res.data.username;
                newUserData.email = res.data.email;
                newUserData.first_name = res.data.first_name;
                newUserData.last_name = res.data.last_name;
                newUserData.loggedIn = true;
                // TODO: For now store what we have in the user state
                updateUser(newUserData);
            }).catch((err) => {
                console.log("User fetch error: ", err.status, err.error);
                toast.error("There was an error logging in. Please try again.");
                // Re-enable the submit button
                setFormState((prev) => ({ ...prev, disabled: false }));
            });

            // TODO: We need to fetch the Player data associated with this user
            /*                 fetch(`/api/player/${res.id}`, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${res.access}`
                                }
                            }).then((res) => {
                                console.log("Player response: ", res);
                                if (res.status === 200) {
                                    // Update the user state
                                    userData.playstyle = res.Playstyle;
                                    userData.avatar = res.Avatar;
                                    userData.playerId = res.id;
                                    userData.attitude = res.Attitude;
                                    userData.compositeSkill = res.CompositeSkill;
                                    updateUser(userData);
                                    // Navigate to the profile page
                                    return navigate("/profile");
                                } else if (res.status === 401) {
                                    toast.error("Invalid username or password. Please try again.");
                                    // Re-enable the submit button
                                    setFormState((prev) => ({ ...prev, disabled: false }));
                                }
                            }).catch((err) => {
                                toast.error("Login failed, please try again");
                                console.log("Error logging in: ", JSON.stringify(err.body) || err);
                                // Re-enable the submit button
                                // TODO: Show server-side errors to the user
                                setFormState((prev) => ({ ...prev, disabled: false }));
                                return false;
                            }); */

        }).catch((err) => {
            // TODO: Ideally handle errors here, perhaps by passing an error object with status and message
            // from each fetch call
            toast.error("Login failed, please try again");
            console.log("Error logging in with status ", err.status, " and ", JSON.stringify(err.error) || err);
            // Re-enable the submit button
            setFormState((prev) => ({ ...prev, disabled: false }));
            return false;
        });
    }

    return (
        <>
            <h1 className="pageHeading"><span style={{ color: "var(--color-gold)" }}>Fireside</span> Gaming</h1>
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
                    <input type="submit" className="roundedBlue" value="Login" disabled={formState.disabled} />
                </div>
                <div className="flexDirectionRow justifyContentSpaceBetween">
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
        </>
    )
};
