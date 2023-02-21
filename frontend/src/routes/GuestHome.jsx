import { Link } from 'react-router-dom';

export default function GuestHome(props) { 
    return (
        <div>
            <h1 className="centerText">Guest Home</h1>
            <div><Link className="Link" to="/login">Login</Link> or <Link className="Link" to="/register">Register</Link> to get started!
            </div>
        </div>
    );
}
