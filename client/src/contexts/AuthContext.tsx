import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContext } from "../types";

interface PropsInterface {
    children: React.ReactNode;
}

const AuthConext = createContext<AuthContext | null>(null);

export const useAuth = () => {
    return useContext(AuthConext);
};

export const AuthProvider = ({ children }: PropsInterface) => {
    const [currentUser, setCurrentUser] = useState<
        UserCredential | User | null
    >(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <AuthConext.Provider
            value={{
                currentUser,
                signUp,
            }}
        >
            {children}
        </AuthConext.Provider>
    );
};
