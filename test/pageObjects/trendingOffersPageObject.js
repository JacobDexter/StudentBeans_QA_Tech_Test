const ParentPageObject = require("./parentPageObject");

class TrendingOffersPageObject extends ParentPageObject {
  get navigationButton() {
    return $('a[data-testid="nav-category-trending-now"]');
  }
  get trendingOffers() {
    return $$('div[data-testid="grid"] article');
  }

  async clickEyebrowButton() {
    await this.navigationButton.click();
  }

  async selectTrendingOffer(index) {
    // wait for trending offers list modal to appear
    await this.trendingOffers[index - 1].waitForExist({
      timeout: 15000,
      timeoutMsg: "Expected trending offers list to appear!",
    });
    await this.trendingOffers[index - 1].click();
  }

  async verifyOfferPage() {
    // verify the page is correct
    const currentUrl = await browser.getUrl();
    expect(
      currentUrl.includes("studentbeans.com/student-discount/uk/")
    ).to.equal(true);
  }
}

module.exports = TrendingOffersPageObject;
