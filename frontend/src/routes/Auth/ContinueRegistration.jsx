import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../../providers/UserProvider';
import LabeledInput from '../../components/LabeledInput';

/**
 * This component is used to continue the registration process for a new user,
 * allowing them to set their username and avatar.
 * @param {*} props
 * @param {string} useLocation.state.fName The user's first name, passed in from the Register component
 * @param {string} useLocation.state.email The user's email, passed in from the Register component
 * @returns <ContinueRegistration />
 */

export default function ContinueRegistration(props) {
    const navigate = useNavigate();

    // TODO: If we're not coming here from the first Registration page, redirect them there

    // Check if the user's logged in and redirect them if they are
    const { user } = useContext(UserContext);
    useEffect(() => {
        if (user.loggedIn) {
            navigate('/');
        }
    }, []);

    // Give us access to the location state passed in from the Register component
    const { fName, email } = useLocation();

    const [formState, setFormState] = useState({
        username: "",
        avatar: "",
        errors: {}
    });

    const inputStyle = {
        visibility: "hidden", margin: 0, padding: 0
    };

    const labelStyles = {
        unchecked: {
            border: "2px solid var(--color-black)",
            borderRadius: 0,
            filter: null
        },
        checked: {
            border: "2px solid var(--color-dark-blue)",
            borderRadius: "50px",
            filter: "drop-shadow(0 5px 5px var(--color-light-blue))"
        }
    };

    const handleUsernameChange = (event) => {
        const { id, value } = event.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const handleRadioChange = (event) => {
        const newState = { ...formState };
        const { id, value } = event.target;

        // Reset the previously selected avatar
        if (newState["avatar"] === value) return;
        else if (newState["avatar"] !== "") {
            Object.assign(document.querySelector(`label[for='${newState["avatar"]}']`).style, labelStyles.unchecked);
            document.getElementById(newState["avatar"]).checked = false;
        }

        // Style, select, and apply the new avatar selection
        document.getElementById(id).checked = true;
        newState["avatar"] = value;
        Object.assign(document.querySelector(`label[for='${newState["avatar"]}']`).style, labelStyles.checked);
        setFormState(newState);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Sending you to Finish Registration page...");
        navigate('/register/finish');
    };

    // TODO: What happens when they cancel at this point??
    // Will we already have saved their email and name and other info
    // If so we'd have to delete it. Or save for when they return later?
    const handleCancel = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    return (
        <>
            <h1 className="pageHeading">Continue Registration</h1>
            <p>You're almost done registering{fName && " " + fName + ", "}! <br />Finish by choosing your username and avatar.</p>
            <form id="continueRegistrationForm" onSubmit={handleSubmit}>
                <LabeledInput id="username" label="Username" placeholder="Enter username here" type="text" onChange={handleUsernameChange} orientation="vertical" containerClassName="formRow" />
                {/* Avatar selection */}
                <div className="formRow flexDirectionColumn flexItemsSpaceBetween width-100">
                    <label id="avatarLabel" htmlFor="avatar">Select a Profile Picture</label>
                    <fieldset role="radiogroup" id="avatar" name="avatar" aria-required="true" aria-labelledby="avatarLabel" onChange={handleRadioChange}>
                        <div>
                            <input style={inputStyle} tabIndex={0} type="radio" id="avatar1" name="avatar" value="avatar1" />
                            <label htmlFor="avatar1"><img src="https://via.placeholder.com/100" alt="Avatar 1" /></label>
                            <input style={inputStyle} tabIndex={1} type="radio" id="avatar2" name="avatar" value="avatar2" />
                            <label htmlFor="avatar2"><img src="https://via.placeholder.com/100" alt="Avatar 2" /></label>
                        </div>
                        <div>
                            <input style={inputStyle} tabIndex={2} type="radio" id="avatar3" name="avatar" value="avatar3" />
                            <label htmlFor="avatar3"><img src="https://via.placeholder.com/100" alt="Avatar 3" /></label>
                            <input style={inputStyle} tabIndex={3} type="radio" id="avatar4" name="avatar" value="avatar4" />
                            <label htmlFor="avatar4"><img src="https://via.placeholder.com/100" alt="Avatar 4" /></label>
                        </div>
                    </fieldset>
                </div>
                <div className="formRow flexItemsSpaceBetween">
                    <button className="alignSelfCenter roundedBlue" type="submit" onClick={handleSubmit}>Continue</button>
                    <button className="alignSelfCenter roundedGray" onClick={handleCancel}>Cancel</button>
                </div>
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
