import AuthorLayout from "@/components/AuthorLayout";
import PostsList from "@/components/PostsList";
import { createFileRoute } from "@tanstack/react-router";

const ProfileFavorites = () => {
  const { username } = Route.useParams();

  if (!username) {
    return null;
  }

  return (
    <AuthorLayout author={username}>
      <PostsList favorited={username} />
    </AuthorLayout>
  );
};

export const Route = createFileRoute("/profiles/$username_/favorites")({
  component: ProfileFavorites,
});

export default ProfileFavorites;
