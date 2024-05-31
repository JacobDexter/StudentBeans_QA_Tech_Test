const { Given, When, Then } = require("@cucumber/cucumber");
const TrendingOffersPageObject = require("../pageObjects/trendingOffersPageObject");

const trendingOffersPageObject = new TrendingOffersPageObject();

Given("I am on the homepage", async () => {
  await trendingOffersPageObject.goToHomePage();
  await trendingOffersPageObject.verifyHomePage();
});

When("I click the 'Trending Now' option on the eyebrow", async () => {
  await trendingOffersPageObject.clickEyebrowButton();
});

Then("I click the 6th trending offer", async () => {
  await trendingOffersPageObject.selectTrendingOffer(6);
});

Then("I am brought to the 6th trending offers page", async () => {
  await trendingOffersPageObject.verifyOfferPage();
});
