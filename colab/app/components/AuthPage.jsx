import { useState } from "react";
import NewUserForm from "./NewUser";
import LogInPage from "./LogInPage";

const AuthPage = ({ setSessionToken }) => {
    const [newUser, setNewUser] = useState(false);

    return newUser ? <NewUserForm setSessionToken={setSessionToken} setNewUser={setNewUser} /> : <LogInPage setNewUser={setNewUser} setSessionToken={setSessionToken} />
}

export default AuthPage;