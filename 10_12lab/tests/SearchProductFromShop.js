import BrowserManager from '../core/browserManager.js';
import HomePage from '../pages/Homepage.js';
import Logger from '../core/logger.js';

async function testSearchProductFromShop() {
  const driver = await BrowserManager.getDriver();
  try {
    const homePage = new HomePage(driver);
    await driver.get('https://flowwow.by/');
    const marketName = 'BoTaNika';
    await homePage.searchMarket(marketName);
    const isProductFound = await homePage.isMarketFind(marketName);
    if (isProductFound) {
      Logger.log(`Магазин с таким названием ${marketName} найден.`);
    } else {
      Logger.error(`Магазин с таким названием ${marketName} не найден.`);
    }
  } catch (error) {
    Logger.error(`Ошибка: ${error.message}`);
  } finally {
    Logger.log("Успешно");
    await driver.quit();
  }
}

testSearchProductFromShop();
