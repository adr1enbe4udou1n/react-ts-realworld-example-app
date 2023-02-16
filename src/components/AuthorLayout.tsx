import { getProfile, Profile } from "@/api";
import { useEffect, useState } from "react";
import ArticlesNav from "./ArticlesNav";
import FollowProfile from "./FollowProfile";

const AuthorLayout = ({
  author,
  children,
}: {
  author: string;
  children: React.ReactNode;
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile({ username: author }).then(({ data }) => {
      setProfile(data.profile);
    });
  }, [author]);

  if (!profile) {
    return null;
  }

  const menuItems = [
    {
      name: "My Posts",
      link: `/profiles/${profile.username}`,
    },
    {
      name: "Favorited Posts",
      link: `/profiles/${profile.username}/favorites`,
    },
  ];

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 text-center py-8 mb-8">
        <div className="container">
          {profile.image && (
            <img
              src={profile.image}
              alt={profile.username}
              className="rounded-full mx-auto w-30 h-30 mb-4"
            />
          )}
          <h1 className="font-brand font-bold text-2xl mb-4 text-gray-300">
            {profile.username}
          </h1>
          <p className="mx-auto max-w-140 text-gray-300 mb-4">{profile.bio}</p>
          <FollowProfile
            profile={profile}
            onFollow={(following) => setProfile({ ...profile, following })}
          />
        </div>
      </div>
      <div className="container py-8">
        <ArticlesNav items={menuItems} />
        {children}
      </div>
    </>
  );
};

export default AuthorLayout;
