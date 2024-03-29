import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../../providers/UserProvider';

/* import validateElement from '../../services/Validation';
import ValidationErrorList from '../../components/ValidationErrorList';
import LabeledInput from '../../components/LabeledInput'; */
import Avatar from '../../components/Avatar';

/**
 * This component is used to continue the registration process for a new user,
 * allowing them to set their username and avatar.
 * @param {*} props
 * @returns {JSX.Element} <ContinueRegistration /> component
 */

export default function ContinueRegistration(props) {
    // TODO: If we're not coming here from the first Registration page, redirect them there
    const navigate = useNavigate();

    // Check if the user's logged in and redirect them if they are
    const { user, updateUser } = useContext(UserContext);

    useEffect(() => {
        if (user.loggedIn) {
            navigate('/');
        }
        // We need to check if the user has username, email, etc. populated in the state
        // If they don't, redirect them to the first registration page
    });

    // Give us access to the location state passed in from the Register component
    // const { state: location } = useLocation();

    const [formState, setFormState] = useState({
        playstyle: "",
        avatar: "",
        errors: {}
    });

    // To style the hidden radio button 
    const inputStyle = {
        visibility: "hidden", margin: 0, padding: 0, width: 0, height: 0
    };

    // When an avatar is clicked, indicate that it's selected
    const labelStyles = {
        default: {
            display: "inline-block",
            overflow: "hidden",
            width: "100px",
            height: "100px",
        },
        unchecked: {
            border: "none",
        },
        checked: {
            border: "5px solid var(--color-light-blue)",
            borderRadius: "50%"
        }
    };

    const handlePlaystyleChange = (event) => {
        setFormState((prev) => ({ ...prev, playstyle: event.target.value }));
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formState.playstyle === "" || formState.avatar === "") {
            // TODO: Ensure username is unique and a valid avatar is selected
            toast.error("Please select your playstyle and avatar.");
            return;
        }
        
        // Update the user's player-specific information
        await axios(`/api/player/${user.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                
                // TODO: Make PUT /api/player/:id guarded with token?
                "Authorization": `Bearer ${user.accessToken}`
            },
            data: {
                "pk": user.id,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "email": user.email,
                    "password": user.password,
                },
                "AvatarName": formState.avatar,
                "Playstyle": formState.playstyle,
                "CompositeSkillLevel": 0.0,
                "Attitude": "Unset",
                "Bio": "Unset"
            }
        }).then(async (response) => {
            if (process.env.NODE_ENV === "development")
                console.log("Player PUT response: " + JSON.stringify(response));

            if (response.status === 200) {
                // Update the user's context
                updateUser({
                    playerId: response.data.pk,
                    playstyle: response.data.Playstyle,
                    avatar: response.data.AvatarName,
                    loggedIn: true,
                });
                navigate('/register/finish');
            } else {
                throw new Error({ status: response.status, error: response });
            }
        }).catch((error) => {
            if (process.env.NODE_ENV === "development")
                console.log(error && error.response ? error.response : error);

            toast.error("Unable to alter player information, please try again.");
        });
    };

    // TODO: What happens when they cancel at this point??
    // Will we already have saved their email and name and other info
    // If so we'd have to delete it. Or save for when they return later?
    const handleCancel = (event) => {
        event.preventDefault();
        // Clear any saved data in user context
        // TODO: Have a reset function on the User which does this totally
        updateUser({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            playstyle: "",
            username: "",
            avatar: "",
            loggedIn: false
        });
        navigate('/login');
    };

    return (
        <>
            <h1 className="pageHeading">Continue Registration</h1>
            <p>You're almost done registering{user.first_name ? ", " + user.first_name : ""}! <br />Finish by choosing your playstyle and avatar.</p>
            <form id="continueRegistrationForm" onSubmit={handleSubmit}>
                <div className="formRow flexDirectionColumn">
                    {/* TODO: Extract this since it'll be used elsewhere */}
                    <label htmlFor='playstyle'>Playstyle Preference</label>
                    <select id="playstyle" name="playstyle" defaultValue={formState.playstyle} onChange={handlePlaystyleChange} required>
                        <option value="">Select a playstyle</option>
                        <option value="Casual">Casual</option>
                        <option value="Semi-Casual">Semi-Casual</option>
                        <option value="Competitive">Competitive</option>
                    </select>
                </div>
                {/* Avatar selection */}
                <div className="formRow flexDirectionColumn flexItemsSpaceBetween width-100">
                    <label id="avatarLabel" htmlFor="avatar">Select a Profile Picture</label>
                    <fieldset className="flexDirectionColumn justifyContentStretch" style={{ margin: 0, border: 0, padding: 0 }} role="radiogroup" id="avatar" name="avatar" aria-required="true" aria-labelledby="avatarLabel" onChange={handleRadioChange}>
                        <div className="flexDirectionRow justifyContentSpaceEvenly flexGrow-1">
                            <div>
                                <input style={inputStyle} tabIndex={0} type="radio" id="avatar1" name="avatar" value="avatar1" />
                                <label style={labelStyles.default} htmlFor="avatar1"><Avatar avatar="avatar1" size="fill" alt="Avatar 1" /></label>
                            </div>
                            <div>
                                <input style={inputStyle} tabIndex={1} type="radio" id="avatar2" name="avatar" value="avatar2" />
                                <label style={labelStyles.default} htmlFor="avatar2"><Avatar avatar="avatar2" size="fill" alt="Avatar 2" /></label>
                            </div>
                        </div>
                        <div className="flexDirectionRow justifyContentSpaceEvenly flexGrow-1">
                            <div>
                                <input style={inputStyle} tabIndex={2} type="radio" id="avatar3" name="avatar" value="avatar3" />
                                <label style={labelStyles.default} htmlFor="avatar3"><Avatar avatar="avatar3" size="fill" alt="Avatar 3" /></label>
                            </div>
                            <div>
                                <input style={inputStyle} tabIndex={3} type="radio" id="avatar4" name="avatar" value="avatar4" />
                                <label style={labelStyles.default} htmlFor="avatar4"><Avatar avatar="avatar4" size="fill" alt="Avatar 4" /></label>
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="formRow flexItemsSpaceBetween">
                    <button className="alignSelfCenter roundedBlueBtn" type="submit" onClick={handleSubmit}>Continue</button>
                    <button className="alignSelfCenter roundedGrayBtn" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </>
    );
};
