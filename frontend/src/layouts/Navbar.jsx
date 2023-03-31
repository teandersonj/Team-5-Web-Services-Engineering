import { NavLink } from 'react-router-dom';
import Avatar from '../components/Avatar';

// TODO Extract inline styles, update font and styling

/**
 * Navbar component that will be displayed on the left side of the screen when user is logged in
 * @param {*} props 
 * @param {Object} props.userContext - UserContext object, passed from App / Layout
 * @returns <Navbar /> Component
 */
export default function Navbar(props) {
    const { user, logout } = props.userContext;

    return (
        <nav className="UserNav">
            <Avatar avatar={user.avatar} size="medium" />
            <div className="flexDirectionColumn justifyContentCenter">
                <div className="alignSelfCenter"><strong style={{ fontSize: "20px", margin: "10px 0" }}>{user.username}</strong></div>
                <div className="alignSelfCenter centerText" style={{ backgroundColor: "var(--color-light-blue", padding: "5px 40px", borderRadius: "10px", boxShadow: "2px 5px 2px var(--color-black)" }}>{user.currentStatus}</div>
                <div className="alignSelfCenter" style={{ margin: "10px 0" }}><button className="roundedBlue" onClick={() => logout()}>Log Out</button></div>
            </div>
            <hr className="width-100" />
            <div className="navLinks flexDirectionColumn justifyContentSpaceEvenly flexGrow-1">
                <NavLink to={"/profile"}>My Profile</NavLink>
                <NavLink to={"/friends"}>Friends</NavLink>
                <NavLink to={"/find-games"}>Find Games</NavLink>
                <NavLink to={"/find-players"}>Find Players</NavLink>
                <NavLink to={"/account-settings"}>Settings</NavLink>
            </div>
        </nav>
    );
};
