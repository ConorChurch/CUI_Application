from google.cloud import storage
import os

""" 

Function for sending conversation to the database if one is provided
Creates a Google Cloud bucket if it doesn't exist already

Arguments:

Date that the conversation was completed

"""

def send_to_database(date):
    relative_path = os.path.relpath("/my-cui-app/flask/GOOGLE_APPLICATION_CREDENTIALS.json", "/my-cui-app")
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = relative_path
    storage_client = storage.Client()

    bucket_name = "cui_storage"
    bucket = storage_client.bucket(bucket_name)

    if(bucket.exists(storage_client) == False):
        bucket = storage_client.create_bucket(bucket)
    
    blob = bucket.blob("/CUI_Storage/CUI_"+str(date))

    blob.upload_from_filename("./conversations/output"+str(date)+".txt")

    print(
        f"File output"+str(date)+".txt uploaded."
    )

if __name__ == '__main__':
    send_to_database()