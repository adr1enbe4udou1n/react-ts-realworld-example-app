import RequireAuth from "@/components/guards/RequireAuth";
import HomeLayout from "@/components/HomeLayout";
import { createFileRoute } from "@tanstack/react-router";

const Feed = () => {
  return (
    <RequireAuth>
      <HomeLayout useFeed={true} />
    </RequireAuth>
  );
};

export const Route = createFileRoute("/feed")({
  component: Feed,
});

export default Feed;
