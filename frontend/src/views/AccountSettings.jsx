import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import LabeledInput from "../components/LabeledInput";
import ValidationErrorList from "../components/ValidationErrorList";
import toast from "react-hot-toast";

// TODO: Apply validation rules

const AccountSettings = (props) => {
    const { user, updateUser } = props;

    const initialState = () => ({
        username: user.username,
        password: "********",
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
        playstyle: user.playstyle,
        bio: user.bio,
        disabled: { username: true, password: true, first_name: true, last_name: true, email: true, avatar: true, playstyle: true, bio: true },
        modified: {},
        errors: {}
    });

    const [formState, setFormState] = useState(initialState());

    const currentlyFocusedInput = useRef(null);

    // Whenever the user changes, reset the form state to the newest values
    useEffect(() => {
        setFormState(initialState());
    }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

    // Whenever the form state changes, focus on the input that was modified
    useEffect(() => {
        if (currentlyFocusedInput.current) {
            document.getElementById(currentlyFocusedInput.current).focus();
            // Remove the reference so that when we move to a different input, we don't focus on the previous one
            currentlyFocusedInput.current = null;
        }
    }, [formState]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        // Determine if the value's the same as the user's value and set the modified state accordingly
        setFormState((prev) => ({
            ...prev,
            [id]: value,
            modified: {
                ...prev.modified,
                [id]: value !== user[id]
            }
        }));

        // When an input is modified, store a reference to it so that when the component re-renders with the Submit button,
        // focus is retained in that input field
        currentlyFocusedInput.current = id;
    };

    const toggleDisabled = (e, fieldName) => {
        e.preventDefault();
        const newState = { ...formState };
        if (formState.modified[fieldName]) {
            newState[fieldName] = user[fieldName];
            newState.modified[fieldName] = false;
        }
        newState.disabled[fieldName] = !newState.disabled[fieldName];
        setFormState(newState);
    };

    const submitField = (e, fieldName) => {
        e.preventDefault();
        
        // TODO: Temporarily disable the field
        
        // TODO: Certain fields are related to the User (username, first_name, last_name) - Password will be handled elsewhere
        // and others are related to the Player (email, avatar, playstyle, attitude, compositeSkillLevel, bio)
        // We need to determine which one we're dealing with and send the appropriate data to the server
        // For now this represents what the player/ endpoint expects
        const requestBody = {
            pk: user.playerId,
            user: {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            },
            AvatarName: user.avatar,
            Bio: formState.bio,
            Playstyle: formState.playstyle,
            CompositeSkillLevel: user.compositeSkillLevel,
            Attitude: user.attitude,
        };

        // For now we only have PUT /player/:userId update endpoint so handle only those fields
        axios.put(`/api/player/${user.playerId}`, requestBody).then((res) => {
            if (process.env.NODE_ENV === "development")
                console.log("PUT via AccountSettings res: ", res);
            
            if (res.status !== 200) {
                throw new Error({ status: res.status, response: res.data });
            }

            // Get the updated value for the specific field passed in from the response
            // But account for mismatch between the field name and the response key
            const fieldNameMap = {
                username: "username",
                first_name: "first_name",
                last_name: "last_name",
                email: "email",
                avatar: "AvatarName",
                playstyle: "Playstyle",
                bio: "Bio",
                compositeSkillLevel: "CompositeSkillLevel",
                attitude: "Attitude",
            };
            const updatedValue = res.data[fieldNameMap[fieldName]];

            // Update the user state with the new value
            updateUser({ [fieldName]: updatedValue });
            // Disable the field
            toast.success(`Successfully updated ${fieldName}!`);
            toggleDisabled(e, fieldName);
        }).catch((err) => {
            if (process.env.NODE_ENV === "development")
                console.log("PUT via AccountSettings err: ", err);
            
            toast.error("There was an error updating your profile. Please try again later.");
            // Disable and reset the field
            toggleDisabled(e, fieldName);
        });
    };

    return (
        <>
            <h1 className="pageHeading centerText">Account Settings</h1>
            <p>On this page, you can see the different settings used by your profile. All of these settings are able to be edited at your discretion. Your profile picture can be changed by clicking the orange icon on your profile picture to the left.</p>
            <ValidationErrorList errors={formState.errors} />
            <div className="flexDirectionRow justifyContentSpaceBetween">
                <CustomLabeledInput key="tlUsername" type="text" id="username" label="Username" toggleDisabled={toggleDisabled} value={formState.username} modified={formState.modified.username} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.username} />
                <CustomLabeledInput type="password" id="password" label="Password" toggleDisabled={(e) => { e.preventDefault(); props.setModalState({ isOpen: true, mode: "updatePassword" }) }} value={formState.password} disabled={true} />
            </div>
            <div className="flexDirectionRow justifyContentSpaceBetween">
                <CustomLabeledInput type="text" id="first_name" label="First Name" toggleDisabled={toggleDisabled} value={formState.first_name} modified={formState.modified.first_name} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.first_name} />
                <CustomLabeledInput type="text" id="last_name" label="Last Name" toggleDisabled={toggleDisabled} value={formState.last_name} modified={formState.modified.last_name} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.last_name} />
            </div>
            <div className="flexDirectionRow justifyContentSpaceBetween">
                <CustomLabeledInput type="email" id="email" label="Email" toggleDisabled={toggleDisabled} value={formState.email} modified={formState.modified.email} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.email} />
                <CustomLabeledInput type="select" id="playstyle" label="Playstyle" toggleDisabled={toggleDisabled} value={formState.playstyle} modified={formState.modified.playstyle} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.playstyle} options={
                    [
                        { value: "Casual", label: "Casual" },
                        { value: "Semi-Casual", label: "Semi-Casual" },
                        { value: "Competitive", label: "Competitive" },
                    ]
                } />
            </div>
            <CustomLabeledInput type="textarea" id="bio" label="Bio" toggleDisabled={toggleDisabled} value={formState.bio} modified={formState.modified.bio} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.bio} />
        </>
    );
};

