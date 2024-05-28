const { expect } = require("chai");

class ParentPageObject {
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
}

module.exports = ParentPageObject;
