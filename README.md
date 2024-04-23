# Project Setup and Deployment Guide

## Overview
This will take you through the steps needed to run the project.

## Links
- Project Repository `https://github.com/AliSiddique/city-final-project`
- Deployed URL `https://city-final-project.vercel.app`


## Prerequisites
- Node.js and npm installed on your machine
- Git installed on your machine
- Access to the project repository
- Python Version 3.12.2
- Node Version 20.3.0
- Code editor - Preferably VSCode
- VScode needs the python extension to work
- Docker (If using Docker)


## Frontend Setup
## Options 

1. ### Clone the frontend repository:
    ```
    git clone https://github.com/AliSiddique/city-final-project/frontend
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

### 2. Download Code folder
- Cd into frontend  
     ```
    cd frontend
    ```
- Install dependencies:
    ```
    npm i
    ```

- Start server
  ```
  npm run dev
  ```



## Running the Frontend
- Open your web browser and navigate to `http://localhost:3000` to view the frontend.

# Backend Setup
## Options 
- Run using python
- Run using Docker


## Python runtime
1. Clone the Backend repository:
    ```
    git clone https://github.com/AliSiddique/city-final-project/backend
    ```
  ### or download the code.
2. Open the project on Vscode
3. Add `.env` file with following variables if not present in backend.
    ```
    DB_ENGINE=django.db.backends.postgresql
    DB_NAME=railway
    DB_HOST=monorail.proxy.rlwy.net
    DB_PORT=35837
    DB_USER=postgres
    DB_PASSWORD=VlQcHKzXsVvwBIErTqVAqgXFMOtuITnW
    SECRET_KEY=django-insecure-rl8t1x(=2g^l(zbp6*qpi=3rv%$-9tru+c=3#a=jmvj5)+j-85
    DEFAULT_FILE_STORAGE=storages.backends.s3boto3.S3Boto3Storage
    AWS_ACCESS_KEY_ID=AKIAQLLKFPRGXWDNP6MG
    AWS_SECRET_ACCESS_KEY=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
    AWS_STORAGE_BUCKET_NAME=city-uni-final-project
    AWS_S3_REGION_NAME=eu-west-2
    AWS_S3_FILE_OVERWRITE=False
    AWS_QUERYSTRING_AUTH=False
    AWS_QUERYSTRING_EXPIRE = 63115200
    EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
    EMAIL_HOST=smtp.sendgrid.net
    EMAIL_HOST_USER=apikey 
    EMAIL_PORT=587
    EMAIL_USE_TLS=True
    EMAIL_HOST_PASSWORD=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
    ```

4.  Run to make a virtual environment
    ```
    python3 -m venv env
    ```
5. Activate the virtual environment - MacOS
  ```
  source env/bin/activate
  ```    
6.  ```
    cd backend
    ```

7. Install dependencies
    ```
    pip3 install -r requirements.txt
    ```

### Docker runtime (Easier)
1. Clone the Backend repository:
    ```
    git clone https://github.com/AliSiddique/city-final-project/backend
    ```
  ###  or download the code.
2. Run 
    ```
    cd backend
    ```
3. Run 
    ```
    docker build -t backend_image .
    ```
4. Run 
    ```
    docker run -p 127.0.0.1:8000:8000 backend_image
    ```

## Running the Backend
- Once you have the dependencies installed you can run the backend (Using Pythnon runtime)
1. Start the backend server:
    ```
    python manage.py runserver
    ```
2. The backend server will start running on `http://127.0.0.1:8000`.

## Additional Notes
- Make sure both frontend and backend servers are running simultaneously for the full functionality of the project.

- When labelling the data, two model will be download for the segmentation and labelling of the images