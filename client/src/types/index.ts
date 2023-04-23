import { Auth, User, UserCredential } from "firebase/auth";

export interface AuthContext {
    currentUser: UserCredential | null | User;
    signUp(email: string, password: string): Promise<UserCredential>;
}
