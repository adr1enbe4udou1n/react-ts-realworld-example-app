import HomeLayout from "@/components/HomeLayout";
import TagList from "@/components/TagList";
import { useState } from "react";

const Home = () => {
  const [currentTag, setCurrentTag] = useState<string | null>(null);

  return (
    <HomeLayout tag={currentTag}>
      <div className="w-70">
        <div className="bg-gray-100 dark:bg-gray-800 font-sans p-2">
          <h3 className="mb-2 dark:text-white">Popular Tags</h3>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
