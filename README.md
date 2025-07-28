# Meet App 🎉

**Meet** is a **serverless**, **progressive web application (PWA)** built with **React**, using a **test-driven development (TDD)** approach. The app uses the **Google Calendar API** to fetch and display upcoming eventgits. It supports offline use, is installable as a mobile or desktop app, and provides powerful filtering and data visualization features.

---

## ✅ Who

The users of Meet App include:

- Anybody planning for meetups or looking to get our and join events in the city of their choice, or simply willing to keep up with what is happening around them.

---

## ✅ What

A **PWA** that runs offline and has no traditional server, instead using **serverless functions** (AWS Lambda). The app is developed with **TDD**, offering high test coverage and robust functionality.

---

## ✅ When

Use Meet App anytime to:

- Search for upcoming events by city.
- Track or explore events using charts and visualizations.

---

## ✅ Where

- **Frontend:** Hosted on [GitHub Pages](https://pages.github.com/)
- **Backend:** Serverless functions (AWS Lambda) for authentication.
- **Device Compatibility:** Fully responsive on desktops, tablets, and mobile devices.
- **Browser Support:** Chrome, Firefox, Safari, Edge, Opera, and IE11.

---

## ✅ Why

- **Serverless** = Scalable + cost-effective backend.
- **PWA** = Offline-ready + installable + app-like experience.
- **TDD** = High code quality, reliability, and test coverage.
- **Data visualization** = Better insights for users and a strong portfolio piece.
- These skills together represent modern, high-demand web development practices.

---

## 🎯 Features

- 🔍 **Filter events by city**
- 📋 **Specify number of events to display**
- 🔐 **OAuth2 authentication with Google Calendar API**
- 📅 **Show/hide event details**
- 📊 **Visualize event distribution and genres using charts**
- 📶 **Offline support** with service workers
- 📲 **Installable** on mobile and desktop
- 🧪 **Test-driven development** (TDD) with 90%+ test coverage
- 🔔 **Alert system** built with an OOP approach

---

## 🛠 Technical Requirements

- ✅ React-based frontend
- ✅ Built with TDD using Jest and React Testing Library
- ✅ Google Calendar API with OAuth2
- ✅ Serverless functions via AWS Lambda for authentication
- ✅ GitHub-hosted source code
- ✅ Compatible with all modern browsers and IE11
- ✅ Fully responsive design (from 320px to 1920px)
- ✅ Lighthouse PWA compliant
- ✅ Offline-ready via service worker
- ✅ Installable as a native-like app
- ✅ OOP-based alert messaging system
- ✅ Data visualization with libraries like Recharts or D3.js
- ✅ 90%+ test coverage
- ✅ Performance monitored with online tools like Google Lighthouse or New Relic

---

## 🚀 Getting Started

1. **Clone the repo**  
   ```bash
   git clone https://github.com/yourusername/meet-app.git
   cd meet-app

---------------------


### USER STORIES 

# Feature 1: Filter Events By City

As a user,
I should be able to filter events by city
So that I can see a list of events taking place in that city.

# Feature 2: Show/Hide Event Details

As a user,
I should be able to show or hide details for an event
So that I can control how much information I see at a glance

# Feature 3: Specify Number of Events

As a user,
I should be able to choose how many events are displayed
So that I can manage how much content appears on my screen

# Feature 4: Use the App When Offline

As a user,
I should be able to use the app without an internet connection
So that I can view event information even when I'm offline

# Feature 5: Add an App Shortcut to the Home Screen

As a user,
I should be able to add a shortcut for the app to my home screen
So that I can quickly access the app like a native application

# Feature 6: Display Charts Visualizing Event Details

As a user,
I should be able to see charts that visualize event data
So that I can easily understand trends and insights at a glance


*** Scenarios (in Gherkin‘s syntax) : ***


*Feature 1 :Filter events by city*

# Scenario 1 When user hasn’t searched for a specific city, show upcoming events from all cities. 
Given user hasn’t searched for any city; 
When the user opens the app; 
Then the user should see a list of upcoming events. 

# Scenario 2 User should see a list of suggestions when they search for a city. 
Given the main page is open; 
When user starts typing in the city textbox; 
Then the user should receive a list of cities (suggestions) that match what they’ve typed. 

# Scenario 3 User can select a city from the suggested list. 
Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing; 
When the user selects a city (e.g., “Berlin, Germany”) from the list; 
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

*Feature 2: Show/Hide Event Details*

# Scenario 1 - User can show event details.
Given a list of upcoming events is displayed;
When the user clicks on “Show Details” for a specific event;
Then the detailed information for that event should be displayed.

# Scenario 2 - User can hide event details.
Given event details are currently visible for a specific event;
When the user clicks on “Hide Details”;
Then the detailed information for that event should be hidden.

*Feature 3: Specify Number of Events*

# Scenario 1 - User can set the number of events to display.
Given the user is on the main event list page;
When the user enters a number (e.g., 5) in the "Number of events"
 input field;
Then only that number of events (e.g., 5) should be displayed.

# Scenario 2 - Default number of events is shown when user hasn’t specified.
Given the user hasn’t entered any number in the "Number of events" input;
When the app loads;
Then a default number of events (e.g., 32) should be displayed.

*Feature 4: Use the App When Offline*

# Scenario 1 - User can access previously viewed events while offline.
Given the user has previously loaded events while online;
When the user goes offline;
Then the app should display the most recently cached list of events.

# Scenario 2 - User is informed when offline and no data is available.
Given the user has never loaded event data AND is offline;
When the app loads;
Then the user should see a message indicating that no data is available offline.

*Feature 5: Add an App Shortcut to the Home Screen*

# Scenario 1 - User is prompted to add the app to the home screen.
Given the user is using a supported mobile browser;
When the app detects that it can be installed;
Then the user should see a prompt to add the app to their home screen.

# Scenario 2 - User adds the app to the home screen.
Given the install prompt is visible;
When the user accepts the prompt to add the app;
Then a shortcut icon should appear on the device's home screen.

*Feature 6: Display Charts Visualizing Event Details*

# Scenario 1 - User sees a chart showing event distribution by genre.
Given the user is on the event overview page;
When the page loads;
Then a chart should display the number of events per genre.

# Scenario 2 - User sees a chart showing the popularity of events.
Given the user is viewing event data;
When the chart section is rendered;
Then it should display a visualization of the event popularity (e.g., number of attendees).
