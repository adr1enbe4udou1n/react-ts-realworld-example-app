import { getArticles, getArticlesFeed } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
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
  const [page, setPage] = useState(1);
  const offset = Math.floor(limit * (page - 1));

  const fetchData = () => {
    return useFeed
      ? getArticlesFeed({
          limit,
          offset,
        })
      : getArticles({
          limit,
          offset,
          tag: tag ?? undefined,
          author: author ?? undefined,
          favorited: favorited ?? undefined,
        });
  };

  const articlesQuery = useQuery({
    queryFn: () => fetchData().then(({ data }) => data),
    queryKey: ["articles", tag, author, favorited, page],
  });

  useEffect(() => {
    setPage(1);
  }, [tag, author, favorited]);

  const articles = articlesQuery.data?.articles || [];
  const total = articlesQuery.data?.articlesCount ?? 0;

  return (
    <>
      {articles.map((article) => (
        <PostCard key={article.slug} article={article} tag={tag} />
      ))}
      <Pagination
        page={page}
        limit={limit}
        total={total}
        fetchData={({ currentPage }) => {
          setPage(currentPage);
          articlesQuery.refetch();
        }}
      />
    </>
  );
};

export default PostsList;
