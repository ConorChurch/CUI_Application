from google.cloud import storage
import json
import os



def send_to_database(date):
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'GOOGLE_APPLICATION_CREDENTIALS.json'
    storage_client = storage.Client()

    bucket_name = "cui_storage"
    bucket = storage_client.bucket(bucket_name)

    if(bucket.exists(storage_client) == False):
        bucket = storage_client.create_bucket(bucket)
    
    blob = bucket.blob("/CUI_Storage/CUI_"+str(date))

    blob.upload_from_filename("./output"+str(date)+".txt")

    print(
        f"File output"+str(date)+".txt uploaded."
    )

if __name__ == '__main__':
    send_to_database()