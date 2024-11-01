#! /bin/bash

if command -v docker &> /dev/null; then
    echo "Docker detected, starting Postgres container..."
    docker compose up -d

    # Wait for the Postgres container to be ready
    echo "Waiting for Postgres container to be ready..."
    while ! docker exec polar_postgres pg_isready -U postgres -d scout &> /dev/null; do
        sleep 1
    done
    echo "Postgres container is ready."
else
    echo "Docker not detected, checking for local Postgres..."

    # Check if pg_isready command is available
    if ! command -v pg_isready &> /dev/null; then
        echo "Error: pg_isready command not found. Please ensure PostgreSQL is installed."
        exit 1
    fi

    # Check if Postgres is running locally
    if pg_isready -U postgres -d scout &> /dev/null; then
        echo "Local Postgres is running."
    else
        echo "Local Postgres is not running. Please start it manually."
        exit 1
    fi
fi