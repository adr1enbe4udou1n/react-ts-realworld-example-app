import { handleValidation, register, User } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import RequireNoAuth from "@/components/guards/RequireNoAuth";
import { UserContext } from "@/contexts/user";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });

  const onSuccess = ({ user }: { user: User }) => {
    userStore?.loadUser(user);
    navigate("/");
  };

  return (
    <RequireNoAuth>
      <div className="container flex flex-col mb-8">
        <div className="lg:w-2xl sm:mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl mb-2 dark:text-white">
              Sign up
            </h1>
            <Link to="/login" className="text-green hover:underline">
              Have an account ?
            </Link>
          </div>
          <FormValidation
            className="flex flex-col gap-4"
            action={() => handleValidation(register, { user: form }, onSuccess)}
          >
            <div>
              <input
                className="form-control"
                type="text"
                placeholder="Your Name"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <BaseButton>Sign up</BaseButton>
            </div>
          </FormValidation>
        </div>
      </div>
    </RequireNoAuth>
  );
};

export default Register;
