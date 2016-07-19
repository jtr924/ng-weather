
/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function () {
  beforeEach(function () {
    browser.get('index.html');
  });

  it('should replace kennett square with forecast for that zip code', function () {

    var city1 = browser.findElement(by.className('city'));
    expect(city1.getText()).toEqual('Kennett Square');

    var input = element(by.model('zip'));
    input.clear();
    input.sendKeys('19801');
    expect(input.getAttribute('value')).toBe('19801');
    var submitzip = browser.findElement(by.id('submitzip'));
    submitzip.click();

    browser.waitForAngular();
    var city2 = browser.findElement(by.className('city'));
    expect(city2.getText()).toEqual('Wilmington');
    // browser.wait(3000);
  });

  it('refresh should reset to kennett square forecast', function () {
    browser.refresh();
    browser.waitForAngular();
    var city1 = browser.findElement(by.className('city'));
    expect(city1.getText()).toEqual('Kennett Square');

  });

  it('Invalid zip code should clear the forecast', function () {
    var input = element(by.model('zip'));
    input.clear();
    input.sendKeys('19');
    var submitzip = browser.findElement(by.id('submitzip'));
    submitzip.click();
    browser.waitForAngular();

    //display error
    var patternError = browser.findElement(by.className('error-pattern'));
    expect(patternError.getText()).toEqual('zip code should be at least 5 digits');

    //clear zip and check forecast
    var city2 = browser.findElement(by.className('city'));
    expect(city2.getText()).toEqual('');
  });

  it('display forcast when valid zipcode is submited', function () {
    var input = element(by.model('zip'));
    input.clear();
    var submitzip = browser.findElement(by.id('submitzip'));
    submitzip.click();
    browser.waitForAngular();

    //display error
    var requiredError = browser.findElement(by.className('error-required'));
    expect(requiredError.getText()).toEqual('zip code is required');
    //check for clearing the weather forecast
    var city2 = browser.findElement(by.className('city'));
    expect(city2.getText()).toEqual('');

    //valid zip code should display corresponding forecast
    var input1 = element(by.model('zip'));
    input1.clear();
    input1.sendKeys('19801');
    expect(input1.getAttribute('value')).toBe('19801');
    var submitzip1 = browser.findElement(by.id('submitzip'));
    submitzip1.click();

    browser.waitForAngular();
    var city3 = browser.findElement(by.className('city'));
    expect(city3.getText()).toEqual('Wilmington');

  });

  fit('title tag should be empty', function () {
    var bTitle = browser.getTitle();
    expect(bTitle.getText().toEqual(''));

  });

});
