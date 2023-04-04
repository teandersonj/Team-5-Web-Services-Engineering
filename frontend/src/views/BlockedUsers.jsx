import React, { useEffect } from 'react';
import Avatar from '../components/Avatar';

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
        width: "175px",
        margin: "5px",
        padding: "5px",
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
            <div className="flexDirectionRow flexWrap-True">
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

export default BlockedUsers;
