import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/images/Logo.png';


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
            {/* TODO: This'll be where the user's avatar appears */}
            <img src={Logo} alt="User Avatar" className="Avatar imageShadow" />
            <div className="flexDirectionColumn justifyContentCenter">
                <div className="alignSelfCenter"><strong>UserName: {user.userName}</strong></div>
                <div className="alignSelfCenter">Current Game / Status: {user.currentGameStatus || "Unset"}</div>
                <div className="alignSelfCenter"><button onClick={() => logout()}>Log Out</button></div>
            </div>
            <hr />
            <div className="flexDirectionColumn justifyContentSpaceBetween">
                <button onClick={() => navigate("/profile")}>Home</button>
                <button onClick={() => navigate("/find-games")}>Find Game</button>
                <button onClick={() => navigate("/find-players")}>Find Players</button>
            </div>
        </nav>
    );
};
