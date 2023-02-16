import AuthorLayout from "@/components/AuthorLayout";
import PostsList from "@/components/PostsList";
import { useParams } from "react-router-dom";

const ProfileFavorites = () => {
  const { username } = useParams<string>();

  if (!username) {
    return null;
  }

  return (
    <AuthorLayout author={username}>
      <PostsList favorited={username} />
    </AuthorLayout>
  );
};

export default ProfileFavorites;
