import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1 className="main-header">Distributed Social Media Sentiment Analysis</h1>
      <p className="description">
        This project performs real-time sentiment analysis on social media content using a distributed system.
        Built with <strong>Kafka</strong>, <strong>Flask</strong>, <strong>MongoDB</strong>, and <strong>custom ML models</strong>,
        the system is deployed across multiple virtual machines (VMs), each responsible for a specialized role in the data pipeline.
      </p>

      <h2 className="section-title">Virtual Machine Roles</h2>
      <div className="vm-grid">
        <div className="vm-box">
          <h3>VM1 — Data Ingestion</h3>
          <p>
            Hosts <code>tweet_producer</code> and <code>reddit_producer</code> to stream content from the X and Reddit APIs.
            Also runs a Flask backend to interface with the frontend and trigger topic-based data pulls.
          </p>
        </div>

        <div className="vm-box">
          <h3>VM4 — Inference</h3>
          <p>
            Executes <code>inference_consumer.py</code>, which acts as the intermediate consumer forwarding raw tweet data into the ML model pipeline for classification.
          </p>
        </div>

        <div className="vm-box">
          <h3>VM3 — Machine Learning</h3>
          <p>
            Runs <code>ml_consumer.py</code> for sentiment prediction using a custom MapReduce-inspired pipeline, and <code>mongo_consumer.py</code> to store results in MongoDB.
          </p>
        </div>

        <div className="vm-box">
          <h3>Kafka — Message Broker</h3>
          <p>
            Acts as the backbone for inter-VM communication. Connects producers (VM1) with consumers (VM4 and VM3) and enables fault-tolerant, real-time streaming.
          </p>
          <p className="docker-label"><em>Kafka is distributed across all VMs for fault tolerance and throughput.</em></p>
        </div>
      </div>

      <h2 className="section-title">Project Objectives</h2>
      <ul className="objectives-list">
        <li>- Enable real-time social media data collection triggered by frontend input</li>
        <li>- Distribute sentiment analysis across VMs using Dockerized microservices</li>
        <li>- Store structured results in MongoDB and visualize with React dashboards</li>
        <li>- Showcase distributed architecture with Kafka-based streaming and fault isolation</li>
      </ul>
    </div>
  );
};

export default AboutPage;
