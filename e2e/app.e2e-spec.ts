import { PoeticPage } from './app.po';

describe('poetic App', () => {
  let page: PoeticPage;

  beforeEach(() => {
    page = new PoeticPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
