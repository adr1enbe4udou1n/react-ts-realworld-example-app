import AlertMessage from "@/components/AlertMessage";
import { UserContext } from "@/contexts/user";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const userStore = useContext(UserContext);

  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });

  return (
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
        <form
          className="flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await userStore?.register(form);
          }}
        >
          <AlertMessage />
          <div>
            <input
              className="form-control"
              type="text"
              placeholder="Your Name"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>
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
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
