import sys
from cryptography.fernet import Fernet

""" 

Function for decrypting the encrypted conversation

Arguments:

Name of file to decrypt

"""
def decrypt(argv):

    name_of_file = argv[1]

    with open("filekey.key", "rb") as key_file:
        key = key_file.read()

    fernet = Fernet(key)

    with open(name_of_file, "rb") as encrypted_file:
        encrypted = encrypted_file.read()

    decrypted = fernet.decrypt(encrypted)

    with open(name_of_file, "wb") as decrpted_output:
        decrpted_output.write(decrypted)

if __name__ == '__main__':
    decrypt(sys.argv)