import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    User,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
} from "firebase/auth";
import { AuthContextInterface } from "../types";

interface PropsInterface {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: PropsInterface) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
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

    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
    };

    const updateUserEmail = (email: string) => {
        return updateEmail(currentUser as User, email);
    };

    const updateUserPassword = (password: string) => {
        return updatePassword(currentUser as User, password);
    };

    const forgotPassword = (email: string) => {
        return sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signUp,
                logIn,
                logOut,
                updateUserEmail,
                updateUserPassword,
                forgotPassword,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
