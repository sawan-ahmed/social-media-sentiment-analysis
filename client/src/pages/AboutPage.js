import React from "react";
import Layout from "./Layout";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <Layout>
      <div className="about-page">
        <h1 className="about-title">🌐 Distributed Social Media Sentiment Analysis</h1>
        <p className="about-description">
          This project performs real-time sentiment analysis on social media content using a distributed system.
          Built with <strong>Kafka</strong>, <strong>Flask</strong>, <strong>MongoDB</strong>, and 
          <strong> custom ML models</strong>, the system is deployed across multiple virtual machines (VMs),
          each responsible for a specialized role in the data pipeline.
        </p>

        <section className="system-overview">
          <h2>🔧 Virtual Machine Roles</h2>
          <div className="system-grid">
            <div className="system-box">
              <h3>💬 VM1 — Data Ingestion</h3>
              <p>
                Hosts <code>tweet_producer</code> and <code>reddit_producer</code> 
                to stream content from the Twitter and Reddit APIs. It also runs a Flask backend API 
                to interface with the frontend and trigger topic-based data pulls.
              </p>
              <p><strong>Dockerfiles:</strong> <code>dockerfile.api</code>, <code>dockerfile.reddit</code>, <code>dockerfile.producer</code></p>
            </div>

            <div className="system-box">
              <h3>🧠 VM4 — Inference</h3>
              <p>
                Executes <code>inference_consumer.py</code>, which acts as the intermediate consumer 
                forwarding raw tweet data into the ML model pipeline for classification.
              </p>
              <p><strong>Dockerfile:</strong> <code>dockerfile.inference</code></p>
            </div>

            <div className="system-box">
              <h3>📊 VM3 — Machine Learning</h3>
              <p>
                Runs <code>ml_consumer.py</code> for sentiment prediction using a custom MapReduce-inspired
                pipeline, and <code>mongo_consumer.py</code> to store results in MongoDB.
              </p>
              <p><strong>Dockerfiles:</strong> <code>dockerfile.ml</code>, <code>dockerfile.mongo</code></p>
            </div>

            <div className="system-box">
              <h3>🛰️ Kafka — Message Broker</h3>
              <p>
                Apache Kafka acts as the backbone for inter-VM communication. It connects producers 
                (VM1) with consumers (VM4 and VM3), ensuring smooth real-time message flow across services.
              </p>
              <p><em>Kafka is distributed across all VMs for fault tolerance and throughput.</em></p>
            </div>
          </div>
        </section>

        <section className="project-objectives">
          <h2>🎯 Project Objectives</h2>
          <ul>
            <li>✅ Enable real-time social media data collection triggered by frontend input</li>
            <li>✅ Distribute sentiment analysis across VMs using Dockerized microservices</li>
            <li>✅ Store structured results in MongoDB and visualize with React dashboards</li>
            <li>✅ Showcase distributed architecture with Kafka-based streaming and fault isolation</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
