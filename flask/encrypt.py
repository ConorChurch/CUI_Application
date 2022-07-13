import json
from cryptography.fernet import Fernet
import datetime

def encrypt(date):

    input_file = open('../src/input.json')
    data = json.load(input_file)

    key = data['Parameters'][2]["Encryption/Decryption Key"]
    fernet = Fernet(key)
    
    with open("output"+str(date)+".txt", "rb") as file:
        original = file.read()

    encrypted = fernet.encrypt(original)

    with open("output"+str(date)+".txt", "wb") as encrpted_output:
        encrpted_output.write(encrypted)


if __name__ == '__main__':
    encrypt()