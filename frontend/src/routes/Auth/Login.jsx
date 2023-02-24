import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { UserContext } from '../../providers/UserProvider';

import Logo from '../../components/images/Logo.png';
import LabeledInput from '../../components/LabeledInput';

export default function Login(props) {
    const navigate = useNavigate();
    const user = useContext(UserContext);

    const [formState, setFormState] = useState({
        // We'll need to determine whether they entered an email or username.
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
        // This'll be retrieved from the DB
        const newUser = {
            userName: "test",
            email: "test@test.com",
            fName: "Test",
            lName: "User",
            playstyle: "Casual"
        };
        user.login(newUser);
        return navigate("/profile");
    };

    return (
        <>
            <h1 className="pageHeading">Fireside Gaming</h1>
            <img className="imageShadow" src={Logo} alt="Fireside Gaming Logo" />
            <h2 className="pageHeading">Login</h2>
            <form id="loginForm" aria-labelledby="Login Form" action="#" method="post" onSubmit={handleSubmit}>
                <LabeledInput id="usernameEmail" label="Username / Email" placeholder="Enter email or username here" type="text" onChange={handleInputChange} />
                <LabeledInput id="password" label="Password" placeholder="Enter password here" type="password" onChange={handleInputChange} />
                <div>
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>
                </div>
                    <p>Forgot your password? Click <Link className="Link" to="/forgot-password">here</Link> to reset your password.</p>
                    <p>Don't have an account? <Link className="Link" to="/register">Register Now</Link></p>
                <div className="centerContent">
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
            <div style={{ maxWidth: "300px", wordWrap: 'break-word' }}>
                <h3>User State: </h3>
                <code>
                    {JSON.stringify(user.user)}
                </code>
            </div>
        </>
    )
};
