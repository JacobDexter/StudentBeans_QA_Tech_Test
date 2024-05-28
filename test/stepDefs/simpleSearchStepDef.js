const { Given, When, Then } = require("@cucumber/cucumber");
const SimpleSearchPageObject = require("../pageObjects/simpleSearchPageObject");
const simpleSearchPageObject = new SimpleSearchPageObject();

Given("I am on the studentbeans homepage", async () => {
  await simpleSearchPageObject.goToHomePage();
  await simpleSearchPageObject.verifyHomePage();
});

When("I open the search bar", async () => {
  await simpleSearchPageObject.openSearchBar();
});

When("I enter {string}", async (searchValue) => {
  await simpleSearchPageObject.inputSearchValue(searchValue);
});

Then(
  "I should select the 4th {string} search listing",
  async (expectedResult) => {
    await simpleSearchPageObject.selectSearchItem(4, expectedResult);
  }
);
