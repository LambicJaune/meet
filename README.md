# Meet


**Meet** is a **serverless**, **progressive web application (PWA)** built with **React**, using a **test-driven development (TDD)** approach. The app uses the **Google Calendar API** to fetch and display upcoming eventgits. It supports offline use, is installable as a mobile or desktop app, and provides powerful filtering and data visualization features.

## Core Features

-   **Serverless Architecture**: Utilizes AWS Lambda functions for secure, scalable, and cost-effective handling of Google Calendar API authentication (OAuth2).
-   **Progressive Web App (PWA)**: Fully installable on desktop and mobile devices, with offline capabilities enabled by a service worker. Cached events are available without an internet connection.
-   **Data Visualization**: Interactive charts, built with Recharts, display the number of events per city and the distribution of event topics (e.g., React, JavaScript, Node).
-   **Dynamic Filtering**: Users can filter events by city and specify the number of events to display.
-   **Comprehensive Testing**: Developed with a TDD methodology, featuring high test coverage across unit (Jest), integration (React Testing Library), BDD (Jest-Cucumber), and end-to-end (Puppeteer) tests.

## Architecture

The project is split into two main parts:

1.  **Frontend (`/src`)**: A React application built with Vite. It is responsible for the UI, state management, and all client-side logic. It's a static site that can be hosted on services like GitHub Pages or Vercel.
2.  **Backend (`/auth-server`)**: A serverless backend built using the Serverless Framework. It consists of three AWS Lambda functions to handle the OAuth2 authentication flow with the Google Calendar API, keeping sensitive credentials off the client-side.

## Tech Stack

-   **Frontend**: React, Vite, Recharts, Workbox, NProgress
-   **Backend**: AWS Lambda, Serverless Framework
-   **API**: Google Calendar API (OAuth2)
-   **Testing**: Jest, React Testing Library, Jest-Cucumber, Puppeteer

## User Stories & Scenarios

The application was developed based on the following user stories and BDD scenarios.

### Feature 1: Filter Events By City
**As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.**

-   **Scenario 1:** When a user hasn’t searched for a specific city, show upcoming events from all cities.
    -   `Given` user hasn’t searched for any city
    -   `When` the user opens the app
    -   `Then` the user should see a list of upcoming events.
-   **Scenario 2:** A user should see a list of suggestions when they search for a city.
    -   `Given` the main page is open
    -   `When` a user starts typing in the city textbox
    -   `Then` the user should receive a list of cities (suggestions) that match what they’ve typed.
-   **Scenario 3:** A user can select a city from the suggested list.
    -   `Given` user was typing “Berlin” in the city textbox AND the list of suggested cities is showing
    -   `When` the user selects a city (e.g., “Berlin, Germany”) from the list
    -   `Then` their city should be changed to that city AND the user should receive a list of upcoming events in that city.

### Feature 2: Show/Hide Event Details
**As a user, I should be able to show or hide details for an event so that I can control how much information I see at a glance.**

-   **Scenario 1:** A user can show event details.
    -   `Given` a list of upcoming events is displayed
    -   `When` the user clicks on “Show Details” for a specific event
    -   `Then` the detailed information for that event should be displayed.
-   **Scenario 2:** A user can hide event details.
    -   `Given` event details are currently visible for a specific event
    -   `When` the user clicks on “Hide Details”
    -   `Then` the detailed information for that event should be hidden.

### Feature 3: Specify Number of Events
**As a user, I should be able to choose how many events are displayed so that I can manage how much content appears on my screen.**

-   **Scenario 1:** User can set the number of events to display.
    -   `Given` the user is on the main event list page
    -   `When` the user enters a number (e.g., 5) in the "Number of events" input field
    -   `Then` only that number of events should be displayed.
-   **Scenario 2:** The default number of events is shown when the user hasn’t specified.
    -   `Given` the user hasn’t entered any number in the "Number of events" input
    -   `When` the app loads
    -   `Then` a default number of events (32) should be displayed.

### Feature 4: Use the App When Offline
**As a user, I should be able to use the app without an internet connection so that I can view event information even when I'm offline.**

-   **Scenario 1:** A user can access previously viewed events while offline.
    -   `Given` the user has previously loaded events while online
    -   `When` the user goes offline
    -   `Then` the app should display the most recently cached list of events.
-   **Scenario 2:** The user is informed when offline and no data is available.
    -   `Given` the user has never loaded event data AND is offline
    -   `When` the app loads
    -   `Then` the user should see a message indicating that no data is available offline.

### Feature 5: Add an App Shortcut to the Home Screen
**As a user, I should be able to add a shortcut for the app to my home screen so that I can quickly access the app like a native application.**

-   **Scenario 1:** The user is prompted to add the app to the home screen.
-   **Scenario 2:** A user adds the app to the home screen, and a shortcut icon appears.

### Feature 6: Display Charts Visualizing Event Data
**As a user, I should be able to see charts that visualize event data so that I can easily understand trends and insights at a glance.**

-   **Scenario 1:** A user sees a chart showing event distribution by genre.
-   **Scenario 2:** A user sees a chart showing event distribution by city.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js and npm
-   An AWS account
-   [Serverless Framework](https://www.serverless.com/framework/docs/getting-started) installed and configured with your AWS credentials.
-   A Google Cloud Platform account to create API credentials.

### 1. Clone the Repository

```bash
git clone https://github.com/lambicjaune/meet.git
cd meet
```

### 2. Set Up the Backend (`auth-server`)

The serverless backend handles the OAuth2 flow to securely obtain an access token from Google.

1.  Navigate to the `auth-server` directory:
    ```bash
    cd auth-server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `config.json` file in the `auth-server` directory and add your Google API credentials. You can obtain these from the [Google Cloud Console](https://console.cloud.google.com/). Ensure you have enabled the Google Calendar API.
    ```json
    {
      "CLIENT_ID": "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
      "CLIENT_SECRET": "YOUR_GOOGLE_CLIENT_SECRET",
      "CALENDAR_ID": "YOUR_GOOGLE_CALENDAR_ID@group.calendar.google.com"
    }
    ```
4.  In the Google Cloud Console, add your frontend's URL (e.g., `http://localhost:5173`) to the "Authorized JavaScript origins" and "Authorized redirect URIs" for your OAuth 2.0 Client ID.
5.  Deploy the serverless functions to your AWS account:
    ```bash
    sls deploy
    ```
6.  After deployment, the Serverless Framework will output your API endpoints. Note these down.

### 3. Set Up the Frontend

1.  Navigate back to the root project directory and install the frontend dependencies:
    ```bash
    cd ..
    npm install
    ```
2.  Update the API endpoint URLs in `src/api.js` to match the endpoints from your `sls deploy` output. Look for the `fetch` calls to `https://fpet8zsw47.execute-api.eu-central-1.amazonaws.com` and replace the base URL.

### 4. Run the Application

-   **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

-   **Run tests:**
    ```bash
    npm run test