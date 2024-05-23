import { Builder } from 'selenium-webdriver';

class BrowserManager {
  static async getDriver() {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    return driver;
  }
}

export default BrowserManager;
