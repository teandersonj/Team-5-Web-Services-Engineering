import React from 'react';
import Avatar from '../components/Avatar';

const BlockedUsers = (props) => {
    // eslint-disable-next-line no-unused-vars
    const { user, updateUser } = props;

    const blockedUserCardStyle = {
        width: "175px",
        margin: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    }

    const handleUnblockUser = (event, targetPlayerId) => {
        event.preventDefault();
        if (window.confirm("Are you sure you want to unblock this user?") == false) {
            return;
        }

        // TODO: integrate with backend
        // Remove targetPlayerId from user.blockedPlayers
        const newList = user?.blockedPlayers.filter?.(player => player.pk !== targetPlayerId);
        updateUser({
            blockedPlayers: newList,
        });
    }

    return (
        <>
            <h2 className="pageHeading centerText">Blocked Users</h2>
            <p>On this page, you can see the different users you have blocked on this account. These users cannot see your account, directly interact with you, or send you messages. You will also be unable to send them messages until they are unblocked.</p>
            <div className="flexDirectionRow flexWrap-True">
                {(user.blockedPlayers?.length > 0 && user.blockedPlayers?.map((player, index) => (
                    <div key={player.username} style={blockedUserCardStyle}>
                        <div className="justifyContentCenter">
                            <Avatar avatar={player.AvatarName || player.avatar} size="small" />
                        </div>
                        <div className="justifyContentCenter">
                            <span style={{ fontSize: 20, fontStyle: "semi-bold" }}>{player.user?.username}</span>
                        </div>
                        <button style={{ backgroundColor: "var(--color-red)", color: "white", borderRadius: "5px" }} onClick={e => handleUnblockUser(e, player.pk)}>Unblock User</button>
                    </div>
                ))) || <span className="centerText">You haven't blocked any users yet.</span>}
            </div>
        </>
    );
}

export default BlockedUsers;
