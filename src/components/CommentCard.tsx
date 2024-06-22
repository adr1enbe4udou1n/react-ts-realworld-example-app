import { Comment, deleteComment } from "@/api";
import { UserContext } from "@/contexts/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import MarkdownViewer from "./MarkdownViewer";
import ProfileCard from "./ProfileCard";

const CommentCard = ({ comment, slug }: { comment: Comment; slug: string }) => {
  const queryClient = useQueryClient();
  const userStore = useContext(UserContext);

  const mutation = useMutation({
    mutationFn: () => deleteComment(slug, comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
    },
  });

  const deleteCommentAction = async () => {
    if (confirm("Are you sure?")) {
      mutation.mutate();
    }
  };

  return (
    <div className="rounded border border-gray-300 dark:border-gray-800">
      <div className="px-4">
        <MarkdownViewer source={comment.body} />
      </div>
      <footer className="bg-gray-100 flex p-4 rounded-b border-t border-gray-300 dark:bg-gray-800 dark:border-gray-800">
        <ProfileCard
          author={comment.author}
          date={comment.createdAt}
          inline={true}
          className="mr-4"
        />
        {userStore?.isLoggedIn &&
          comment.author.username === userStore.user?.username && (
            <div className="flex gap-2 ml-auto">
              <button
                title="Delete"
                type="button"
                className="inline-flex dark:text-white"
                onClick={deleteCommentAction}
              >
                <i className="i-carbon-trash-can"></i>
              </button>
            </div>
          )}
      </footer>
    </div>
  );
};

export default CommentCard;
