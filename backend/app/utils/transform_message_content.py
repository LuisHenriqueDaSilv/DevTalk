def transform_message_content(text):

    message_words = text.split()

    its_is_a_code_part = False
    current_language_name = None
    current_text = ''
    language_name_index = None

    message_content = []

    for index in range(0, len(message_words)):

        if message_words[index] == '<code>':
            if current_text:
                message_part = {
                    'type': 'text',
                    'text': current_text
                }
                message_content.append(message_part)

            its_is_a_code_part = True
            language_name_index = index + 1
            current_text = ''

        elif index == language_name_index:
            current_language_name = message_words[index]

        elif message_words[index] == '</code>' and its_is_a_code_part:
            if current_text:
                message_part = {
                    'type': 'code',
                    'language_name': current_language_name,
                    'code': current_text
                }
                message_content.append(message_part)

            its_is_a_code_part = False
            current_text = ''

        elif index + 1 == len(message_words):
            current_text = f'{current_text} {message_words[index]}'

            message_part = {
                'type': 'text',
                'text': current_text,
            }
            message_content.append(message_part)

        else:
            current_text = f'{current_text} {message_words[index]}'

    return message_content
