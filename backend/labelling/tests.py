from django.core import mail
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from allauth.account.admin import EmailAddress
class AccountsTestCase(APITestCase):

    register_url = "/api/auth/register/"
    verify_email_url = "/api/auth/register/verify-email/"
    login_url = "/api/auth/login/"
    logout_url = "/api/auth/logout/"
    user_details_url = "/api/auth/user/"
    user_details_url = "/api/auth/user/"


    def setUp(self):
        self.user1_params = {
            "username": "user1",  # it is optional to pass username
            "email": "piotr@example.com",
            "password": "verysecret",
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
    def test_register(self):

        # register data
        data = {
            "email": "user2@example-email.com",
            "password1": "verysecret",
            "password2": "verysecret",
        }
        # send POST request to "/api/auth/register/"
        response = self.client.post(self.register_url, data)
        # check the response status and data
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # try to login - should fail, because email is not verified
        login_data = {
            "email": data["email"],
            "password": data["password1"],
        }
        response = self.client.post(self.login_url, login_data)
    

        # expected one email to be send
        # parse email to get token
     

        # lets login after verification to get token key
        response = self.client.post(self.login_url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue("key" in response.json())


    def test_get_user_details(self):
        # login to get token
        response = self.client.post(self.login_url, self.user1_params)
        token = response.json()["key"]
        # set headers
        headers = {"HTTP_AUTHORIZATION": "Token " + token}
        # get user details
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
        # login
        response = self.client.post(self.login_url, self.user1_params)
        # get the token
        self.assertEqual(response.status_code, 200)
        self.assertTrue("key" in response.json())
        self.assertEqual(Token.objects.all().count(), 1)
        # set headers
        token = response.json()["key"]
        headers = {"HTTP_AUTHORIZATION": "Token " + token}
        # logout
        response = self.client.post(self.logout_url, **headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["detail"], "Successfully logged out.")

    def test_users_photos(self):
        response = self.client.post(self.login_url, self.user1_params)
        token = response.json()["key"]
        headers = {"HTTP_AUTHORIZATION": "Token " + token}
        response = self.client.get("/api/users-photos/", **headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])
        response = self.client.post("/api/label/", {"image": "https://unsplash.com/photos/an-aerial-view-of-a-house-in-the-middle-of-a-forest-jydr6E3DvyI"}, **headers)
        self.assertEqual(response.status_code, 200)
        response = self.client.get("/api/users-photos/", **headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
 