import { createArticle, handleValidation } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import TagInput from "@/components/TagInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArticleCreate = () => {
  const queryClient = useQueryClient();
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

  const mutation = useMutation({
    mutationFn: () =>
      handleValidation(
        createArticle,
        {
          article: form,
        },
        ({ article }) => {
          navigate(`/articles/${article.slug}`);
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

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
          action={mutation.mutateAsync}
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
            {form.tagList.map((tag, i) => (
              <span key={i} className="inline-flex">
                {tag}
              </span>
            ))}
            <TagInput onChange={(tagList) => setForm({ ...form, tagList })} />
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
