# Project Setup and Deployment Guide

## Overview
This guide will walk you through the steps to set up and run both the frontend and backend components of Open comp.

## Links
- Project Repository `https://github.com/AliSiddique/city-final-project`
- Deployed URL `https://city-final-project.vercel.app`


## Prerequisites
- Node.js and npm installed on your machine
- Git installed on your machine
- Access to the project repository
- Python Version 3.11.7
- Node Version 20.3.0
- Code editor - Preferably VSCode
- VScode needs the python extension to work


## Frontend Setup
### Options 

1. Clone the frontend repository:
    ```
    git clone https://github.com/AliSiddique/city-final-project
    ```
- Open the project on Vscode
-  Run 
     ```
     cd frontend
    ```

-   Run 
    ```
    npm i
    ```
- Start server
  ```
  npm run dev
  ```    

2. Download Code folder
    ```
    cd frontend
    ```
3. Install dependencies:
    ```
    npm i
    ```

- Start server
  ```
  npm run dev
  ```



## Running the Frontend
- Open your web browser and navigate to `http://localhost:3000` to view the frontend.

## Backend Setup
### Options 

1. Clone the frontend repository:
    ```
    git clone https://github.com/AliSiddique/city-final-project
    ```
- Open the project on Vscode
- ## Rename `.env.example` to `.env`
-   ```
    cd backend
    ```

-   Run to make a virtual environment
    ```
    python3 -m venv env
    ```
- Activate the virtual environment - MacOS
  ```
  source env/bin/activate
  ```    

2. Install dependencies
    ```
    pip3 install -r requirements.txt
    ```



## Running the Backend
- Once you have the dependencies installed you can run the backend
1. Start the backend server:
    ```
    python manage.py runserver
    ```
2. The backend server will start running on `http://127.0.0.1:8000`.

## Additional Notes
- Make sure both frontend and backend servers are running simultaneously for the full functionality of the project.


- When labelling the data, two model will be download for the segmentation and labelling of the images