import { Link } from 'react-router-dom';

export default function Nav(props) {
    {/* TODO: Right now this is a top bar just for example. Persists across navigation.
        It will become the intended sidebar, but should it show differently depending
        if user is logged in (i.e. not at all)? */}
    return (
        <nav>
            <h1>Fireside Gaming Example Navbar</h1>
            <em>Profile Picture and User controls will appear when authenticated</em>
            <br />
            {/* These can be potentially converted to NavLinks for some more QoL features */}
            <button><Link className="Link" to="/login">Login</Link></button>
            <button><Link className="Link" to="/register">Register</Link></button>
        </nav>
    );
}
