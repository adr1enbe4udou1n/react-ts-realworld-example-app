import { Article, Comment, createComment, handleValidation } from "@/api";
import { UserContext } from "@/contexts/user";
import { useContext, useState } from "react";
import BaseButton from "./BaseButton";
import FormValidation from "./FormValidation";

const CommentNew = ({
  article,
  onCommentCreated,
}: {
  article: Article;
  onCommentCreated: (c: Comment) => void;
}) => {
  const userStore = useContext(UserContext);
  const [body, setBody] = useState("");

  if (!userStore?.user) {
    return null;
  }

  return (
    <FormValidation
      className="block rounded border border-gray-300"
      action={() =>
        handleValidation(
          createComment,
          {
            slug: article.slug,
            comment: {
              body,
            },
          },
          (data) => onCommentCreated(data.comment)
        )
      }
    >
      <textarea
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="dark:bg-gray-800 w-full min-h-40 rounded-t p-4 block focus:outline-none"
        placeholder="Leave your comment here (in markdown)"
      />
      <footer className="bg-gray-100 dark:bg-gray-300 flex p-4 rounded-b border-t border-gray-300 items-center">
        {userStore?.user.image && (
          <img
            className="rounded-full w-10 h-10"
            src={userStore.user.image}
            alt={userStore.user.username}
          />
        )}
        <BaseButton className="ml-auto" size="sm">
          Post Comment
        </BaseButton>
      </footer>
    </FormValidation>
  );
};

export default CommentNew;
