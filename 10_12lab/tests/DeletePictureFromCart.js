import HomePage from '../pages/Homepage.js';
import CatalogPage from '../pages/CatalogPage.js';
import Logger from '../core/logger.js';
import BrowserManager from '../core/browserManager.js';
import CartPage from '../pages/CartPage.js';

async function DeletePictureFromCart() {
    const driver = await BrowserManager.getDriver();
    try {
        const homePage = new HomePage(driver);
        const catalogPage = new CatalogPage(driver);
        const cartPage = new CartPage(driver);
        const address = "Минск, ул. Свердлова, 13A";
        
        await homePage.open();
        await homePage.goToCatalogPictures();

        const productToCart = await catalogPage.addToCart(address);
        await cartPage.deleteFromCart();
        const isProductFound = await cartPage.isItemAdd(productToCart);
        if (isProductFound) {
            Logger.log(`${productToCart} успешно удалён из корзины`);
        } else {
            Logger.error(`Не удалось удалить из корзины ${productToCart}`);
        }
        
    } catch (error) {
        Logger.error(`Ошибка: ${error.message}`);
    } finally {
        // await driver.quit();
    }
}

DeletePictureFromCart();
