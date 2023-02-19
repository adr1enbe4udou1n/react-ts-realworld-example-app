import { getArticle, handleValidation, updateArticle } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArticleEdit = () => {
  const queryClient = useQueryClient();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug) {
    return null;
  }

  const [form, setForm] = useState<{
    title: string;
    description: string;
    body: string;
  }>({
    title: "",
    description: "",
    body: "",
  });

  useQuery({
    queryFn: () =>
      getArticle({ slug }).then(({ data }) => {
        setForm({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
        });

        return data.article;
      }),
    queryKey: ["articles", slug],
  });

  const mutation = useMutation({
    mutationFn: () =>
      handleValidation(updateArticle, {
        slug,
        article: form,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles", slug] });
      navigate(`/articles/${slug}`);
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
          action={() => mutation.mutateAsync()}
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

          <div className="flex justify-end">
            <BaseButton>Edit Post</BaseButton>
          </div>
        </FormValidation>
      </div>
    </div>
  );
};

export default ArticleEdit;
