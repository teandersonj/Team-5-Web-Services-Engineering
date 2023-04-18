/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider';
import Modal from 'react-modal';
import axios from 'axios';

import Avatar from '../components/Avatar';

const overrideAvatarContainerStyle = {
    width: '7rem',
    height: '7rem',
    margin: '2em auto 0px auto',
};

export default function FriendsListControlsModal(props) {
    const { user, updateUser, addFriend, removeFriend } = useContext(UserContext);
    const { targetFriend, isOpen, closeModal } = props;

    const headerTitle = {
        fontWeight: 'bold',
        borderBottom: '1px solid var(--color-gold)',
    };
    
    if (targetFriend === undefined || targetFriend === null) {
        closeModal(false);
    }

    const handleRemoveFriend = async (e) => {
        e.preventDefault();
        if (removeFriend(e, targetFriend.pk)) {
            closeModal(false);
        }
    };

    const addToParty = async (e) => {
        e.preventDefault();
        updateUser({
            currentParty: {
                ...user.currentParty,
                members: [...user.currentParty.members, targetFriend],
            }
        });
    };

    const removeFromParty = async (e) => {
        e.preventDefault();
        updateUser({
            currentParty: {
                ...user.currentParty,
                members: user.currentParty.members.filter((member) => member?.pk !== targetFriend.pk),
            }
        });
    };

    const handleBlockFriend = async (e) => {
        e.preventDefault();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={() => closeModal(false)} appElement={document.getElementById("#root")} className="modal" overlayClassName="overlay"
            shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} ariaHideApp={false}>
            <div className="modalContainer">
                <div style={{...headerTitle}} className='flexDirectionRow'>
                    <h2>Friend Controls</h2>
                    <button className="roundedBlueBtn" onClick={() => closeModal(false)}>X</button>
                </div>
                <div className="modalContent">
                    <Avatar avatar={targetFriend.avatar} size="large" containerStyle={overrideAvatarContainerStyle} playerStatus={targetFriend.currentStatus}/>
                    <h3 className='centerContent'>{targetFriend.username}</h3>
                    <div className="flexDirectionColumn">
                        <button className="longRoundedBlueBtn">View Profile</button>
                        {/* If the friend is in our party, show a button to remove them, otherwise show a button to add them */}
                        {user.currentParty.members.find?.((member) => member.pk === targetFriend.pk) ? (
                            <button className="longRoundedRedBtn" onClick={(e) => removeFromParty(e)}>Remove From Party</button>
                        ) : (
                            <button className="longRoundedBlueBtn" onClick={(e) => addToParty(e)}>Add To Party</button>
                        )}
                        <button className="longRoundedRedBtn" onClick={handleRemoveFriend}>Remove Friend</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
