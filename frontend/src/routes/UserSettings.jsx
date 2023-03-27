import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";

import LabeledInput from "../components/LabeledInput";
import PlayerCard from "../components/PlayerCard";
import Avatar from "../components/Avatar";

export default function UserSettings(props) {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [pageState, setPageState] = useState("accountSettings");

    return (
        <>
            <div className="sectionContainer">
                <div className="leftSection flexDirectionColumn centerText justifyContentFlexStart">
                    <Avatar avatar={user.avatar} containerStyle={{ margin: "0 auto" }} imageStyle={{ display: "block", margin: "5px auto" }} size="large" />
                    <div className="width-100 flexDirectionRow justifyContentFlexEnd">
                        <button style={{ backgroundColor: "var(--color-gold)", color: "var(--color-black)" }}>Edit</button>
                    </div>
                        {/* If we're on the account settings screen, show the edit button */}
                    {/* {pageState === "accountSettings" && ()} */}
                    <LabeledInput type="text" id="memberSince" label="Member Since" defaultValue={user.memberSince || "Unset"} orientation="vertical" disabled />
                    <button className="width-100" onClick={() => navigate("/profile")}>View Public Profile</button>
                    {/* <button className="width-100" onClick={() => navigate("/general-settings")}>General Setttings</button> */}
                    {pageState === "accountSettings" ? <button className="width-100" onClick={() => setPageState("blockedUsers")}>Blocked Users</button> : <button className="width-100" onClick={() => setPageState("accountSettings")}>Account Settings</button>}
                    <button className="width-100" style={{ backgroundColor: "var(--color-red)" }}>Deactivate Account</button>
                </div>
                <div className="rightSection flexDirectionColumn justifyContentStretch">
                    {/* If the Blocked Users btn was clicked we'll show that screen in place of Acct Settings */}
                    {pageState !== "accountSettings" ? <BlockedUsers user={user} updateUser={updateUser} /> : <AccountSettings user={user} updateUser={updateUser} />}
                </div>
            </div>
        </>
    );
}

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
                    <LabeledInput type="password" id="password" labelClassName="width-100 flexDirectionRow justifyContentSpaceBetween" label={<EditLabel id="password" label="Password" toggleDisabled={toggleDisabled} />} defaultValue="********" orientation="vertical" required disabled={formState.disabled.password} />
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
    return (
        <>
            {props.label}
            <button style={{ display: "block", background: "none", padding: 0, margin: 0, color: "var(--color-light-blue)" }} onClick={(e) => props.toggleDisabled(e, props.id)}>Edit</button>
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
            <h2 className="pageHeading centerText">Blocked Users</h2>
            <p>On this page, you can see the different users you have blocked on this account. These users cannot see your account, directly interact with you, or send you messages. You will also be unable to send them messages until they are unblocked.</p>
            <div className="flexDirectionRow justifyContentSpaceEvenly flexWrap-True">
                {user.blockedUsers?.map((blockedUser, index) => (
                    <div key={blockedUser.username} style={blockedUserCardStyle}>
                        <div className="justifyContentCenter">
                            <Avatar avatar={blockedUser.avatar} size="small" />
                        </div>
                        <div className="justifyContentCenter">
                            <span style={{ fontSize: 20, fontStyle: "semi-bold" }}>{blockedUser.username}</span>
                        </div>
                        <button style={{ backgroundColor: "var(--color-red)", color: "white", borderRadius: "5px" }}>Unblock User</button>
                    </div>
                )) || <span className="centerText">You haven't blocked any users yet.</span>}
            </div>
        </>
    );
}
