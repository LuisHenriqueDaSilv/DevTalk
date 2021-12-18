import requests
import os

# Dotenv variables
GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET')
GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID')


class GithubOauthUser():


    def __init__(self, code):
        self.code = code
        self.error = False

        self.get_access_token()
        self.get_github_user_infos()

    def get_access_token(self):

        try:

            self.access_token_response = requests.get(
                'https://github.com/login/oauth/access_token',
                params={
                    'client_id': GITHUB_CLIENT_ID,
                    'client_secret': GITHUB_CLIENT_SECRET,
                    'code': self.code
                },
                headers={
                    'Accept': 'application/json'
                }
            ).json()

            self.access_token = self.access_token_response.get('access_token')
            self.token_type = self.access_token_response.get('token_type')

            if not self.access_token:
                raise Exception('No access token')

        except Exception as error:
            self.error = error

    def get_github_user_infos(self):

        try:
            self.user_infos = requests.get(
                'https://api.github.com/user',
                headers={
                    'authorization': f'Bearer {self.access_token}'
                }
            ).json()

            if not self.user_infos.get('login'):
                raise Exception('No user infos')

        except Exception as error:
            self.error = error
