from cryptography.fernet import Fernet



def key_generation(date):
    key = Fernet.generate_key()

    with open('file_containing_key'+date+'.key', 'wb') as filekey:

