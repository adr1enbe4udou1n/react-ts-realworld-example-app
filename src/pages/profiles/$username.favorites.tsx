import AuthorLayout from "@/components/AuthorLayout";
import PostsList from "@/components/PostsList";
import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "react-router-dom";

const ProfileFavorites = () => {
  const { username } = useParams<{ username: string }>();

  if (!username) {
    return null;
  }

  return (
    <AuthorLayout author={username}>
      <PostsList favorited={username} />
    </AuthorLayout>
  );
};

export const Route = createFileRoute("/profiles/$username/favorites")({
  component: ProfileFavorites,
});

export default ProfileFavorites;
