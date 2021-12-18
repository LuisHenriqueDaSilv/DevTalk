from flask import Blueprint

# Controllers
from ..controllers import AccountsController

# Middlewares
from ..middlewares import error_handler


account_router = Blueprint(
    name='account_router',
    import_name=__name__
)

accounts_controller = AccountsController()


@account_router.route('/login/github', methods=['POST'])
@error_handler
def login_with_github():
    return accounts_controller.login_with_github()
