import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import Modal from 'react-modal';

import BlockedUsers from "../views/BlockedUsers";
import AccountSettings from "../views/AccountSettings";
import EditAvatarModal from "../views/EditAvatarModal";
import DeactivateAccountModal from "../views/DeactivateAccountModal";
import EditPasswordModal from "../views/EditPasswordModal";

import LabeledInput from "../components/LabeledInput";
import Avatar from "../components/Avatar";

export default function UserSettings(props) {
    const { user, updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [pageState, setPageState] = useState("accountSettings");
    const [modalState, setModalState] = useState({
        isOpen: false,
        mode: "",
    });

    // We need the Edit button to appear over top the bottom-right corner of the avatar
    const editButtonStyle = {
        // backgroundColor: "var(--color-gold)",
        color: "var(--color-black)",
        position: "relative",
        top: "-2em",
        right: "-4em",
        cursor: "pointer",
        width: "64px",
        height: "64px",
    };

    const handleAvatarEditClicked = (e) => {
        e.preventDefault();
        setModalState({ isOpen: true, mode: "editAvatar" });
    };

    const handleDeactivateClicked = (e) => {
        e.preventDefault();
        setModalState({ isOpen: true, mode: "deactivate" });
    };

    return (
        <div className="sectionContainer">
            <div className="leftSection flexDirectionColumn centerText justifyContentFlexStart">
                <div className="centerContent">
                    <Avatar avatar={user.avatar} size="large" />
                    <label htmlFor="edit-avatar" style={editButtonStyle} onClick={(e) => handleAvatarEditClicked(e)}>
                        <img id="edit-avatar" src="/img/icons/editIconButton.png" alt="Edit Avatar" width="64px" height="64px" />
                    </label>
                </div>
                <LabeledInput type="text" id="memberSince" label="Member Since" defaultValue={new Date(user.memberSince)?.toDateString()} orientation="vertical" disabled />
                <button className="width-100" onClick={() => navigate("/profile")}>View Public Profile</button>
                {/* <button className="width-100" onClick={() => navigate("/general-settings")}>General Setttings</button> */}
                {pageState === "accountSettings" ? <button className="width-100" onClick={() => setPageState("blockedUsers")} name="blockedUsersBtn">Blocked Users</button> : <button className="width-100" onClick={() => setPageState("accountSettings")} data-testid="accountSettingsBtn">Account Settings</button>}
                <button className="width-100" data-testid="deactivateAccountBtn" style={{ backgroundColor: "var(--color-red)" }} onClick={(e) => handleDeactivateClicked(e)}>Deactivate Account</button>
            </div>
            <div className="rightSection flexDirectionColumn justifyContentStretch">
                {/* If the Blocked Users btn was clicked we'll show that screen in place of Acct Settings */}
                {pageState !== "accountSettings" ? <BlockedUsers user={user} updateUser={updateUser} /> : <AccountSettings user={user} updateUser={updateUser} modalState={modalState} setModalState={setModalState} />}
            </div>
            <Modals modalState={modalState} setModalState={setModalState} user={user} updateUser={updateUser} />
        </div>
    );
};

const Modals = (props) => {
    const { modalState, setModalState, user, updateUser } = props;

    const modalStyles = {
        container: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            zIndex: "10",
        },
        body: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            zIndex: "10",
        },
    };

    return (
        <Modal setAppElement={"#root"} onRequestClose={() => setModalState({ isOpen: false, mode: "" })} isOpen={modalState.isOpen} style={modalStyles}>
            {modalState.mode === "editAvatar" && <EditAvatarModal user={user} updateUser={updateUser} modalState={modalState} setModalState={setModalState} />}
            {modalState.mode === "updatePassword" && <EditPasswordModal user={user} updateUser={updateUser} modalState={modalState} setModalState={setModalState} />}
            {modalState.mode === "deactivate" && <DeactivateAccountModal user={user} updateUser={updateUser} modalState={modalState} setModalState={setModalState} />}
        </Modal>
    );
};
