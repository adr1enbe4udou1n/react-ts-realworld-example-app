import ArticlesNav from "@/components/ArticlesNav";

const Home = () => {
  const menuItems = [
    {
      name: "Your Feed",
      link: "/feed",
    },
    {
      name: "Global Feed",
      link: "/",
    },
  ];

  return (
    <>
      <div className="bg-green text-white text-center py-8 mb-8">
        <h1 className="font-brand font-bold text-5xl mb-4">conduit</h1>
        <p className="font-sans">A place to share your knowledge.</p>
      </div>
      <div className="container flex flex-col md:flex-row mb-8 gap-8">
        <div className="md:flex-1">
          <ArticlesNav items={menuItems} />
        </div>
      </div>
    </>
  );
};

export default Home;
