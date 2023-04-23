import { User, UserCredential } from "firebase/auth";

export interface AuthContextInterface {
    currentUser: UserCredential | null | User;
    signUp(email: string, password: string): Promise<UserCredential>;
    logIn(email: string, password: string): Promise<UserCredential>;
}
