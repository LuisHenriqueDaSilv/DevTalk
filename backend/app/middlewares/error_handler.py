from functools import wraps

def error_handler(function):

    @wraps(function)
    def wrapper( *args, **kwargs):
        try:
            return function(*args, **kwargs)
        except Exception as error:

            print('\n'*3)
            print(error)
            print('\n'*3)

            return {
                'error': 'Something unexpected happened'
            }, 500

    return wrapper
