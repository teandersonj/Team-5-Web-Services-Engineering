import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

export default function GuestHome(props) { 
    const user = useContext(UserContext);
    return (
        <div>
            {/* For debugging */}
            { user.username || user.fName || "Not Logged In"}
            <h1 className="centerText">Guest Home</h1>
            <div><Link className="Link" to="/login">Login</Link> or <Link className="Link" to="/register">Register</Link> to get started!
            </div>
        </div>
    );
}
