import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { UserContext } from '../../providers/UserProvider';

import Logo from '../../components/images/Logo.png';
import LabeledInput from '../../components/LabeledInput';

export default function Login(props) {
    const navigate = useNavigate();
    const { user, login: userLogin } = useContext(UserContext);

    // On page refresh or initial load, check if the user's already logged in
    useEffect(() => {
        if (user.loggedIn) {
            navigate("/profile");
        }
    }, []);


    const [formState, setFormState] = useState({
        // TODO: We'll need to determine whether they entered an email or username.
        usernameEmail: "",
        password: "",
        errors: {}
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormState((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Logging in example");
        // Pass the login info to server for validation and retrieve the rest of their details
        // If successful, update the user state and navigate to the profile page
        const newUser = {
            username: "test",
            email: "test@test.com",
            fName: "Test",
            lName: "User",
            playstyle: "Casual"
        };
        userLogin(newUser);
        toast.success(`Welcome, ${newUser.username}!`);
        return navigate("/profile");
    };

    return (
        <>
            <h1 className="pageHeading"><span style={{ color: "var(--color-gold)" }}>Fireside</span> Gaming</h1>
            <img className="Logo imageShadow" src={Logo} alt="Fireside Gaming Logo" />
            <h2 className="pageHeading">Login</h2>
            <form id="loginForm" aria-labelledby="Login Form" action="#" method="post" onSubmit={handleSubmit}>
                <LabeledInput id="usernameEmail" label="Username / Email" placeholder="Enter email or username here" type="text" onChange={handleInputChange} orientation="vertical" containerClassName="formRow"/>
                <LabeledInput id="password" label="Password" placeholder="Enter password here" type="password" onChange={handleInputChange} orientation="vertical" containerClassName="formRow"/>
                <div className="formRow">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                </div>
                <p>Forgot your password? Click <Link className="Link" to="/forgot-password">here</Link> to reset your password.</p>
                <p>Don't have an account? <Link className="Link" to="/register">Register Now</Link></p>
                <div className="formRow centerContent">
                    <input type="submit" className="roundedBlue" value="Login" />
                </div>
                <div className="flexButtonsEitherSide">
                    <button disabled>Login with Discord</button>
                    <button disabled>Login with Steam</button>
                </div>
            </form>

            {/* TODO: This is for debugging only */}
            <div style={{ maxWidth: "300px", wordWrap: 'break-word' }}>
                <h3>Form State: </h3>
                <code>
                    {JSON.stringify(formState)}
                </code>
            </div>
            <div style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                <h3>User State: </h3>
                <code>
                    {JSON.stringify(user)}
                </code>
            </div>
        </>
    )
};
