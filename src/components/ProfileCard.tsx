import { format } from "date-fns";
import { Profile } from "@/api";
import { Link } from "react-router-dom";
import classNames from "classnames";

const ProfileCard = ({
  author,
  date,
  inline = false,
  className,
}: {
  author: Profile;
  date: string;
  inline?: boolean;
  className?: string | undefined;
}) => {
  const getDate = (date: string) => {
    const month = new Date(date).toLocaleString("en", { month: "long" });
    return `${month} ${format(new Date(date), "dd, yyyy")}`;
  };

  return (
    <Link
      to={`/profiles/${author.username}`}
      className={classNames(className, "flex items-center gap-3")}
    >
      {inline ? (
        <>
          {author.image && (
            <img
              className="rounded-full w-5 h-5"
              src={author.image}
              alt={author.username}
              title={author.following ? "Following" : "Unfollowed"}
            />
          )}
          <h2 className="text-green text-xs">{author.username}</h2>
          <time className="text-xs text-gray-400">{getDate(date)}</time>
        </>
      ) : (
        <>
          {author.image && (
            <img
              className="rounded-full w-10 h-10"
              src={author.image}
              alt={author.username}
              title={author.following ? "Following" : "Unfollowed"}
            />
          )}
          <div>
            <h2 className="text-green -mb-1">{author.username}</h2>
            <time className="text-xs text-gray-400">{getDate(date)}</time>
          </div>
        </>
      )}
    </Link>
  );
};

export default ProfileCard;
