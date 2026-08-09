import {
  createArticle as createArticleRequest,
  createArticleComment,
  createArticleFavorite,
  createUser,
  deleteArticle as deleteArticleRequest,
  deleteArticleComment,
  deleteArticleFavorite,
  followUserByUsername,
  getArticle as getArticleRequest,
  getArticleComments,
  getArticles as getArticlesRequest,
  getArticlesFeed as getArticlesFeedRequest,
  getCurrentUser,
  getProfileByUsername,
  getTags as getTagsRequest,
  login as loginRequest,
  unfollowUserByUsername,
  updateArticle as updateArticleRequest,
  updateCurrentUser,
  type Article,
  type Comment,
  type HttpValidationProblemDetails as ValidationProblemDetails,
  type LoginUser,
  type NewArticle,
  type NewComment,
  type NewUser,
  type Profile,
  type UpdateArticle,
  type UpdateUser,
  type User,
} from "./client";
import { client } from "./client/client.gen";

client.setConfig({ baseUrl: import.meta.env.VITE_CONDUIT_API || "/api" });
client.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers.set("Authorization", `Token ${JSON.parse(token)}`);
  }
  return request;
});

type HandleValidation = (error: ValidationProblemDetails | undefined) => void;

const getArticles = (query: {
  author?: string;
  favorited?: string;
  tag?: string;
  limit?: number;
  offset?: number;
}) => getArticlesRequest({ query });
const getArticlesFeed = (query: { limit?: number; offset?: number }) =>
  getArticlesFeedRequest({ query });
const getArticle = (slug: string) =>
  getArticleRequest({ path: { slug } }).then(({ data }) => data!.article);
const getProfile = (username: string) =>
  getProfileByUsername({ path: { username } }).then(
    ({ data }) => data!.profile,
  );
const followProfile = (username: string) =>
  followUserByUsername({ path: { username } }).then(
    ({ data }) => data!.profile,
  );
const unfollowProfile = (username: string) =>
  unfollowUserByUsername({ path: { username } }).then(
    ({ data }) => data!.profile,
  );
const getComments = (slug: string) =>
  getArticleComments({ path: { slug } }).then(({ data }) => data!.comments);
const login = (user: LoginUser, handleValidation: HandleValidation) =>
  loginRequest({ body: { user } }).then(({ data, response, error }) => {
    if (response?.status === 400) {
      handleValidation(error);
      return null;
    }

    return data!.user;
  });
const register = (user: NewUser, handleValidation: HandleValidation) =>
  createUser({ body: { user } }).then(({ data, response, error }) => {
    if (response?.status === 400) {
      handleValidation(error as ValidationProblemDetails | undefined);
      return null;
    }

    return data!.user;
  });
const getUser = () => getCurrentUser().then(({ data }) => data!.user);
const updateUser = (user: UpdateUser, handleValidation: HandleValidation) =>
  updateCurrentUser({ body: { user } }).then(({ data, response, error }) => {
    if (response?.status === 400) {
      handleValidation(error);
      return null;
    }

    return data!.user;
  });
const getTags = () => getTagsRequest().then(({ data }) => data!.tags);
const createArticle = (
  article: NewArticle,
  handleValidation: HandleValidation,
) =>
  createArticleRequest({ body: { article } }).then(
    ({ data, response, error }) => {
      if (response?.status === 400) {
        handleValidation(error);
        return null;
      }

      return data!.article;
    },
  );
const updateArticle = (
  slug: string,
  article: UpdateArticle,
  handleValidation: HandleValidation,
) =>
  updateArticleRequest({ path: { slug }, body: { article } }).then(
    ({ data, response, error }) => {
      if (response?.status === 400) {
        handleValidation(error);
        return null;
      }

      return data!.article;
    },
  );
const deleteArticle = (slug: string) =>
  deleteArticleRequest({ path: { slug } });
const favoriteArticle = (slug: string) =>
  createArticleFavorite({ path: { slug } }).then(({ data }) => data!.article);
const unfavoriteArticle = (slug: string) =>
  deleteArticleFavorite({ path: { slug } }).then(({ data }) => data!.article);
const createComment = (
  slug: string,
  comment: NewComment,
  handleValidation: HandleValidation,
) =>
  createArticleComment({ path: { slug }, body: { comment } }).then(
    ({ data, response, error }) => {
      if (response?.status === 400) {
        handleValidation(error);
        return null;
      }

      return data!.comment;
    },
  );
const deleteComment = (slug: string, commentId: number) =>
  deleteArticleComment({ path: { slug, commentId } });

const favoriteArticleToggle = async (article: Article) => {
  if (article.favorited) {
    await unfavoriteArticle(article.slug);
    return;
  }
  await favoriteArticle(article.slug);
};

const followProfileToggle = async (profile: Profile) => {
  if (profile.following) {
    await unfollowProfile(profile.username);
    return;
  }
  await followProfile(profile.username);
};

export type {
  Article,
  Profile,
  Comment,
  User,
  ValidationProblemDetails,
  HandleValidation,
};
export {
  getArticles,
  getArticlesFeed,
  getTags,
  getArticle,
  getComments,
  getProfile,
  login,
  register,
  getUser,
  updateUser,
  createArticle,
  updateArticle,
  deleteArticle,
  createComment,
  deleteComment,
  favoriteArticleToggle,
  followProfileToggle,
};
