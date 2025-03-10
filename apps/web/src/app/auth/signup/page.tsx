import SignupForm from "@/components/SignupForm";
import { signup } from "../login/actions";

export default async function Signup() {
 
  return <SignupForm Signup={signup} />;
}
