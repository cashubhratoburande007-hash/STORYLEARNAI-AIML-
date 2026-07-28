import { useState } from "react";
import API from "../services/api";
import Result from "./Result";
import "./Home.css";

function Home() {
  const [concept, setConcept] = useState("");
  const [level, setLevel] = useState("School");
  const [language, setLanguage] = useState("English");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!concept.trim()) {
      alert("Please enter a concept.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first.");
      window.location.href = "/login";
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/generate-story", {
        concept,
        level,
        language,
      });

      setResult(response.data.result);

      // Save story
      await API.post("/save-story", {
        user_id: user.id,
        concept,
        level,
        language,
        story: response.data.result,
      });

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="home">

      <div className="header">
        <div className="logo">
          📚 <span>StoryLearn AI</span>
        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="story-card">

        <h1>Learn Through AI Stories ✨</h1>

        <p>
          Convert any concept into an engaging educational story using AI.
        </p>

        <input
          type="text"
          placeholder="Enter concept (e.g. Machine Learning)"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>School</option>
          <option>College</option>
          <option>Beginner</option>
          <option>Advanced</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Marathi</option>
        </select>

        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "✨ Generate Story"}
        </button>

        {result && <Result result={result} />}

      </div>

    </div>
  );
}

export default Home;