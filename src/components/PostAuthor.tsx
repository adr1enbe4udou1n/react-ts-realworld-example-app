import { Article } from "@/api";
import classNames from "classnames";
import FavoriteArticle from "./FavoriteArticle";
import FollowProfile from "./FollowProfile";
import ProfileCard from "./ProfileCard";

const PostAuthor = ({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) => {
  return (
    <div className={classNames(className, "flex items-center")}>
      <ProfileCard
        author={article.author}
        date={article.createdAt}
        className="mr-4"
      />
      <div className="mr-2">
        <FollowProfile profile={article.author} />
      </div>
      <div>
        <FavoriteArticle article={article} full={true} />
      </div>
    </div>
  );
};

export default PostAuthor;