const CustomLabeledInput = (props) => {
    const { label, id, disabled, toggleDisabled, modified, submitField, ...rest } = props;

    // We need the containers to be the same width, and appear at opposite sides of the parent container
    const containerStyle = {
        width: (id !== "bio") ? "48%" : "100%",
    };

    // If the user has modified the field, then we need to add a submit button
    // and alter the styling of the input field to fit it    
    const submitBtnStyle = {
        backgroundColor: "var(--color-light-blue)",
        color: "var(--color-white)",
        padding: "7px 5px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        marginLeft: "5px",
        flexGrow: 1
    };

    const editButtonStyle = {
        display: "block",
        background: "none",
        padding: 0,
        margin: 0,
        color: "var(--color-light-blue)"
    };

    const button = (<button key={"editButton-"+id} style={submitBtnStyle} onClick={(e) => submitField(e, id)}>Submit</button>);

    // Depending if they've modified the field, we need to add the submit button
    // and alter styles accordingly, these'll be passed to LabeledInput
    const labeledInputProps = (modified && true) ?
        {
            innerContainer: true,
            innerContainerClassName: "flexDirectionRow justifyContentSpaceBetween width-100",
            innerContainerChildren: button
        } : {}


    return (
        <div key={"labeledInputContainer" + id} style={containerStyle} className="flexDirectionColumn">
            <div className="width-100 flexDirectionRow justifyContentSpaceBetween">
                <label htmlFor={id}>{label}</label>
                <button style={editButtonStyle} data-testid={"edit-" + id} onClick={(e) => toggleDisabled(e, id)}>
                    {disabled ? `Edit` : `Cancel`}
                </button>
            </div>
            <LabeledInput key={"labeledInputContainer" + id} id={id} disabled={disabled} {...labeledInputProps} {...rest} />
        </div>
    );
};

export default AccountSettings;
