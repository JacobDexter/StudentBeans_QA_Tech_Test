const ParentPageObject = require("./parentPageObject");
const { expect, assert } = require("chai");

class SimpleSearchPageObject extends ParentPageObject {
  get acceptCookiesButton() {
    return $("button=Accept All Cookies");
  }
  get searchButton() {
    return $('button[data-testid="nav-search-desktop"]');
  }
  get searchModal() {
    return $('div[data-testid="modal-overlay"]');
  }
  get searchPromotedOffers() {
    return $("h3=Promoted Offers");
  }
  get searchInput() {
    return $('input[data-testid="search-input"]');
  }
  get searchResults() {
    return $$(
      'div[data-testid="search_results_row"] a[data-testid="search-result-offer"]'
    );
  }
  get railOfferTitle(){
    return $$('data-testid="offer-issuance-title"');
  }

  async verifyHomePage() {
    await this.acceptCookiesButton.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.equal("https://www.studentbeans.com/uk");
  }

  async openSearchBar() {
    await this.searchButton.click();
    await this.searchModal.waitForDisplayed();
    await this.isElementVisible(this.searchModal);
  }

  async inputSearchValue(searchValue) {
    await this.searchInput.setValue(searchValue);
    await browser.keys("Enter");
  }

  async selectSearchItem(index, expectedResult) {
  // Ensure search has worked
  await this.searchPromotedOffers.waitForExist({ reverse: true });

  // Get the specific search result element
  const selectedItem = await this.searchResults[index - 1];
  const text = await selectedItem.getText();
  
  // Ensure case-insensitivity
  expect(text.toLowerCase()).to.include(expectedResult.toLowerCase());
  
  // Click the selected item
  await selectedItem.click();
  }

  async verifyOfferPage() {
    // Verify the title of the page
    const actualTitle = await browser.getTitle();
    expect(actualTitle).to.include('Samsung 25% Student Discount');
  }
}

module.exports = SimpleSearchPageObject;
