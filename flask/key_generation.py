from cryptography.fernet import Fernet


def key_generation():
    key = Fernet.generate_key()
    with open('filekey.key', 'wb') as filekey:
        filekey.write(key)

if __name__ == '__main__':
    key_generation()