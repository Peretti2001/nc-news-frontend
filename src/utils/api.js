import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// ----- Articles -----

export const getArticles = (params = {}) =>
  api.get("/articles", { params }).then((res) => res.data);

export const getSingleArticle = (articleId) =>
  api.get(`/articles/${articleId}`).then((res) => res.data);

// ----- Comments -----

export const getComments = (articleId) =>
  api.get(`/articles/${articleId}/comments`).then((res) => res.data);

export const postComment = (articleId, { username, body }) =>
  api
    .post(`/articles/${articleId}/comments`, { username, body })
    .then((res) => res.data);

export const deleteComment = (commentId) =>
  api.delete(`/comments/${commentId}`);

// ----- Topics -----

export const getTopics = () => api.get("/topics").then((res) => res.data);

export default api;
