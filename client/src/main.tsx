import ReactDOM from "react-dom/client";
import { App } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </>
);
