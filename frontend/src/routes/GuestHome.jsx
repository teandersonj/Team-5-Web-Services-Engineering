import { Link } from 'react-router-dom';

export default function GuestHome() {
    const styles = {
        width: "97%",
        height: "97%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
    }

    return (
        <>
            {/* For debugging */}
            <div style={styles}>
                <h1>Welcome to Fireside Gameing</h1>
                <h2 className="centerText">Guest Home</h2>
                <p className="centerText">We've set out to make matchmaking different. Find and connect with like-minded people across a variety of games,<br />people who share your playstyle and attitude, so you can be as competitive as you want while avoiding negativity.......</p>
                <div><Link className="Link" to="/login">Login</Link> or <Link className="Link" to="/register">Register</Link> to get started!
                </div>
            </div>
        </>
    );
}
