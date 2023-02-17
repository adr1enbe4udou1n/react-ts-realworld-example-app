import { Article } from "@/api";
import classNames from "classnames";
import FavoriteArticle from "./FavoriteArticle";
import FollowProfile from "./FollowProfile";
import ProfileCard from "./ProfileCard";

const PostAuthor = ({
  article,
  className,
  onFollow,
  onFavorite,
}: {
  article: Article;
  className?: string;
  onFollow: () => void;
  onFavorite: () => void;
}) => {
  return (
    <div className={classNames(className, "flex items-center")}>
      <ProfileCard
        author={article.author}
        date={article.createdAt}
        className="mr-4"
      />
      <div className="mr-2">
        <FollowProfile profile={article.author} onFollow={onFollow} />
      </div>
      <div>
        <FavoriteArticle
          article={article}
          full={true}
          onFavorite={onFavorite}
        />
      </div>
    </div>
  );
};

export default PostAuthor;
