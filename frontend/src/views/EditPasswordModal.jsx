import { useContext, useEffect, useState } from 'react';
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
        newPassword: "",
        newPassword2: "",
        isModified: false,
        errors: {},
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setState((prev) => ({ ...prev, [id]: value, isModified: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        closeModal(e);
    };

    const closeModal = (e) => {
        e.preventDefault();
        setModalState((prev) => ({ ...prev, isOpen: false, mode: "" }));
    };

    return (
        <>
            <div style={modalStyles.content}>
                <div style={modalStyles.header}>
                    <h2>Edit Password</h2>
                    <button onClick={(e) => closeModal(e)}>X</button>
                </div>
                <div style={modalStyles.body}>
                    <form onSubmit={handleSubmit}>
                        <div className="formRow flexDirectionColumn flexItemsSpaceBetween width-100">
                            <LabeledInput label="Current Password:" type="password" id="currentPassword" name="currentPassword" value={state.currentPassword} onChange={(e) => handleChange(e)} />
                            <LabeledInput label="New Password:" type="password" id="newPassword" name="newPassword" value={state.newPassword} onChange={(e) => handleChange(e)} />
                            <LabeledInput label="Confirm New Password:" type="password" id="newPassword2" name="newPassword2" value={state.newPassword2} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="formRow flexItemsSpaceBetween">
                            <button className="alignSelfCenter roundedBlue" type="submit" onClick={(e) => handleSubmit(e)}>Continue</button>
                            <button className="alignSelfCenter roundedGray" onClick={(e) => closeModal(e)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
