import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { AuthContextInterface } from "../types";

interface PropsInterface {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: PropsInterface) => {
    const [currentUser, setCurrentUser] = useState<
        UserCredential | User | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signUp,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
