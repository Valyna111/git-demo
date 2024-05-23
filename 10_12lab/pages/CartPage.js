import { By, until } from 'selenium-webdriver';
import Logger from '../core/logger.js';

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://flowwow.by/shop/masterskaya27/?from=cart%2F';
        this.itemInCart = By.xpath('//*[@id="js-cart-products"]/div/div[2]/div[1]');
        this.buttonDeleteItemFromCart = By.xpath('/html/body/div[9]/div/div[2]/div/div[2]/div/div/div[4]/div[3]/div/div[2]/div[2]/div[1]/span[1]');
    }

    async open() {
        Logger.log(`Открывается страница корзины: ${this.url}`);
        await this.driver.get(this.url);
        Logger.log(`Страница корзины ${this.url} успешно загружена.`);
    }

    async deleteFromCart()
    {
        Logger.log(`Удаление товара из корзины...`);
        await this.driver.sleep(2000);
        await this.driver.findElement(this.buttonDeleteItemFromCart).click()
        Logger.log(`Товар успешно удален из корзины.`);
    }

    async isItemAdd(addedItem) {
        await this.driver.wait(until.urlContains(this.url), 10000);
        const cartItem = await this.driver.findElement(this.itemInCart).getText();
        return cartItem.trim().toLowerCase() === addedItem.trim().toLowerCase();
    }
}

export default CartPage;
