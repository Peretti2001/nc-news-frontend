// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import TopicsPage from "./pages/TopicsPage";
import TopicPage from "./pages/TopicPage";
import ArticlePage from "./pages/ArticlePage";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/topics/:topic" element={<TopicPage />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}
