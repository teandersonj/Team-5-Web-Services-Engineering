import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

// We can use this context to pass the user object to any component that needs it
export const UserContext = createContext({});

// This is the provider that will wrap the entire app, giving User Context access to necessary components
const UserProvider = ({ children }) => {
    const navigate = useNavigate();

    const getInitialState = () => ({
        id: "-1",
        playerId: "-1",
        loggedIn: false,
        username: null,
        first_name: "Unset",
        last_name: "Unset",
        email: "Unset",
        avatar: "avatar1",
        playstyle: "Casual",
        bio: "Unset",
        attitude: "",
        compositeSkillLevel: 0,
        accessToken: "",
        refreshToken: "",
        memberSince: "",
        currentStatus: "Online",
        currentParty: {
            game: "",
            members: []
        },
        friendsList: [],
        favoriteGames: [],
        recentlyPlayedGames: [],
        blockedPlayers: [],
        // Need to know how long they've been logged in for/when they first logged/or used refresh token
        loggedInDateTime: "",
        lastRefreshDateTime: "",
    });

    const [user, setUser] = useState(getInitialState());

    // Whenever the user state changes, update the user in localStorage
    // This is to preserve their state in case of a full page refresh or if they close the tab
    // Ideally this will do some check server-side to make sure the session is still valid and
    // that the user is still logged in there.
    // This is one way to do it without using cookies to store the session info
    // However it is vulnerable to XSS attacks 
    useEffect(() => {
        // console.log("UserProvider noticed a change in the user: ", user, " \nUpdating user in localStorage... "); 
        // Update the user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    // Logs out the user clientside; need to eventually call the serverside logout function
    const logout = (e) => {
        // Have to reset all keyvalue pairs in this temp object before assigning it to state
        // Otherwise, the state will be set to the initial state, but state will still have any new keys added
        const stateReset = Object.keys(user).reduce((acc, v) => ({ ...acc, [v]: undefined }), {});
        // This should reset the state to the initial state and remove the user from localStorage
        setUser({ ...stateReset, ...getInitialState() });
        navigate("/");
    }

    const updateUser = (userInfo) => {
        setUser((prev) => ({ ...prev, ...userInfo }));
    };

    const getFriendInfo = async (friendId) => {
        try {
            const res = await axios.get(`/api/player/${friendId}`);

            if (res.status === 200) {
                return {
                    "pk": res.data.pk,
                    "avatar": res.data.AvatarName,
                    "attitude": res.data.Attitude,
                    "bio": res.data.Bio,
                    "compositeSkillLevel": res.data.CompositeSkillLevel,
                    user: {
                        "id": res.data.user.id,
                        "first_name": res.data.user.first_name,
                        "last_name": res.data.user.last_name,
                        "username": res.data.user.username,
                        "email": res.data.user.email,
                    },
                    // Choose a random status within "Online", "In-Game", "Offline"
                    currentStatus: ["Online", "In-Game", "Offline"][Math.floor(Math.random() * 3)],
                }
            } else {
                return false;
            }
        } catch (err) {
            console.log("Error getting friend info: ", err.response?.data?.message || err.message || err);
            return false;
        }
    };

    // Get the list of friend relationships and store those
    // belonging to our user in the user's friendsList
    const getFriends = async () => {
        try {
            const res = await axios.get('/api/friends/');

            if (res.status === 200) {
                // Filter out the friend relationships that don't belong to our user
                // Get the "FriendPlayer" ID for each relationship
                const friendIds = res.data.map((friend) => {
                    if (friend.Primary === user.playerId && friend.ActiveStatus === true) {
                        return friend.FriendPlayer;
                    }
                    return null;
                });

                // Get the friend info for each friend ID
                const friendInfoPromises = friendIds
                    .filter((friendId) => friendId !== null)
                    .map((friendId) => getFriendInfo(friendId));
                const friendInfo = await Promise.all(friendInfoPromises);

                // Update the user's friends list
                updateUser({
                    friendsList: Array.isArray(friendInfo) ? friendInfo : friendInfo.filter((friend) => friend !== null)
                });

                return true;
            }
        } catch (err) {
            console.log("Error getting friends: ", err.response?.data?.message || err.message || err);
            return false;
        }
    };

    // Given a target friend's playerId, add a new friend to the friends
    // table and update the user's friendsList
    const addFriend = async (e, targetFriendId) => {
        e.preventDefault();
        await axios.post('/api/friends/', {
            "Primary": user.playerId,
            "FriendPlayer": targetFriendId,
            "ActiveStatus": true
        }).then(async (res) => {
            if (res.status === 201 || res.status === 200) {
                // Get the friend's info
                const friendInfo = await getFriendInfo(targetFriendId);

                // Update the user's friends list
                updateUser({
                    friendsList: [
                        ...user.friendsList,
                        ...friendInfo
                    ]
                });
                toast.success("Friend added!");
                return true;
            }
        }).catch((err) => {
            console.log("Error adding friend: ", err.response?.data?.message || err.message || err);
            toast.error("Error adding friend. Please try again later.");
            return false;
        });
    };

    const removeFriend = async (e, targetFriendId) => {
        e.preventDefault();
        await axios.delete('/api/friends/', {
            data: {
                "Primary": user.playerId,
                "FriendPlayer": targetFriendId,
                "ActiveStatus": true
            }
        }).then(async (res) => {
            if (res.status === 200 || res.status === 204) {
                // Update the user's friends list, excluding the friend that was removed
                updateUser({
                    friendsList: user.friendsList.filter((friend) => friend.pk !== targetFriendId),
                    // If the removed friend was part of the user's party, remove them from the party
                    currentParty: {
                        ...user.currentParty,
                        members: user.currentParty.members.filter((member) => member.pk !== targetFriendId)
                    }
                });
                toast.success("Friend removed!");
                return true;
            }
        }).catch((err) => {
            console.log("Error removing friend: ", err.response?.data?.message || err.message);
            toast.error("Error removing friend. Please try again later.");
            return false;
        });
    };

    return (
        // The value prop is what will be available to any component that consumes this context
        <UserContext.Provider value={{ user, updateUser, getFriends, addFriend, removeFriend, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
