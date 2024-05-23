import HomePage from '../pages/Homepage.js';
import CatalogPage from '../pages/CatalogPage.js';
import Logger from '../core/logger.js';
import BrowserManager from '../core/browserManager.js';

async function SearchByFilter() {
    const driver = await BrowserManager.getDriver();
    try {
        const homePage = new HomePage(driver);
        const catalogPage = new CatalogPage(driver);
        const filterBrandInput = "бокала";
        
        await homePage.open();
        await homePage.goToCatalog();

        const isProductFound = await catalogPage.isProductFind(filterBrandInput);
        if (isProductFound) {
            Logger.log(`Посуда отфильтрована корректно`);
        } else {
            Logger.error(`Не корректно отфильтрована посуда`);
        }
        
    } catch (error) {
        Logger.error(`Ошибка: ${error.message}`);
    } finally {
        await driver.quit();
    }
}

SearchByFilter();
