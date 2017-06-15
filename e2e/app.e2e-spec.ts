import { PoetryBuddyPage } from './app.po';
import { element, by, browser } from "protractor";


describe('poetic App', () => {
  let page: PoetryBuddyPage;

  beforeEach(() => {
    page = new PoetryBuddyPage();
  });

  it('should display a header saying Poetry Buddy', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Poetry Buddy');
  });

  it('should alert the user when no rhyme suggestions are found', () => {
    page.navigateTo();
    let firstLineInput = element.all(by.css("input")).first();
    firstLineInput.sendKeys("Thefirstlineendsindog");
    browser.driver.sleep(4000);

    expect(element(by.id('no-rhymes-found')).isPresent()).toBe(true);
  });

  it('should fetch and display a list of rhyme options when a word is typed on the first line', () => {
    page.navigateTo();
    let firstLineInput = element.all(by.css("input")).first();
    firstLineInput.sendKeys("The first line ends in dog");
    browser.driver.sleep(4000);

    expect(element(by.id('rhymes-found')).isPresent()).toBe(true);
    
    let listItemCollection = element.all(by.css("#rhyme-list li"));
    expect(listItemCollection.count()).toBeGreaterThan(3);
  });


});
