FROM node:latest AS builder

WORKDIR /my-cui-app

COPY . .

RUN npm install

RUN npm run build

FROM python:3.8-slim-buster

WORKDIR /my-cui-app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

COPY --from=builder /my-cui-app ./

EXPOSE 33507

CMD [ "python3", "./flask/save_conversation.py", "--host=0.0.0.0"]