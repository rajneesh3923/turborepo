import LoginForm from "frontend/components/LoginForm";
import { login } from "./actions";

export default function Login() {
  return <LoginForm login={login} />;
}
