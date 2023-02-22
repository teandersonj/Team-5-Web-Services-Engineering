import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/images/Logo.png';


/**
 * Navbar component that will be displayed on the left side of the screen when user is logged in
 * @param {*} props 
 * @returns <Navbar /> Component
 */
export default function Navbar(props) {
    const { user, logout } = props.userContext;
    const navigate = useNavigate();

    return (
        <nav className="UserNav">
            <img src={Logo} alt="Fireside Gaming Logo" height={75} width={75} />
            <div><strong>UserName: {user.userName}</strong></div>
            <div>Current Game / Status: {user.currentGameStatus || "Unset"}</div>
            <div><button onClick={logout}>Log Out</button></div>
            <hr />
            <button onClick={() => navigate("/profile")}>Home</button>
            <button onClick={() => navigate("/find-games")}>Find Game</button>
            <button onClick={() => navigate("/find-players")}>Find Players</button>
        </nav>
    );
};
