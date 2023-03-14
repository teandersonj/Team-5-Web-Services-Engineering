import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

import LabeledInput from "../components/LabeledInput";
import PlayerCard from "../components/PlayerCard";

export default function UserSettings(props) {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [pageState, setPageState] = useState("accountSettings");

    return (
        <>
            <h1 className="pageHeading centerText">Account Settings</h1>
            <p>Use this page to change settings related to your account, <br />and to access General App Settings and Blocked Users.</p>
            <hr className="width-100" />
            <div className="sectionContainer">
                <div className="leftSection flexDirectionColumn centerText justifyContentSpaceBetween">
                    <div>
                        <img style={{ display: "block", margin: "5px auto" }} src={"/img/avatars/" + user.avatar + ".jpg" || "https://via.placeholder.com/150"} alt="User Avatar" className="avatar imageShadow" />
                        {/* If we're on the account settings screen, show the edit button */}
                        {/* {pageState === "accountSettings" && ()} */}
                        <LabeledInput type="text" id="memberSince" label="Member Since" defaultValue={user.memberSince || "Unset"} orientation="vertical" disabled />
                        <button onClick={() => navigate("/profile")}>View Public Profile</button>
                        <button onClick={() => navigate("/general-settings")}>General Setttings</button>
                        {pageState === "accountSettings" ? <button onClick={() => setPageState("blockedUsers")}>Blocked Users</button> : <button onClick={() => setPageState("accountSettings")}>Account Settings</button>}
                    </div>
                    <div>
                        <button>Deactivate Account</button>
                    </div>
                </div>
                <div className="rightSection flexDirectionColumn justifyContentStretch">
                    {/* If the Blocked Users btn was clicked we'll show that screen in place of Acct Settings */}
                    {pageState !== "accountSettings" ? <BlockedUsers user={user} updateUser={updateUser} /> : <AccountSettings user={user} />}
                </div>
            </div>
        </>
    );
}

const AccountSettings = (props) => {
    const { user } = props;
    const initialState = () => ({
        username: user.username,
        password: "********",
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        avatar: user.avatar,
        playstyle: user.playstyle,
        disabled: true,
    });

    const [formState, setFormState] = useState(initialState());

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const toggleDisabled = (e) => {
        e.preventDefault();
        if (formState.disabled === false) {
            if (window.confirm("Are you sure you want to cancel editing?") === true) {
                // If we're disabling the form, reset the state to the initial state
                
                setFormState(initialState());
            } else return;
        } else {
            setFormState((prev) => ({ ...prev, disabled: false }));
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        setFormState({
            ...formState,
            username: "Testing",

        })
    };

    return (
        <>
            <form onSubmit={submitForm}>
                <div className="centerText"><button onClick={toggleDisabled}>{!!formState.disabled ? "Edit Account Info" : "Cancel Editing"}</button></div>
                <fieldset style={{ border: 0 }} disabled={formState.disabled}>
                    <div className="flexDirectionRow justifyContentSpaceEvenly">
                        <LabeledInput type="text" id="username" label="Username" value={formState.username} orientation="vertical" onChange={handleInputChange} required />
                        <LabeledInput type="password" id="password" label="Password" defaultValue="********" orientation="vertical" disabled required />
                    </div>
                    <div className="flexDirectionRow justifyContentSpaceEvenly">
                        <LabeledInput type="text" id="first_name" label="First Name" value={formState.first_name} orientation="vertical" onChange={handleInputChange} required />
                        <LabeledInput type="text" id="last_name" label="Last Name" value={formState.last_name} orientation="vertical" onChange={handleInputChange} required />
                    </div>
                    <div className="flexDirectionRow justifyContentSpaceEvenly">
                        <LabeledInput type="email" id="email" label="Email" value={formState.email} orientation="vertical" onChange={handleInputChange} required />
                        <div className="flexDirectionColumn">
                            <label htmlFor='playstyle'>Playstyle Preference</label>
                            <select id="playstyle" style={{ width: "225px" }} name="playstyle" value={formState.playstyle} onChange={handleInputChange} required>
                                <option value="">Select a playstyle</option>
                                <option value="Casual">Casual</option>
                                <option value="Semi">Semi-Competitive</option>
                                <option value="Competitive">Competitive</option>
                            </select>
                        </div>
                    </div>
                    <p className="centerText">
                        {!formState.disabled && <button type="submit" onClick={(e) => submitForm(e)}>Submit Changes</button>}
                    </p>
                </fieldset>
            </form>
            {/* Output the form state here for debugging */}
            <p style={{ display: "block", margin: "5px auto", width: "300px", height: "125px", wordWrap: "break-word", overflow: "scroll" }}>{JSON.stringify(formState)}</p>
        </>
    );
};

const BlockedUsers = (props) => {
    const { user, updateUser } = props;

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
    }, [])


    const blockedUserCardStyle = {
        width: "300px",
        margin: "5px",
        padding: "5px",
        border: "1px solid black",
        borderRadius: "5px",
        backgroundColor: "var(--color-gray)",
        boxShadow: "0 0 5px 0px black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    }

    const inputStyle = {
        backgroundColor: "var(--color-dark-blue)",
    };

    return (
        <>
            <h2 className="centerText">Blocked Users</h2>
            <div className="flexDirectionRow justifyContentSpaceEvenly flexWrap-True">
                {user.blockedUsers?.map((blockedUser, index) => (
                    <div key={index} style={blockedUserCardStyle}>
                        <div className="justifyContentCenter">
                            <img style={{ display: "block" }} src={"/img/avatars/" + user.avatar + ".jpg" || "/img/Logo.png"} width="75px" height="75px" />
                        </div>
                        <LabeledInput inputStyle={inputStyle} type="text" id="username" label="Username" defaultValue={user.username || "Unset"} orientation="vertical" disabled />
                        <LabeledInput inputStyle={inputStyle} type="text" id="first_name" label="First Name" defaultValue={user.first_name || "Unset"} orientation="vertical" disabled />
                        <LabeledInput inputStyle={inputStyle} type="text" id="last_name" label="Last Name" defaultValue={user.last_name || "Unset"} orientation="vertical" disabled />
                        <button>Unblock User</button>
                    </div>
                )) || <span className="centerText">You haven't blocked any users yet.</span>}
            </div>
        </>

    );
}
