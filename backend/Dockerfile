# Use an official Python runtime as a parent image
FROM python:3.9

# Set environment variables for unbuffered output and to not generate .pyc files
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory inside the container
WORKDIR /app

# Set your environment variables
ENV DEBUG=True
ENV STRIPE_SECRET_KEY=sk_test_51NBfIhIu9v54yQAF2yL4VjNtrGGTbsqKLDjCZND6fyZysA5HZsxbAK2bMZqAlBI2oVTO0KYsdaatzEIW4G2EIhTm00npxwEAWi
ENV STRIPE_WEBHOOK_SECRET=2QWS

ENV DEFAULT_FILE_STORAGE=storages.backends.s3boto3.S3Boto3Storage
ENV AWS_ACCESS_KEY_ID=AKIAQLLKFPRGXWDNP6MG
ENV AWS_SECRET_ACCESS_KEY=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
ENV AWS_STORAGE_BUCKET_NAME=city-uni-final-project
ENV AWS_S3_REGION_NAME=eu-west-2
ENV AWS_S3_FILE_OVERWRITE=False
ENV AWS_QUERYSTRING_AUTH=False
ENV AWS_QUERYSTRING_EXPIRE = 63115200



ENV EMAIL_HOST=smtp.sendgrid.net
ENV EMAIL_HOST_USER=apikey
ENV EMAIL_PORT=587
ENV EMAIL_USE_TLS=True
ENV EMAIL_HOST_PASSWORD=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


ENV SECRET_KEY=django-insecure-lvdat6w^@07ut!3xv(@ec@$n9mhl6hpiij*3@sy&b(vd38g4u5
ENV DB_ENGINE=django.db.backends.postgresql
ENV DB_NAME=railway
ENV DB_HOST=monorail.proxy.rlwy.net
ENV DB_PORT=35837
ENV DB_USER=postgres
ENV DB_PASSWORD=VlQcHKzXsVvwBIErTqVAqgXFMOtuITnW
ENV EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app/

# Expose the port that Django runs on
EXPOSE 8000

# Define the command to run your application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]