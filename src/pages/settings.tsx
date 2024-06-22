import { HandleValidation, updateUser } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import RequireAuth from "@/components/guards/RequireAuth";
import SuccessMessage from "@/components/SuccessMessage";
import { UserContext } from "@/contexts/user";
import { useContext, useEffect, useState } from "react";

const Settings = () => {
  const userStore = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<{
    email: string;
    username: string;
    bio: string;
    image: string;
  }>({
    email: "",
    username: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (userStore?.user) {
      setForm({
        email: userStore.user.email,
        username: userStore.user.username,
        bio: userStore.user.bio ?? "",
        image: userStore.user.image ?? "",
      });
    }
  }, [userStore?.user]);

  const submit = async (handleValidation: HandleValidation) => {
    const user = await updateUser(form, handleValidation);

    if (user) {
      userStore?.loadUser(user);
      setSuccess(true);
    }
  };

  return (
    <RequireAuth>
      <div className="container flex flex-col mb-8">
        <div className="lg:w-2xl sm:mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl dark:text-white">
              Your settings
            </h1>
          </div>
          <FormValidation className="flex flex-col gap-4" action={submit}>
            <>
              {success && (
                <SuccessMessage>
                  Your settings have been updated successfully
                </SuccessMessage>
              )}
            </>
            <div>
              <input
                className="form-control"
                type="text"
                placeholder="URL of profile picture"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>
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
              <textarea
                placeholder="Short bio about you"
                className="form-control"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
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

            <div className="flex justify-end">
              <BaseButton>Update Settings</BaseButton>
            </div>
          </FormValidation>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Settings;
