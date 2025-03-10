import LoginForm from "@/components/LoginForm";
import { login } from "./actions";

export default function Login() {
  return <LoginForm login={login} />;
}
