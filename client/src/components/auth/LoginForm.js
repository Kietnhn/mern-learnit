import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
function LoginForm() {
    // context
    const { loginUser } = useContext(AuthContext);

    // history
    const history = useNavigate();

    //alert
    const [alert, setAlert] = useState(null);

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = loginForm;
    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                history("/dashboard");
            } else {
                setAlert({ type: "danger", message: loginData.message });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    className="success mt-2"
                >
                    Login
                </Button>
            </Form>
            <div className="d-flex align-items-center">
                <p className="mb-0 mx-2">Don't have an account?</p>
                <Link to="/register" className="d-block">
                    <Button variant="info" size="sm">
                        Register
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default LoginForm;
