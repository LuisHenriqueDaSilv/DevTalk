import json
import requests
import os

def download_languages_icon():

    project_path = os.path.dirname(os.path.abspath('run.py'))

    chats_file = open(f'{project_path}/app/database/chats/chats.json')
    chats_data = json.load(chats_file)

    for language in chats_data:

        if language == 'Global':
            return

        print(f'Downloading {language["name"]} icon')

        icon = requests.get(
            f'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{language["aliase"]}/{language["aliase"]}-original.svg'
        )

        icon_not_found_content = bytes(
            f'Package size exceeded the configured limit of 50 MB. Try https://github.com/devicons/devicon/tree/v2.14.0/icons/{language["aliase"]}/{language["aliase"]}-plain.svg instead.',
            encoding='utf8'
        )

        if icon.content == icon_not_found_content:
            icon = requests.get(
                f'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{language["aliase"]}/{language["aliase"]}-plain.svg'
            )

        icon_file = open(f'{project_path}/app/database/chats/icons/{language["aliase"]}.svg', 'wb')
        icon_file.write(icon.content)
        icon_file.close()

if __name__== "__main__":
    download_languages_icon()