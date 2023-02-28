const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "s7n9ys",
  // defaultCommandTimeout: 10000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    // Dictates the pattern that the test run in
    // NECCESSARY FOR THE COMPONENT TO LOAD FIRST BEFORE TESTING ELEMENTS INSIDE OF THE COMPONENT
    // specPattern:[
    //   "login-page.spec.cy.js",
    //   "login-page-input.cy.js"
    //   //...
    // ]
  },

  
});
