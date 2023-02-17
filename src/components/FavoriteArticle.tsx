import { Article } from "@/api";
import { UserContext } from "@/contexts/user";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BaseButton from "./BaseButton";

const FavoriteArticle = ({
  article,
  full = false,
  onFavorite,
}: {
  article: Article;
  full?: boolean;
  onFavorite?: () => void;
}) => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const icon = article.favorited
    ? "i-carbon-favorite-filled"
    : "i-carbon-favorite";
  const label = article.favorited ? "Unfavorite" : "Favorite";

  const toggleFavorite = async () => {
    if (!userStore?.isLoggedIn) {
      navigate("/login");
    }

    if (onFavorite) {
      onFavorite();
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
