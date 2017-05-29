import { PoeticPage } from './app.po';

describe('poetic App', () => {
  let page: PoeticPage;

  beforeEach(() => {
    page = new PoeticPage();
  });

  it('should display a header saying Poetry Buddy', () => {
    page.navigateTo();
    expect(page.getHeaderText()).toEqual('Poetry Buddy');
  });
});
