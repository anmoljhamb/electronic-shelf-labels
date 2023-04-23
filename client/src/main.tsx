import ReactDOM from "react-dom/client";
import { App } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./main.scss";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <>
        <AuthProvider>
            <App />
        </AuthProvider>
    </>
);
