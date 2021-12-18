from flask import request

from app import db

# Services
from ..services import GithubOauthUser
from ..services import AuthenticationJwt

# Database Models
from ..database.models import User


class AccountsController():


    def login_with_github(self):
        
        github_code = request.form.get('github_code')
        
        if not github_code:
            return {
                'error': 'Bad Verification Code'
            }, 400

        github_user = GithubOauthUser(github_code)

        if github_user.error:
            return {
                'error': 'Bad Verification Code'
            }, 400

        github_username = github_user.user_infos['login']
        github_avatar_url = github_user.user_infos['avatar_url']
        github_id = github_user.user_infos['id']
        github_followers = github_user.user_infos['followers']
        github_repos = github_user.user_infos['public_repos']

        user = User.query.filter_by(
            github_id=github_id
        ).first()

        if user:

            if (
                user.username != github_username or
                user.followers != github_followers or
                user.repos != github_repos
            ):
                user.username = github_username
                user.followers = github_followers
                user.repos = github_repos

        else:
            
            user = User(
                username=github_username,
                avatar_url=github_avatar_url,
                github_id=github_id,
                github_followers=github_followers,
                github_repos=github_repos
            )
            db.session.add(user)

        db.session.commit()

        login_jwt = AuthenticationJwt(
            user_id=user.id
        )
        
        return {
            'authorization_jwt': login_jwt.code,
            'user_infos': {
                'username': user.username,
                'avatar_url': user.avatar_url,
                'id': user.id,
                'github_id': user.github_id,
                'followers': user.followers,
                'repos': user.repos 
            }
        }
