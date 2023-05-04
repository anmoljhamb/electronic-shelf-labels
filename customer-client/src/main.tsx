import ReactDOM from "react-dom/client";
import { App } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

/**
 * todo create a landing page. redirect to landing page.
 * todo while sign up, ask for the user's card id.
 * todo, after signing up, maintain a socket connection with the backend, and just maintain a general cart connection.
 */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </>
);
