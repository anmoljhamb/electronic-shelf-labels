import { User, UserCredential } from "firebase/auth";

export interface AuthContextInterface {
    currentUser: null | User;
    signUp(email: string, password: string): Promise<UserCredential>;
    logIn(email: string, password: string): Promise<UserCredential>;
    logOut(): Promise<void>;
    updateUserEmail(email: string): Promise<void>;
    updateUserPassword(password: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
}
