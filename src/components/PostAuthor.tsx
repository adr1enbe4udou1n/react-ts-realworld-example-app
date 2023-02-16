import { Article } from "@/api";
import FavoriteArticle from "./FavoriteArticle";
import FollowProfile from "./FollowProfile";
import ProfileCard from "./ProfileCard";

const PostAuthor = ({
  article,
  onFollow,
  onFavorite,
}: {
  article: Article;
  onFollow: (following: boolean) => void;
  onFavorite: (favorite: boolean) => void;
}) => {
  return (
    <div className="flex items-center">
      <ProfileCard
        author={article.author}
        date={article.createdAt}
        className="mr-4"
      />
      <div className="mr-2">
        <FollowProfile
          profile={article.author}
          onFollow={(following) => onFollow(following)}
        />
      </div>
      <div>
        <FavoriteArticle
          article={article}
          full={true}
          onFavorite={(favorite) => onFavorite(favorite)}
        />
      </div>
    </div>
  );
};

export default PostAuthor;
