# Team-5-Web-Services-Engineering
Team 5's Git Repository for Web Services Engineering

[Jira Board](https://teamfivewebservices.atlassian.net/jira/software/projects/T5WSE/boards/1)

**Frontend Language:** HTML, CSS, JavaScript with React

**Backend Languages:** Django & Python

## Sprint 2 (03/17/2023 - 04/05/2023)

![Sprint 2 Burndown Diagram](/Documentation/Diagrams/Team5_Sprint2_Burndown_Chart.png)

### Goals & Objectives
- [x] Finish Constructing UI Prototypes
- [x] Finishing Construct React UI for Pages
- [x] Finish Leftover Login Items from the Previous Sprint
- [x] Create Basic User-to-User Interaction in the Backend
- [x] Implement CI/CD Service
- [x] Create Foundation and Outline for Research Paper
- [ ] Create at least 1 BDD Test Scenario that passes
- [x] Create at least 10 unit tests that pass

### Sprint Forecast
**Forecasted Point Completion:** 36 Points

>The point schema will follow a 1:1 ratio such that 1 point is equivalent to 1 day of development effort and so forth. Any stories above 5 total points would be broken down into smaller more subsequent stories. Based off of our work on the previous sprint, we believe that 36 points are all that are necessary to complete our goals for this sprint. While this represents a large effort, much of the groundwork for this sprint's tickets is already present and we expect that the tickets can be completed much quicker than they are pointed. However, we chose to keep our evaluation of each story's effort objective which is why the estimation remains at a higher value. Furthermore, based on Yesterday's Weather Forecast (Considering the availability of members, average points completed per sprint, and number of Sprints), we have determined that an aggressive forecast close to, but slightly higher than, the previous 23.5 points completed will, be more accurate.

**Points Completed:** --- Points

## Sprint 1 (02/02/2023 - 03/16/2023)

![Sprint 1 Burndown Diagram](/Documentation/Diagrams/Team5_Sprint1_BurndownGraph.JPG)

### Goals & Objectives
- [x] Conduct Sprint Planning, Forecasting, & Burndown Chart
- [x] Create Figma Prototype for Application
- [x] Create Basic Backend Functionality for Application
- [x] Create Basic Frontend Functionality
- [x] Create Basic Testing Scenarios
- [x] Create Interaction between Backend and Frontend
- [x] Create at least 1 BDD Test Scenario that passes
- [x] Create at least 10 unit tests that pass

### Sprint Forecast
**Forecasted Point Completion:** 33.5 Points

>(02/06/2023) The point schema will follow a 1:1 ratio such that 1 point is equivalent to 1 day of development effort and so forth. Any stories above 5 total points would be broken down into smaller more subsequent stories. We believe that 33.5 points will be necessary to complete the basic frontend, backend, and login authentication services.

**Points Completed:** 23.5 Points

>(03/15/2023) While our development did not reach the 35.5 point total, we have still achieved our goals of creating a basic frontend and backend service as well as login authentication. We have also established the groundwork for other functionalities and pages within the application. We believe that our point totals did not match our original estimate as some stories were removed from the sprint due to redundancy, being out-of-scope, or unnecessary for the final product. For example, during the sprint, a total of 15 points were removed for being out-of-scope or unnecessary. Of these 15 points, 5 points were introduced during the sprint causing scope unnecessary scope creep during the project. Furthermore, our burndown chart (found in the documentation folder) saw a significant decrease in the last day of the sprint as at least 5-7 tickets were in code review for a week or longer (until reviewed and finalized on the last day).

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
npm run prepare-environment
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
* **Note:** If you need to access the backend admin interface, you can do so by first creating a superuser account by running the following command in the root directory of the project and following the prompts.
```bash
npm run create-superuser
```
* Then, navigate to [http://localhost:8000/admin](http://localhost:8000/admin) and login with the credentials you created to access the admin interface.

### Running only the frontend or backend
If you only want to run the frontend or backend, you can do so by running one of the following commands in the root directory of the project:
```bash
npm run start-frontend
npm run start-backend
```

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
