# Team-5-Web-Services-Engineering
Team 5's Git Repository for Web Services Engineering
[Jira Board](https://teamfivewebservices.atlassian.net/jira/software/projects/T5WSE/boards/1)

**Frontend Language:** HTML, CSS, JavaScript with React

**Backend Languages:** Django & Python

## Sprint 1 (02/02/2023 - 03/02/2023)

### Goals & Objectives
- [ ] Conduct Sprint Planning, Forecasting, & Burndown Chart
- [ ] Create Figma Prototype for Application
- [ ] Create Basic Backend Functionality for Application
- [ ] Create Basic Frontend Functionality
- [ ] Create Basic Testing Scenarios
- [ ] Create Interaction between Backend and Frontend
- [ ] Create at least 1 BDD Test Scenario that passes
- [ ] Create at least 10 unit tests that pass

### Sprint Forecast
**Forecasted Point Completion:** TBD
*Reasoning TBD (pending 02/06 sprint planning meeting)*

# Building and running the project
## Prerequisites
* [Python 3.8](https://www.python.org/downloads/) or higher
* [Node.js](https://nodejs.org/en/download/)
* Ensure both of these are added to your PATH
* Ensure that you have the latest version of pip installed
```bash
python -m pip install --upgrade pip
```

## Installation
1. Clone the repository
2. Install the dependencies
- While in the root directory of the project, run the following command
```bash
npm install && npm run prepare-environment
```
- This will install the dependencies required for the frontend, and install the dependencies required for the backend in a newly created virtual environment. It will also make the needed migrations to the database.
3. Run the project
- By default the project will run development servers on ports 3000 and 8000. So please ensure those ports are available.
- While in the root directory of the project, run the following command
```bash
npm start
```
- This will run the frontend and backend servers in development mode. The frontend will be available at [http://localhost:3000](http://localhost:3000) and the backend API interface will be available at [http://localhost:8000](http://localhost:8000).
- A browser window should open automatically and navigate to the frontend. If it does not, you can navigate to [http://localhost:3000](http://localhost:3000) manually.
- You can view the output of both the frontend and backend servers at once in the same terminal window where you ran the command thanks to the [concurrently](https://www.npmjs.com/package/concurrently) package.

# Running the tests
## Unit Tests
- While in the root directory of the project, run the following command to run the frontend unit tests
```bash
npm run unit-test-frontend
```
- Backend unit tests: TBD

## BDD Tests
- While in the root directory of the project, run the following command to run the frontend BDD tests
```bash
npm run e2e-test-frontend
```
- This will run the frontend BDD tests using [Cypress](https://www.cypress.io/). A window should open upon running this command that presents you with the option of running E2E or Component tests. Click on the E2E tests button. You will then be asked to choose a browser, select one of your choice.
- You'll then be brought to the Cypress test runner in your chosen browser. On the left-hand side of the screen you'll see a menu with options such as **Specs**, **Runs**, etc., click **Specs**.
- You'll then see a list of all the BDD tests that are available. Click on the test you want to run. The test will then run in the integrated browser window. You can view the various interactions the test performs and view the results of the tests in the log window to the left of the browser window.
