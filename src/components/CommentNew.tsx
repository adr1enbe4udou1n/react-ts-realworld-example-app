import { HandleValidation, Article, createComment } from "@/api";
import { UserContext } from "@/contexts/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import BaseButton from "./BaseButton";
import FormValidation from "./FormValidation";

const CommentNew = ({ article }: { article: Article }) => {
  const queryClient = useQueryClient();
  const userStore = useContext(UserContext);
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: (handleValidation: HandleValidation) =>
      createComment(
        article.slug,
        {
          body,
        },
        handleValidation,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", article.slug] });
      setBody("");
    },
  });

  if (!userStore?.user) {
    return null;
  }

  return (
    <FormValidation
      className="block rounded border border-gray-300"
      action={mutation.mutateAsync}
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
