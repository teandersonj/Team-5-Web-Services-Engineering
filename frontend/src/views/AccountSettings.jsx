import React, { useState, useEffect } from "react";

import LabeledInput from "../components/LabeledInput";
import ValidationErrorList from "../components/ValidationErrorList";

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

    // Whenever the user changes, reset the form state to the newest values
    useEffect(() => {
        setFormState(initialState());
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        // Determine if the value's the same as the user's value and remove modified if it is
        setFormState((prev) => ({ ...prev, [id]: value, modified: { ...prev.modified, [id]: value !== user[id] } }));
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
        // TODO: Send the changes to the server for validation and updating
        updateUser({ [fieldName]: formState[fieldName] });
        // Disable the field
        toggleDisabled(e, fieldName);
    };

    return (
        <>
            <h1 className="pageHeading centerText">Account Settings</h1>
            <p>On this page, you can see the different settings used by your profile. All of these settings are able to be edited at your discretion. Your profile picture can be changed by clicking the orange icon on your profile picture to the left.</p>
            <ValidationErrorList errors={formState.errors} />
            <div className="flexDirectionRow justifyContentSpaceBetween">
                <CustomLabeledInput type="text" id="username" label="Username" toggleDisabled={toggleDisabled} value={formState.username} modified={formState.modified.username} onChange={handleInputChange} submitField={submitField} required disabled={formState.disabled.username} />
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
                        { value: "Semi", label: "Semi-Competitive" },
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
    const labeledInputProps = {
        innerContainer: modified && true,
        innerContainerClassName: "flexDirectionRow justifyContentSpaceBetween width-100",
        innerContainerChildren: modified && button
    };

    return (
        <div key={"labeledInputContainer" + id} style={containerStyle} className="flexDirectionColumn">
            <div className="width-100 flexDirectionRow justifyContentSpaceBetween">
                <label htmlFor={id}>{label}</label>
                <button style={editButtonStyle} onClick={(e) => toggleDisabled(e, id)}>
                    {disabled ? `Edit` : `Cancel`}
                </button>
            </div>
            <LabeledInput key={"labeledInput" + id} id={id} disabled={disabled} {...labeledInputProps} {...rest} />
        </div>
    );
};

export default AccountSettings;
