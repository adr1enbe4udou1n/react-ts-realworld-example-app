import AuthorLayout from "@/components/AuthorLayout";
import PostsList from "@/components/PostsList";
import { createFileRoute } from "@tanstack/react-router";

const ProfileShow = () => {
  const { username } = Route.useParams();

  if (!username) {
    return null;
  }

  return (
    <AuthorLayout author={username}>
      <PostsList author={username} />
    </AuthorLayout>
  );
};

export const Route = createFileRoute("/profiles/$username")({
  component: ProfileShow,
});

export default ProfileShow;
