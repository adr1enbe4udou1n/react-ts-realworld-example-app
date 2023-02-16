import { Article, favoriteArticle, unfavoriteArticle } from "@/api";
import { UserContext } from "@/contexts/user";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "./BaseButton";

const FavoriteArticle = ({
  article,
  full = false,
  onFavorite,
}: {
  article: Article;
  full?: boolean;
  onFavorite?: (favorite: boolean) => void;
}) => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const [counter, setCounter] = useState(article.favoritesCount);

  const icon = article.favorited
    ? "i-carbon-favorite-filled"
    : "i-carbon-favorite";
  const label = article.favorited ? "Unfavorite" : "Favorite";

  useEffect(() => {
    if (article.favorited) {
      setCounter(counter - 1);
      return;
    }
    setCounter(counter + 1);
  }, [article.favorited]);

  const toggleFavorite = async () => {
    if (!userStore?.isLoggedIn) {
      navigate("/login");
    }

    if (article.favorited) {
      await unfavoriteArticle({ slug: article.slug });
      if (onFavorite) {
        onFavorite(false);
      }

      return;
    }

    await favoriteArticle({ slug: article.slug });
    if (onFavorite) {
      onFavorite(true);
    }
  };

  return full ? (
    <BaseButton
      type="button"
      size="sm"
      variant="secondary"
      onClick={toggleFavorite}
    >
      <i className={icon}></i>
      {`${label} Post (${counter})`}
    </BaseButton>
  ) : (
    <button
      type="button"
      className="border border-green flex items-center text-green rounded-1 px-2 text-sm"
      onClick={toggleFavorite}
    >
      <i className={`text-xs mr-1 ${icon}`}></i>
      {counter}
    </button>
  );
};

export default FavoriteArticle;
