import { handleValidation, login, User } from "@/api";
import FormValidation from "@/components/FormValidation";
import { UserContext } from "@/contexts/user";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const onSuccess = ({ user }: { user: User }) => {
    userStore?.setUser(user);
    navigate("/");
  };

  return (
    <div className="container flex flex-col mb-8">
      <div className="lg:w-2xl sm:mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl mb-2 dark:text-white">
            Sign in
          </h1>
          <Link to="/register" className="text-green hover:underline">
            No account yet ?
          </Link>
        </div>
        <FormValidation
          className="flex flex-col gap-4"
          action={() => handleValidation(login, { user: form }, onSuccess)}
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </FormValidation>
      </div>
    </div>
  );
};

export default Login;
