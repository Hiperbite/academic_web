import { ForgotPassword } from "./ForgotPassword";
import { PasswordReset } from "./PasswordReset";
import { SignIn } from "./SignIn";
import { SignOn } from "./SignOn";

export const authRoutes = [
    { path: "", component: SignIn },
    { path: "signin", component: SignIn },
    { path: "signon", component: SignOn },
    { path: "forgot-password", component: ForgotPassword },
    { path: "password-reset/:code/:kid", component: PasswordReset },
  ];
