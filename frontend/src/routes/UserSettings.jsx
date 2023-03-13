import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import LabeledInput from "../components/LabeledInput";

export default function UserSettings(props) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [pageState, setPageState] = useState("accountSettings");

    return (
        <>
            <h1 className="pageHeading centerText">Account Settings</h1>
            <hr className="width-100" />
            {/* TODO: is this necessary? <span>Use this page to change settings related to your account, <br />and to access General App Settings and Blocked Users.</span> */}
            <div className="sectionContainer">
                <div className="leftSection flexDirectionColumn centerText justifyContentSpaceBetween">
                    {/* This'll be the user's avatar in a circle, and we need to have a button on the bottom right corner for Edit */}
                    <div>
                        <img style={{ display: "block", margin: "5px auto" }} src={user.avatar || "https://via.placeholder.com/150"} alt="User Avatar" className="avatar imageShadow" />
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
                    {pageState !== "accountSettings" ? <BlockedUsers user={user} /> : <AccountSettings user={user} />}
                </div>
            </div>
        </>
    );
}

const AccountSettings = (props) => {
    const { user } = props;
    const [formState, setFormState] = useState({
        username: user.username,
        password: "********",
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        avatar: user.avatar,
        playstyle: user.playstyle,
        disabled: true,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const submitForm = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={submitForm}>
                <div className="centerText"><button onClick={() => setFormState((prev) => ({ ...prev, disabled: !prev.disabled }))}>{!!formState.disabled ? "Edit Account Info" : "Cancel Editing"}</button></div>
                <fieldset style={{ border: 0 }} disabled={formState.disabled}>
                    <div className="flexDirectionRow justifyContentSpaceEvenly">
                        <LabeledInput type="text" id="username" label="Username" defaultValue={formState.username} orientation="vertical" onChange={handleInputChange} required />
                        <LabeledInput type="password" id="password" label="Password" defaultValue="********" orientation="vertical" disabled required />
                    </div>
                    <div className="flexDirectionRow justifyContentSpaceEvenly">
                        <LabeledInput type="text" id="fName" label="First Name" defaultValue={formState.fName} orientation="vertical" onChange={handleInputChange} required />
                        <LabeledInput type="text" id="lName" label="Last Name" defaultValue={formState.lName} orientation="vertical" onChange={handleInputChange} required />
                    </div>
                    <div className="flexDirectionRow justifyContentSpaceEvenly">
                        <LabeledInput type="email" id="email" label="Email" defaultValue={formState.email} orientation="vertical" onChange={handleInputChange} required />
                        <div className="flexDirectionColumn">
                            <label htmlFor='playstyle'>Playstyle Preference</label>
                            <select id="playstyle" style={{ width: "225px" }} name="playstyle" defaultValue={formState.playstyle} onChange={handleInputChange} required>
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
    const { user } = props;
    return (
        <>
            <h2 className="centerText">Blocked Users</h2>
            <div className="flexDirectionColumn justifyContentStretch">
                {user.blockedUsers?.map((blockedUser, index) => (
                    <div key={index} className="flexDirectionRow justifyContentSpaceEvenly">
                        <img src="/img/Logo.png" />
                        <div className="flexDirectionColumn">
                            <LabeledInput type="text" id="username" label="Username" defaultValue={blockedUser.username || "Unset"} orientation="vertical" disabled />
                            <LabeledInput type="text" id="fName" label="First Name" defaultValue={blockedUser.fName || "Unset"} orientation="vertical" disabled />
                            <LabeledInput type="text" id="lName" label="Last Name" defaultValue={blockedUser.lName || "Unset"} orientation="vertical" disabled />
                        </div>
                    </div>
                )) || <span className="centerText">You haven't blocked any users yet.</span>}
            </div>
        </>

    );
}
