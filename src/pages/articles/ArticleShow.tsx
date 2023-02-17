import {
  Article,
  Comment,
  deleteArticle,
  favoriteArticleToggle,
  followProfileToggle,
  getArticle,
  getComments,
} from "@/api";
import BaseButton from "@/components/BaseButton";
import PostAuthor from "@/components/PostAuthor";
import { UserContext } from "@/contexts/user";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArticleShow = () => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();
  const { slug } = useParams<string>();

  if (!slug) {
    return null;
  }

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getArticle({ slug }).then(({ data }) => {
      setArticle(data.article);
    });
    getComments({ slug }).then(({ data }) => {
      setComments(data.comments);
    });
  }, [slug]);

  if (!article) {
    return null;
  }

  const deleteArticleAction = async () => {
    if (confirm("Are you sure?")) {
      await deleteArticle({ slug });

      navigate("/");
    }
  };

  return (
    <div className="bg-gray-800 text-white py-8 mb-8">
      <div className="container">
        <h1 className="font-brand font-bold text-5xl mb-8">{article.title}</h1>

        <div className="flex items-center">
          <PostAuthor
            article={article}
            onFollow={async () => {
              await followProfileToggle(article.author);
              setArticle(article);
            }}
            onFavorite={async () => {
              await favoriteArticleToggle(article);
              setArticle(article);
            }}
          />

          {userStore?.isLoggedIn &&
            article.author.username === userStore.user?.username && (
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
  );
};

export default ArticleShow;
