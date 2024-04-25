CREATE DATABASE perntask;

CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE activity(
    activity_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    status VARCHAR(255),
    tags VARCHAR(255)[],
    activity_type VARCHAR(255)
);