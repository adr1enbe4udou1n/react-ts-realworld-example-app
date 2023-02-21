import RequireAuth from "@/components/guards/RequireAuth";
import HomeLayout from "@/components/HomeLayout";

const Feed = () => {
  return (
    <RequireAuth>
      <HomeLayout useFeed={true} />
    </RequireAuth>
  );
};

export default Feed;
