import { followProfileToggle, getProfile } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ArticlesNav from "./ArticlesNav";
import FollowProfile from "./FollowProfile";

const AuthorLayout = ({
  author,
  children,
}: {
  author: string;
  children: React.ReactNode;
}) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryFn: () =>
      getProfile({ username: author }).then(({ data }) => data.profile),
    queryKey: ["profile", author],
  });

  const mutation = useMutation({
    mutationFn: followProfileToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", author] });
    },
  });

  if (!data) {
    return null;
  }

  const menuItems = [
    {
      name: "My Posts",
      link: `/profiles/${data.username}`,
    },
    {
      name: "Favorited Posts",
      link: `/profiles/${data.username}/favorites`,
    },
  ];

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-800 text-center py-8 mb-8">
        <div className="container">
          {data.image && (
            <img
              src={data.image}
              alt={data.username}
              className="rounded-full mx-auto w-30 h-30 mb-4"
            />
          )}
          <h1 className="font-brand font-bold text-2xl mb-4 text-gray-300">
            {data.username}
          </h1>
          <p className="mx-auto max-w-140 text-gray-300 mb-4">{data.bio}</p>
          <FollowProfile
            profile={data}
            onFollow={() => mutation.mutate(data)}
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
