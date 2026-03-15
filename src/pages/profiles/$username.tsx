import AuthorLayout from "@/components/AuthorLayout";
import PostsList from "@/components/PostsList";
import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "react-router-dom";

const ProfileShow = () => {
  const { username } = useParams<{ username: string }>();

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
