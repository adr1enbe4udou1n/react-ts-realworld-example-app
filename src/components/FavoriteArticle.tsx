import { Article, favoriteArticleToggle } from "@/api";
import { UserContext } from "@/contexts/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "./BaseButton";

const FavoriteArticle = ({
  article,
  full = false,
}: {
  article: Article;
  full?: boolean;
}) => {
  const queryClient = useQueryClient();
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: favoriteArticleToggle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const icon = article.favorited
    ? "i-carbon-favorite-filled"
    : "i-carbon-favorite";
  const label = article.favorited ? "Unfavorite" : "Favorite";

  const toggleFavorite = () => {
    if (!userStore?.isLoggedIn) {
      navigate("/login");
    }

    mutation.mutate(article);
  };

  return full ? (
    <BaseButton
      type="button"
      size="sm"
      variant="secondary"
      onClick={toggleFavorite}
    >
      <i className={icon}></i>
      {`${label} Post (${article.favoritesCount})`}
    </BaseButton>
  ) : (
    <button
      type="button"
      className="border border-green flex items-center text-green rounded-1 px-2 text-sm"
      onClick={toggleFavorite}
    >
      <i className={`text-xs mr-1 ${icon}`}></i>
      {article.favoritesCount}
    </button>
  );
};

export default FavoriteArticle;
