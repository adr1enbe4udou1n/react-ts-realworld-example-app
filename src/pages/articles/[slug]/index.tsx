import { deleteArticle, getArticle, getComments } from "@/api";
import BaseButton from "@/components/BaseButton";
import CommentCard from "@/components/CommentCard";
import CommentNew from "@/components/CommentNew";
import MarkdownViewer from "@/components/MarkdownViewer";
import PostAuthor from "@/components/PostAuthor";
import { UserContext } from "@/contexts/user";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArticleShow = () => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return null;
  }

  const articlesQuery = useQuery({
    queryFn: () => getArticle({ slug }).then(({ data }) => data.article),
    queryKey: ["articles", slug],
  });

  const commentsQuery = useQuery({
    queryFn: () => getComments({ slug }).then(({ data }) => data.comments),
    queryKey: ["comments", slug],
  });

  if (!articlesQuery.data) {
    return null;
  }

  const deleteArticleAction = async () => {
    if (confirm("Are you sure?")) {
      await deleteArticle({ slug });

      navigate("/");
    }
  };

  return (
    <>
      <div className="bg-gray-800 text-white py-8 mb-8">
        <div className="container">
          <h1 className="font-brand font-bold text-5xl mb-8">
            {articlesQuery.data.title}
          </h1>

          <div className="flex items-center">
            <PostAuthor article={articlesQuery.data} />

            {userStore?.isLoggedIn &&
              articlesQuery.data.author.username ===
                userStore.user?.username && (
                <div className="ml-auto flex gap-2">
                  <BaseButton
                    size="sm"
                    variant="secondary"
                    to={`/articles/${slug}/edit`}
                  >
                    <i className="i-carbon-edit"></i>
                    Edit
                  </BaseButton>
                  <BaseButton
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={deleteArticleAction}
                  >
                    <i className="i-carbon-trash-can"></i>
                    Delete
                  </BaseButton>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="container flex flex-col md:flex-row mb-8 gap-8">
        <MarkdownViewer source={articlesQuery.data.body} />
      </div>
      <div className="container border-t border-gray-300 py-4 flex flex-col">
        <PostAuthor article={articlesQuery.data} className="mx-auto mb-8" />
        <div className="mx-auto max-w-2xl flex flex-col gap-4 lg:min-w-xl">
          <CommentNew article={articlesQuery.data} />
          {(commentsQuery.data || []).map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              slug={articlesQuery.data.slug}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ArticleShow;
