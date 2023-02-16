import AuthorLayout from "@/components/AuthorLayout";
import PostsList from "@/components/PostsList";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams<string>();

  if (!username) {
    return null;
  }

  return (
    <AuthorLayout author={username}>
      <PostsList author={username} />
    </AuthorLayout>
  );
};

export default Profile;
