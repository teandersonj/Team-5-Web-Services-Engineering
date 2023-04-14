import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import Avatar from '../components/Avatar';

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
        boxShadow: "none"
    },
    unchecked: {
        border: "none",
        boxShadow: "none"
    },
    checked: {
        border: "5px solid var(--color-red)",
        borderRadius: "50%",
        boxShadow: "2px 4px 10px var(--color-gray)"
    }
};

const modalStyles = {
    container: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    }
}


export default function EditAvatarModal(props) {
    const { user, updateUser, setModalState } = props;

    const [state, setState] = useState({
        avatar: user.avatar,
        isModified: false,
    });

    const handleRadioChange = (event) => {
        const newState = { ...state };
        const { id, value } = event.target;

        // Reset the previously selected avatar
        if (newState["avatar"] && newState["avatar"] !== "Unset") {
            if (newState["avatar"] === value) return;
            Object.assign(document.querySelector(`label[for='${newState["avatar"]}']`).style, labelStyles.unchecked);
            document.getElementById(newState["avatar"]).checked = false;
        }

        // Style, select, and apply the new avatar selection
        document.getElementById(id).checked = true;
        newState["avatar"] = value;
        newState.isModified = true;
        Object.assign(document.querySelector(`label[for='${newState["avatar"]}']`).style, labelStyles.checked);
        setState(newState);
        return;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make sure the avatar is different than the user's current so we don't waste a request
        if (state.isModified && state.avatar !== user.avatar) {
            const requestBody = {
                pk: user.playerId,
                user: {
                    username: user.username,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                },
                AvatarName: state.avatar,
                Bio: user.bio,
                Playstyle: user.playstyle,
                CompositeSkillLevel: user.compositeSkillLevel,
                Attitude: user.attitude,
            };

            // For now we only have PUT /player/:userId update endpoint so handle only those fields
            axios.put(`/api/player/${user.playerId}`, requestBody).then((res) => {
                if (process.env.NODE_ENV === "development")
                    console.log("PUT via AccountSettings res: ", res);

                if (res.status !== 200 || !res.data?.AvatarName) {
                    throw new Error({ status: res.status, response: res.data });
                }

                updateUser({ avatar: res.data.AvatarName });
                setState({ avatar: "", isModified: false });
                closeModal(e);
                toast.success("Avatar updated successfully!");
            }).catch((err) => {
                if (process.env.NODE_ENV === "development")
                    console.log("PUT via EditAvatar err: ", err);

                toast.error("There was an error updating your avatar. Please try again later.");
                return false;
            });
        };
    };

    const handleAvatarEditCancel = (e) => {
        e.preventDefault();
        if (state.isModified && window.confirm("Are you sure you want to cancel? Any changes will be lost.") === true) {
            setState({ currentAvatar: user.avatar, newAvatar: null });
        }
        closeModal(e);
    };

    const closeModal = (e) => {
        e.preventDefault();
        setModalState((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <>
            <div style={modalStyles.content}>
                <div style={modalStyles.header}>
                    <h2>Edit Avatar</h2>
                    <button onClick={(e) => handleAvatarEditCancel(e)}>X</button>
                </div>
                <div style={modalStyles.body}>
                    <form onSubmit={handleSubmit}>
                        <div className="formRow flexDirectionColumn flexItemsSpaceBetween width-100">
                            <p><label id="avatarLabel" htmlFor="avatar">Select a Profile Picture</label></p>
                            <fieldset className="flexDirectionColumn justifyContentStretch" style={{ margin: 0, border: 0, padding: 0 }} role="radiogroup" id="avatar" name="avatar" aria-required="true" aria-labelledby="avatarLabel" onChange={(e) => handleRadioChange(e)}>
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
                            <button className="alignSelfCenter roundedBlueBtn" type="submit" onClick={(e) => handleSubmit(e)}>Continue</button>
                            <button className="alignSelfCenter roundedGrayBtn" onClick={(e) => handleAvatarEditCancel(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
