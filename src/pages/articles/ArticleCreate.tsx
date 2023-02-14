import { Article, createArticle, handleValidation } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import TagInput from "@/components/TagInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    title: string;
    description: string;
    body: string;
    tagList: string[];
  }>({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const onSuccess = async ({ article }: { article: Article }) => {
    navigate(`/articles/${article.slug}`);
  };

  return (
    <div className="container flex flex-col mb-8">
      <div className="lg:w-2xl sm:mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl mb-2 dark:text-white">
            Your new post
          </h1>
        </div>
        <FormValidation
          className="flex flex-col gap-4"
          action={() =>
            handleValidation(
              createArticle,
              {
                article: form,
              },
              onSuccess
            )
          }
        >
          <div>
            <input
              type="text"
              placeholder="Post Title"
              className="form-control"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <textarea
              placeholder="Short description"
              className="form-control"
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div>
            <textarea
              placeholder="Write your post (in markdown)"
              className="form-control h-100"
              required
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </div>
          <div>
            <TagInput v-model="form.tagList" />
          </div>

          <div className="flex justify-end">
            <BaseButton>Create Post</BaseButton>
          </div>
        </FormValidation>
      </div>
    </div>
  );
};

export default ArticleCreate;
