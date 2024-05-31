const ParentPageObject = require("./parentPageObject");
const { expect } = require("chai");

class SimpleSearchPageObject extends ParentPageObject {
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
  get railOfferTitle() {
    return $$('data-testid="offer-issuance-title"');
  }

  async openSearchBar() {
    // Ensure the search modal is successfully opened
    await this.searchButton.click();
    await this.searchModal.waitForDisplayed();
    await this.isElementVisible(this.searchModal);
  }

  async inputSearchValue(searchValue) {
    // Input search prompt
    await this.searchInput.setValue(searchValue);
    await browser.keys("Enter");
  }

  async selectSearchItem(index, expectedResult) {
    try {
      // Ensure the promoted offers section of search is not visible
      await this.searchPromotedOffers.waitForExist({
        reverse: true,
        timeout: 15000,
      });

      // Ensure search results are loaded
      await browser.waitUntil(
        async () => {
          const results = await this.searchResults;
          return results.length >= index;
        },
        {
          timeout: 15000,
          timeoutMsg: "Expected number of search results to appear",
        }
      );

      // Calculate search result element index
      const selectedItem = this.searchResults[index - 1];

      if (!selectedItem) {
        throw new Error(`Search result at index ${index} not found`);
      }

      // Wait for the element to be interactable
      await selectedItem.waitForExist({
        timeout: 15000,
        timeoutMsg: "Expected search result to exist",
      });

      const text = await selectedItem.getText();

      // Compare item title with expected title
      expect(text.toLowerCase()).to.include(expectedResult.toLowerCase());

      // Click the selected item
      await selectedItem.click();
    } catch (error) {
      console.error(`Error selecting search item at index ${index}:`, error);
      throw error;
    }
  }

  async verifyOfferPage() {
    // Verify the title of the page
    const actualTitle = await browser.getTitle();
    expect(actualTitle).to.include("Samsung 25% Student Discount");
  }
}

module.exports = SimpleSearchPageObject;
