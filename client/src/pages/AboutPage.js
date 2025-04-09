import React from "react";
import Layout from "./Layout";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <Layout>
      <div className="about-page">
        <h1 className="about-title">🌐 Distributed Twitter Sentiment Analysis</h1>
        <p className="about-description">
          This project analyzes real-time Twitter discussions using a distributed system powered by 
          <strong> Kafka</strong>, <strong>Flask</strong>, and <strong>custom machine learning</strong> models. 
          Tweets are streamed live from the Twitter API, processed across multiple virtual machines, and 
          classified by sentiment (Positive, Neutral, Negative) using a MapReduce-style pipeline.
        </p>

        <section className="system-overview">
          <h2>🔧 System Overview</h2>
          <div className="system-grid">
            <div className="system-box">
              <h3>💬 VM1</h3>
              <p>Twitter Producer & Flask API — collects tweets based on topic input from the frontend.</p>
            </div>
            <div className="system-box">
              <h3>🧠 VM4</h3>
              <p>Inference Consumer — forwards tweets to the ML pipeline for prediction.</p>
            </div>
            <div className="system-box">
              <h3>📊 VM3</h3>
              <p>ML Consumer — performs sentiment classification using MapReduce and keyword analysis.</p>
            </div>
            <div className="system-box">
              <h3>📦 VM2</h3>
              <p>Kafka Broker — facilitates real-time communication between all services.</p>
            </div>
          </div>
        </section>

        <section className="project-objectives">
          <h2>🔍 Project Objectives</h2>
          <ul>
            <li>✅ Collect real-world tweets dynamically from user-specified topics</li>
            <li>✅ Apply custom sentiment analysis using keyword-based MapReduce techniques</li>
            <li>✅ Visualize sentiment trends through interactive frontend dashboards</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
