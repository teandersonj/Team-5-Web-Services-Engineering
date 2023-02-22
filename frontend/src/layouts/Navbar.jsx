import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/images/Logo.png';

export default function Navbar(props) {
    const { userContext } = props;
    const { user, logout } = userContext;

    // Determine which nav to display based on whether the user is logged in
    // Either as a top-bar or side-bar
    return (
        user && user.loggedIn ? <UserNav user={user} logout={logout} /> : <GuestNav user={user} />
    );

}

const GuestNav = ({ user }) => {
    const navigate = useNavigate();
    return (
        <nav className="GuestNav">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                <img style={{ display: "block" }} src={Logo} alt="Fireside Gaming Logo" height={75} width={75} />
                &bull;
                <div>Fireside Gaming</div>
            </div>
            {/* These can be potentially converted to NavLinks for some more QoL features */}
            <div>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
            </div>
        </nav>
    );
};

const UserNav = (props) => {
    const navigate = useNavigate();
    const { user, logout } = props;
    return (
        <nav className="UserNav">
            <img src={Logo} alt="Fireside Gaming Logo" height={75} width={75} />
            <div><strong>UserName: {user.userName}</strong></div>
            <div>Current Game / Status: {user.currentGameStatus || "Unset"}</div>
            <div><button onClick={logout}>Log Out</button></div>
            <hr />
            <button onClick={() => navigate("/profile") }>Home</button>
            <button onClick={() => navigate("/find-games") }>Find Game</button>
            <button onClick={() => navigate("/find-players") }>Find Players</button>
        </nav>
    );
};
