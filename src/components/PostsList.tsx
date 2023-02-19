import { favoriteArticleToggle, getArticles, getArticlesFeed } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
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
          tag: tag || undefined,
          author: author || undefined,
          favorited: favorited || undefined,
        });
  };

  const articlesQuery = useQuery({
    queryFn: () => fetchData().then(({ data }) => data),
    queryKey: ["articles", tag, author, favorited, page],
  });

  const mutation = useMutation({
    mutationFn: favoriteArticleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  useEffect(() => {
    setPage(1);
  }, [tag, author, favorited]);

  return (
    <>
      {(articlesQuery.data?.articles || []).map((article, i) => (
        <PostCard
          key={i}
          article={article}
          tag={tag}
          onFavorite={() => mutation.mutate(article)}
        />
      ))}
      <Pagination
        page={page}
        limit={limit}
        total={articlesQuery.data?.articlesCount || 0}
        fetchData={({ currentPage }) => {
          setPage(currentPage);
          articlesQuery.refetch();
        }}
      />
    </>
  );
};

export default PostsList;
