Feature: Trending Now Offers

Scenario: As a user I want to find the 6th discount within the Trending Now offers list
  Given I am on the homepage
  When I click the 'Trending Now' option on the eyebrow
  Then I click the 6th trending offer
  And I am brought to the 6th trending offers page