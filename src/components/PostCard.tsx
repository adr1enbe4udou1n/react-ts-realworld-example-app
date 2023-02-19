import { Article } from "@/api";
import classNames from "classnames";
import { Link } from "react-router-dom";
import FavoriteArticle from "./FavoriteArticle";
import ProfileCard from "./ProfileCard";

const PostCard = ({
  article,
  tag,
}: {
  article: Article;
  tag: string | null;
}) => {
  return (
    <div className="border-t border-gray-200 py-4">
      <div>
        <header className="flex mb-2">
          <ProfileCard author={article.author} date={article.createdAt} />
          <div className="ml-auto">
            <FavoriteArticle article={article} />
          </div>
        </header>
        <div className="flex flex-col gap-2 relative">
          <h3 className="font-heading font-bold text-xl dark:text-white">
            {article.title}
          </h3>
          <p className="text-sm text-gray-300">{article.description}</p>
          <footer className="flex items-center">
            <span className="text-xs text-gray-300">Read more...</span>
            <div className="ml-auto">
              {article.tagList.map((t, i) => (
                <span
                  key={i}
                  className={classNames(
                    "border border-gray-300 text-gray-300 rounded-full px-2 ml-1 text-xs",
                    {
                      "border-green text-green": t === tag,
                    }
                  )}
                >
                  {t}
                </span>
              ))}
            </div>
          </footer>
          <Link
            to={`/articles/${article.slug}`}
            className="absolute inset-0"
          ></Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
