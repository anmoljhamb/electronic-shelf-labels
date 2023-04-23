import { Button } from "react-bootstrap";
import { Dashboard, SignUp, UpdateProfile } from ".";
import { Navigate, Route, Routes } from "react-router-dom";
import LogIn from "./Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AuthContextInterface } from "../types";

function App() {
    const authContext = useContext(AuthContext);
    const { currentUser } = authContext as AuthContextInterface;

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        currentUser ? <Dashboard /> : <Navigate to={"/login"} />
                    }
                />
                <Route
                    path="/update-profile"
                    element={
                        currentUser ? (
                            <UpdateProfile />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </>
    );
}

export default App;
