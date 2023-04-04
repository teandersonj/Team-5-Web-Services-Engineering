import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import LabeledInput from '../components/LabeledInput';

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
};

export default function DeactivateAccountModal(props) {
    const { user, updateUser, modalState, setModalState } = props;

    const [state, setState] = useState({
        currentPassword: "",
        errors: {}
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prev) => ({ ...prev, [id]: value, isModified: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state.currentPassword) {
            // TODO: Test if password is correct server-side
            // TODO: If password is correct, deactivate account
            // For now, empty the user state and log out
            updateUser({ loggedIn: false });
            closeModal(e);
            toast.success("Account deactivated successfully.")
        }
    };

    const closeModal = (e) => {
        e.preventDefault();
        setModalState((prev) => ({ ...prev, isOpen: false, mode: "" }));
    };

    return (
        <>
            <div style={modalStyles.content}>
                <div style={modalStyles.header}>
                    <h2>Deactivate Account</h2>
                    <button onClick={(e) => closeModal(e)}>X</button>
                </div>
                <div style={modalStyles.body}>
                    <form onSubmit={handleSubmit}>
                        <div className="formRow flexDirectionColumn flexItemsSpaceBetween width-100">
                            <p>
                                Are you sure you want to deactivate your account? This action cannot be undone.
                                If so, please enter your password to confirm.
                            </p>
                            <LabeledInput label="Password:" type="password" id="currentPassword" name="currentPassword" value={state.currentPassword} onChange={(e) => handleChange(e)} placeholder="Enter your password" required />
                        </div>
                        <div className="formRow flexItemsSpaceBetween">
                            <button className="alignSelfCenter roundedBlueBtn" type="submit" onClick={(e) => handleSubmit(e)}>Deactivate Account</button>
                            <button className="alignSelfCenter roundedGrayBtn" onClick={(e) => closeModal(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
