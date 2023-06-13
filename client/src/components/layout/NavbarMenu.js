import { Navbar, Nav, Button } from "react-bootstrap";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
function NavbarMenu() {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => logoutUser();

    return (
        <Navbar expand="lg" bg="primary" variant="dark" className="shadow px-3">
            <Navbar.Brand className="font-weight-bolder text-white">
                <img
                    src={learnItLogo}
                    alt="learnItLogo"
                    width="32"
                    height="32"
                    className="mr-2"
                />
                learnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-between"
            >
                <Nav className="mr-auto">
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/dashboard"
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    {/* <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/about"
                        as={Link}
                    >
                        About
                    </Nav.Link> */}
                </Nav>
                <Nav>
                    <Nav.Link className="font-weight-bolder text-white">
                        Welcome {username}
                    </Nav.Link>
                    <Button
                        variant="secondary"
                        className="font-weight-bolder text-white"
                        onClick={logout}
                    >
                        <img
                            src={logoutIcon}
                            alt="LogoutIcon"
                            width="32"
                            height="32"
                            className="mr-2"
                        />
                        Log out
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarMenu;
