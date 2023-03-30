import React, { useState, useEffect } from "react";

import LabeledInput from "../components/LabeledInput";

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
        modified: {}
    });

    const [formState, setFormState] = useState(initialState());

    // Test it by loading up user state with the dummyJSON
    useEffect(() => {
        fetch("/dummyData.json",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            },
        ).then((res) => res.json()).then((data) => {
            // Update the user's blocked users
            const newData = {
                ...user,
                blockedUsers: data.users
            }
            updateUser(newData);
            return;
        });
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const toggleDisabled = (e, fieldName) => {
        e.preventDefault();

        // Assuming this will enable changes or cancel any changes so need to determine if the field was changed and if we cancel then we need to revert the changes
        // TODO: But if we're using this button as a sort of submit button, then we need to submit the form
        if (!formState.disabled[fieldName] && formState[fieldName] !== user[fieldName]) {
            setFormState((prev) => ({
                ...prev,
                [fieldName]: user[fieldName],
                disabled: {
                    ...prev.disabled,
                    [fieldName]: !formState.disabled[fieldName],
                }
            }));
        } else {
            setFormState((prev) => ({
                ...prev,
                disabled: {
                    ...prev.disabled,
                    [fieldName]: !formState.disabled[fieldName],
                }
            }));
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        alert("Form Submitted");
    };

    return (
        <>
            <h1 className="pageHeading centerText">Account Settings</h1>
            <p>On this page, you can see the different settings used by your profile. All of these settings are able to be edited at your discretion. Your profile picture can be changed by clicking the orange icon on your profile picture to the left.</p>
            <form onSubmit={submitForm}>
                <div className="flexDirectionRow justifyContentSpaceBetween">
                    <LabeledInput type="text" id="username" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="username" label="Username" toggleDisabled={toggleDisabled} />} value={formState.username} orientation="vertical" onChange={handleInputChange} required disabled={formState.disabled.username} />
                    <LabeledInput type="password" id="password" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="password" label="Password" toggleDisabled={(e) => { e.preventDefault(); props.setModalState({ isOpen: true, mode: "updatePassword" }) }} />} defaultValue="********" orientation="vertical" required disabled />
                </div>
                <div className="flexDirectionRow justifyContentSpaceBetween">
                    <LabeledInput type="text" id="first_name" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="first_name" label="First Name" toggleDisabled={toggleDisabled} />} value={formState.first_name} orientation="vertical" onChange={handleInputChange} required disabled={formState.disabled.first_name} />
                    <LabeledInput type="text" id="last_name" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="last_name" label="Last Name" toggleDisabled={toggleDisabled} />} value={formState.last_name} orientation="vertical" onChange={handleInputChange} required disabled={formState.disabled.last_name} />
                </div>
                <div className="flexDirectionRow justifyContentSpaceBetween">
                    <LabeledInput type="email" id="email" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="email" label="Email" toggleDisabled={toggleDisabled} />} value={formState.email} orientation="vertical" onChange={handleInputChange} required disabled={formState.disabled.email} />
                    <div className="flexDirectionColumn">
                        <div className="width-100 flexDirectionRow justifyContentSpaceBetween">
                            <label htmlFor='playstyle'>Playstyle Preference</label>
                            <button style={{ display: "block", background: "none", padding: 0, margin: 0, color: "var(--color-light-blue)" }} onClick={(e) => toggleDisabled(e, "playstyle")}>Edit</button>
                        </div>
                        <select id="playstyle" style={{ minWidth: "230px" }} name="playstyle" value={formState.playstyle} onChange={handleInputChange} required disabled={formState.disabled.playstyle}>
                            <option value="">Select a playstyle</option>
                            <option value="Casual">Casual</option>
                            <option value="Semi">Semi-Competitive</option>
                            <option value="Competitive">Competitive</option>
                        </select>
                    </div>
                </div>
                <LabeledInput type="textarea" id="bio" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="bio" label="Bio" toggleDisabled={toggleDisabled} />} value={formState.bio} orientation="vertical" onChange={handleInputChange} required disabled={formState.disabled.bio} />
            </form>
        </>
    );
};

const EditLabel = (props) => {
    const buttonStyle = {
        display: "block",
        background: "none",
        padding: 0,
        margin: 0,
        color: "var(--color-light-blue)"
    };

    return (
        <>
            {props.label}
            <div>
                {props.active }
                <button style={buttonStyle} onClick={(e) => props.toggleDisabled(e, props.id)} data-testid={"edit-" + props.id}>Edit</button>
            </div>
        </>
    );
};

export default AccountSettings;
