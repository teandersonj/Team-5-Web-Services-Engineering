import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/images/Logo.png';
import { UserContext } from '../providers/UserProvider';

export default function Navbar(props) {
    const user = useContext(UserContext);
    {/* TODO: Right now this is a top bar just for example. Persists across navigation.
        It will become the intended sidebar, but should it show differently depending
        if user is logged in (i.e. not at all)? */}
    return (
        user && user.loggedIn ? <UserNav user={user} /> : <GuestNav user={user} />
    );

}

const GuestNav = ({ user }) => {
    return (
        <nav className="GuestNav">
            <img src={Logo} alt="Fireside Gaming Logo" height={75} width={75} />
            Fireside Gaming
            {/* These can be potentially converted to NavLinks for some more QoL features */}
            <button><Link className="Link" to="/login">Login</Link></button>
            <button><Link className="Link" to="/register">Register</Link></button>
        </nav>
    );
};

const UserNav = ({ user }) => {
    return (
        <nav className="UserNav">
            <img src={Logo} alt="Fireside Gaming Logo" height={75} width={75} />
            <div><strong>UserName: {user.userName}</strong></div>
            <div>Current Game / Status: {user.currentGameStatus || "Unset"}</div>
            <div><button onClick={() => user.logout}>Log Out</button></div>
            <hr />
            <button><Link className="Link roundedBlue" to="/home">Home</Link></button>
            <button><Link className="Link roundedGray" to="/find-game">Find Game</Link></button>
            <button><Link className="Link roundedGray" to="/find-players">Find Players</Link></button>
        </nav>
    );
};
