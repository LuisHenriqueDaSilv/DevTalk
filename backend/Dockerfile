FROM python:3.7.12-bullseye

WORKDIR /project
COPY . /project
RUN pip install -r requirements.txt

RUN flask db init
RUN flask db migrate
RUN flask db upgrade

CMD python3 run.py