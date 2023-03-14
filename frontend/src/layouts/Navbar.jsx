import { Link, useNavigate } from 'react-router-dom';

/**
 * Navbar component that will be displayed on the left side of the screen when user is logged in
 * @param {*} props 
 * @param {Object} props.userContext - UserContext object, passed from App / Layout
 * @returns <Navbar /> Component
 */
export default function Navbar(props) {
    const { user, logout } = props.userContext;
    const navigate = useNavigate();

    return (
        <nav className="UserNav">
            <img src={"/img/avatars/" + user.avatar + ".jpg"} alt="User Avatar" className="avatar imageShadow" />
            <div className="flexDirectionColumn justifyContentCenter">
                <div className="alignSelfCenter"><strong>Username: {user.username}</strong></div>
                <div className="alignSelfCenter">Current Game / Status: {user.currentGameStatus || "Unset"}</div>
                <div className="alignSelfCenter"><button onClick={() => logout()}>Log Out</button></div>
            </div>
            <hr className="width-100" />
            <div className="flexDirectionColumn justifyContentSpaceBetween">
                <button>My Friends /<br />Party</button>
                <button onClick={() => navigate("/profile")}>My Profile</button>
                <button onClick={() => navigate("/find-games")}>Find Games</button>
                <button onClick={() => navigate("/find-players")}>Find Players</button>
                <button onClick={() => navigate("/account-settings")}>User /<br />Account Settings</button>
            </div>
        </nav>
    );
};
