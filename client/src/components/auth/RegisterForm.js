import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
function RegisterForm() {
    // context
    const { registerUser } = useContext(AuthContext);

    //alert
    const [alert, setAlert] = useState(null);

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const { username, password, confirmPassword } = registerForm;
    const onChangeRegisterForm = (e) =>
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });

    const register = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Passwords do not match" });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: "danger", message: registerData.message });
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
            <Form className="my-4" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        value={username}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        value={password}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Confirm-Password"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button
                    variant="success"
                    type="submit"
                    className="success mt-2"
                >
                    Register
                </Button>
            </Form>
            <div className="d-flex align-items-center">
                <p className="mb-0 mx-2">Already have an account?</p>
                <Link to="/login" className="d-block">
                    <Button variant="info" size="sm">
                        Login
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default RegisterForm;
