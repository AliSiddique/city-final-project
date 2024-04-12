from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from allauth.account.admin import EmailAddress
class AccountsTestCase(APITestCase):
    # define the urls
    register_url = "/api/auth/register/"
    verify_email_url = "/api/auth/register/verify-email/"
    login_url = "/api/auth/login/"
    logout_url = "/api/auth/logout/"
    user_details_url = "/api/auth/user/"

    # Set up the test
    def setUp(self):
        self.user1_params = {
            "username": "alis",  
            "email": "random@example.com",
            "password": "extremlysecret",
        }
        # create user and verified email
        user = User.objects.create_user(
            username=self.user1_params["username"],
            email=self.user1_params["email"],
            password=self.user1_params["password"],
        )
        EmailAddress.objects.create(
            user=user, email=user.email, verified=True, primary=True
        )
    # Test the register endpoint
    def test_register(self):

        # register data
        data = {
            "email": "random2@example.com",
            "password1": "extremlysecret",
            "password2": "extremlysecret",
        }
        # send POST request to "/api/auth/register/"
        response = self.client.post(self.register_url, data)
        # check the response status and data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # try to login
        login_data = {
            "email": data["email"],
            "password": data["password1"],
        }
        response = self.client.post(self.login_url, login_data)
         
        # Login after verification to get token key
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("key" in response.json())


    def test_get_user_details(self):
        # Login to get token
        response = self.client.post(self.login_url, self.user1_params)
        token = response.json()["key"]
        # Set headers
        headers = {"HTTP_AUTHORIZATION": "Token " + token}
        # Get user details
        response = self.client.get(self.user_details_url, **headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        for k in ["username", "email", "profile"]:
            self.assertTrue(k in data)
        self.assertTrue("plan" in data["profile"])
        self.assertTrue("free" in data["profile"]["plan"])

    def test_logout(self):
        # there should be 0 tokens before login
        self.assertEqual(Token.objects.all().count(), 0)
        # Login
        response = self.client.post(self.login_url, self.user1_params)
        # Get the token
        self.assertEqual(response.status_code, 200)
        self.assertTrue("key" in response.json())
        self.assertEqual(Token.objects.all().count(), 1)
        # Set headers
        token = response.json()["key"]
        headers = {"HTTP_AUTHORIZATION": "Token " + token}
        # Logout
        response = self.client.post(self.logout_url, **headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["detail"], "Successfully logged out.")
    