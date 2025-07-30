# CES_AdamSims

Coding Challenge for CES: Bug Report Tool

---

## Running the Laravel Backend

1. **Install PHP dependencies:**
    ```sh
    composer install
    ```

2. **Copy the environment file and generate an app key:**
    ```sh
    cp .env.example .env
    php artisan key:generate
    ```

3. **Configure your database settings** in `.env` as needed.

4. **Run database migrations:**
    ```sh
    php artisan migrate
    ```

5. **Start the Laravel development server:**
    ```sh
    php artisan serve
    ```
    The backend will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Running the Frontend

1. **Install Node.js dependencies:**
    ```sh
    npm install
    ```

2. **Start the Vite development server:**
    ```sh
    npm run dev
    ```
    The frontend assets will be hot-reloaded and served via Vite, typically at [http://localhost:5173](http://localhost:5173]), but proxied through Laravel at [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Running Cypress Tests

1. **Ensure the backend (`php artisan serve`) and frontend (`npm run dev`) are both running.**

2. **Run Cypress in interactive mode:**
    ```sh
    npx cypress open
    ```
    or to run all tests in headless mode:
    ```sh
    npx cypress run
    ```

---

## Assumptions/Notes

1. There are 2 types of Cypress tests that I have created with different Suffixes following a '_':
    - '_API' is a test file that tests against a database connection.
    - '_INTERCEPT' is a test file that uses the 'intercept' function to test without touching the database.
The reasoning behind this was to have a safer test that didnt expose the database to testing data.

2. This was the first time I had conducted tests via Cypress, but I feel I got to grips with it rather quickly.

---