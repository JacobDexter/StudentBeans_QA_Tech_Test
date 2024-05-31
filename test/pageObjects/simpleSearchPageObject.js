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
  get searchInput() {
    return $('input[data-testid="search-input"]');
  }
  get searchResults() {
    return $$(
      'div[data-testid="search_results_row"] a[data-testid="search-result-offer"]'
    );
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
    await browser.waitUntil(
      async () => {
        const results = await this.searchResults;
        return results.length >= index;
      },
      {
        timeout: 15000, // Increase timeout to handle slower response times
        timeoutMsg: "Expected number of search results to appear",
      }
    );

    const selectedItem = await this.searchResults[index - 1];
    const text = await selectedItem.getText();
    expect(text.toLowerCase()).to.include(expectedResult.toLowerCase()); // Ensure case-insensitivity
    await selectedItem.click();
  }
}

module.exports = SimpleSearchPageObject;
