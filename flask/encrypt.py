from cryptography.fernet import Fernet
import os

""" 

Function for encrypting the conversation

Arguments:

Date that the conversation was completed

"""
def encrypt(date):

    with open("filekey.key", "rb") as key_file:
        key = key_file.read()
    fernet = Fernet(key)
    

    relative_conversation_path = os.path.relpath("/my-cui-app/conversations/", "/my-cui-app")

    path_of_file = os.path.join(relative_conversation_path,"output"+str(date)+".txt")
    with open(path_of_file, "rb") as file:
        original = file.read()

    encrypted = fernet.encrypt(original)

    with open(path_of_file, "wb") as encrpted_output:
        encrpted_output.write(encrypted)


if __name__ == '__main__':
    encrypt()