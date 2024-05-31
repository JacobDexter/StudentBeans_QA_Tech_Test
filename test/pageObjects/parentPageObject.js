const { expect } = require("chai");

class ParentPageObject {
  get acceptCookiesButton() {
    return $("button=Accept All Cookies");
  }

  async isElementEqualToExpected(element, expectedText) {
    const actualText = await element.getText();
    expect(actualText, "Actual text does not match expected").to.equal(
      expectedText
    );
  }

  async isElementVisible(element) {
    const isVisible = await element.isDisplayed();
    expect(isVisible, "Element is not visible").to.be.true;
  }

  async goToHomePage() {
    await browser.url("");
  }

  async verifyHomePage() {
    await this.acceptCookiesButton.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.equal("https://www.studentbeans.com/uk");
  }
}

module.exports = ParentPageObject;
