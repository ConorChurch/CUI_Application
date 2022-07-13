import json
import sys
from cryptography.fernet import Fernet

def decrypt(argv):
    input_file = open('../src/input.json')
    data = json.load(input_file)

    date = argv[1]

    key = data['Parameters'][2]["Encryption/Decryption Key"]
    fernet = Fernet(key)
    
    with open("output"+str(date)+".txt", "rb") as encrypted_file:
        encrypted = encrypted_file.read()

    decrypted = fernet.decrypt(encrypted)

    with open("output"+str(date)+".txt", "wb") as decrpted_output:
        decrpted_output.write(decrypted)

if __name__ == '__main__':
    decrypt(sys.argv)