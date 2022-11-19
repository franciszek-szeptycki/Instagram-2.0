import string
import random

import core

def keyGenerator(stringlength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringlength))


def send_welcome_email(username, email, key):
    msg = core.Message("Instagram-2.0 - Potwierdzenie rejestracji", recipients=[email])
    msg.body = "Witaj " + str(username) + "!\n\n" + \
               "Aby potwierdzić rejestrację kliknij w poniższy link:\n\n" + \
               "http://127.0.0.1:5000/auth/activate/" + str(key) + "\n" + \
               "Pozdrawiamy,\n" + \
               "Zespół Instagram-2.0"
    core.mail.send(msg)
    return "Message sent!"