import { Article, getArticles, getArticlesFeed } from "@/api";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostsList = ({
  useFeed = false,
  tag = null,
  author = null,
  favorited = null,
}: {
  useFeed?: boolean;
  tag?: string | null;
  author?: string | null;
  favorited?: string | null;
}) => {
  const limit = 10;
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData({ currentPage: 1, currentPageSize: 10 });
  }, []);

  const fetchData = async ({
    currentPage,
    currentPageSize,
  }: {
    currentPage: number;
    currentPageSize: number;
  }) => {
    const { data } = useFeed
      ? await getArticlesFeed({
          limit,
          offset: Math.floor(currentPageSize * (currentPage - 1)),
        })
      : await getArticles({
          limit,
          offset: Math.floor(currentPageSize * (currentPage - 1)),
          tag: tag || undefined,
          author: author || undefined,
          favorited: favorited || undefined,
        });

    setArticles(data.articles);
    setTotal(data.articlesCount);
    setPage(currentPage);
  };

  return (
    <>
      {articles.map((article, i) => (
        <PostCard key={i} article={article} tag={tag} />
      ))}
    </>
  );
};

export default PostsList;
