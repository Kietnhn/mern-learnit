import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from "./components/layout/Landing";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Auth from "./views/Auth";
import Dashboard from "./views/Dashboard";

import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route
                            path="/login"
                            element={<Auth authRoute="login" />}
                        />
                        <Route
                            path="/register"
                            element={<Auth authRoute="register" />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
