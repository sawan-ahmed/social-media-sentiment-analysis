# Social Media Sentiment Analysis

This project analyzes social media posts (such as tweets and Reddit posts) to determine the sentiment of discussions around a specific topic. The sentiment analysis is powered by a Natural Language Processing (NLP) model, and the data is processed using the MapReduce framework. The results are displayed in a Dockerized web application with interactive sentiment visualization.

## Project Overview

The project is structured into multiple components:

- **Frontend**: A web application built with React that displays sentiment analysis results.
- **Backend**: An API built with Node.js and Express to fetch data and serve sentiment results.
- **Data**: Social media data (e.g., Twitter and Reddit) fetched through their respective APIs.
- **MapReduce**: Used to process and analyze the sentiment of large-scale data.


## Features

- **Sentiment Analysis**: The sentiment of social media posts is classified as positive, negative, or neutral using an NLP model.
- **Data Visualization**: Interactive sentiment graphs are displayed on the frontend using Chart.js.
- **Dockerized App**: Both frontend and backend are Dockerized, making it easy to deploy and run the application in any environment.
- **MapReduce Framework**: Efficient data processing using MapReduce for handling large datasets.

## Setup and Installation

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js installed for local development (optional if you are using Docker).

### Running the Application

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/social-media-sentiment-analysis.git
   cd social-media-sentiment-analysis
   ```

2. Build and start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Once the application is running, open the frontend in your browser:

   ```
   http://localhost:3000
   ```

   The backend API will be available at:

   ```
   http://localhost:5000
   ```

### Development

To run the frontend or backend locally (without Docker):

1. **Frontend**:
   - Navigate to the `sentiment-analysis-frontend` folder.
   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the frontend:

     ```bash
     npm start
     ```

2. **Backend**:
   - Navigate to the `sentiment-analysis-backend` folder.
   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the backend:

     ```bash
     node server.js
     ```

The frontend will be available at `http://localhost:3000`, and the backend will be available at `http://localhost:5000`.

## API Endpoints

### `GET /api/sentiment`

- **Description**: Fetches the sentiment analysis results.
- **Response**:

   ```json
   [
     {
       "timestamp": "2025-03-10T10:00:00",
       "score": 0.5
     },
     {
       "timestamp": "2025-03-10T11:00:00",
       "score": 0.7
     },
     {
       "timestamp": "2025-03-10T12:00:00",
       "score": -0.3
     }
   ]
   ```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **React** for building the frontend UI.
- **Node.js & Express** for creating the backend API.
- **Chart.js** for data visualization.
- **MapReduce** framework for large-scale data processing.

---

### How to Use:

1. **Edit the placeholders**: Replace `your-username` with your actual GitHub username in the clone URL.
2. **Customization**: You can expand sections such as "Setup and Installation," "API Endpoints," and "Development" if your application includes more features or setup steps in the future.
