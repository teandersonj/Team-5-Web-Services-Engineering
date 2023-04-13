/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import Modal from 'react-modal';
import axios from 'axios';

export default function FriendsListControlsModal(props) {
    const { user, updateUser } = useContext(UserContext);
    const { targetFriend, isOpen, closeModal } = props;

    if (targetFriend === undefined || targetFriend === null) {
        closeModal(false);
    }

    const handleAddFriend = async (e) => {
        e.preventDefault();
        await axios.post('/api/friends/add', { friendId: targetFriend._id })
            .then((res) => {
                if (res.status === 200) {
                    // Update the user's friends list
                    updateUser(res.data.user);
                }
            });
    };

    const handleRemoveFriend = async (e) => {
        e.preventDefault();
        await axios.post('/api/friends/remove', { friendId: targetFriend._id })
            .then((res) => {
                if (res.status === 200) {
                    // Update the user's friends list
                    updateUser(res.data.user);
                }
            });
    };

    const handleBlockFriend = async (e) => {
        e.preventDefault();
        await axios.post('/api/friends/block', { friendId: targetFriend._id })
            .then((res) => {
                if (res.status === 200) {
                    // Update the user's friends list
                    updateUser(res.data.user);
                }
            });
    };


    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal(false)} rootElement={document.getElementById('root')} className="modal" overlayClassName="modalOverlay"
            shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} shouldFocusAfterRender={true} shouldReturnFocusAfterClose={true} ariaHideApp={false}>
            <div className="modalContainer">
                <div className="modalHeader">
                    <h2>Friend Controls</h2>
                    <button className="closeButton" onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="modalBody">
                    <h3>{targetFriend.username}</h3>
                    <div className="modalBodyContent">
                        <div>
                            <button className="modalBodyContentRowButton">Remove Friend</button>
                        </div>
                        <div>
                            <button className="modalBodyContentRowButton">Block Friend</button>
                        </div>
                        <div>
                            <button className="modalBodyContentRowButton">Report Friend</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
