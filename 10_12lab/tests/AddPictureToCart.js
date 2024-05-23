import HomePage from '../pages/Homepage.js';
import CatalogPage from '../pages/CatalogPage.js';
import Logger from '../core/logger.js';
import BrowserManager from '../core/browserManager.js';
import CartPage from '../pages/CartPage.js';

async function AddPictureToCart() {
    const driver = await BrowserManager.getDriver();
    try {
        const homePage = new HomePage(driver);
        const catalogPage = new CatalogPage(driver);
        const cartPage = new CartPage(driver);
        const address = "Минск, ул. Свердлова, 13A";
        
        await homePage.open();
        await homePage.goToCatalogPictures();

        const productToCart = await catalogPage.addToCart(address);

        const isProductFound = await cartPage.isItemAdd(productToCart);
        if (isProductFound) {
            Logger.log(`${productToCart} добавлен в корзину`);
        } else {
            Logger.error(`Не удалось добавить в корзину ${productToCart}`);
        }
        
    } catch (error) {
        Logger.error(`Ошибка: ${error.message}`);
    } finally {
        // await driver.quit();
    }
}

AddPictureToCart();
