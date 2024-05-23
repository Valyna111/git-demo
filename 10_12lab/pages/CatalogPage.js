import { By, until } from 'selenium-webdriver';
import Logger from '../core/logger.js';

class CatalogPage {
    constructor(driver) {
        this.driver = driver;
        this.urlCrockery = 'https://flowwow.by/minsk/crockery/';
        this.urlArtCollections = 'https://flowwow.by/minsk/art-collections/';
        this.itemToClick = By.xpath('/html/body/div/div/div/div[3]/div/div/div/section/div[3]/div/div/div/div[1]/div[2]/div/div/div/div[2]/a[3]');
        this.resultItemText = By.xpath('/html/body/div/div/div/section/div/div/div[5]/div[2]/div[2]/div/div[1]/div/article[1]/a/div/div[2]/div[1]');
        this.item = By.xpath('//*[@id="grid"]/section/div/div/div[5]/div[2]/div[2]/div/div[1]/div/article[1]/a/div');
        this.addToCardButton = By.xpath('//*[@id="ProductDetailModal"]/div/div/div/div/div/div/div[1]/div[2]/div[3]/div/div[2]/div[1]/button');
        this.inputAddressItem = By.xpath('//*[@id="AddressModal"]/div/div/div/div[2]/div[1]/div[2]/div[1]/div[1]/div[2]/input');
        this.buttonAddressItem = By.xpath('//*[@id="AddressModal"]/div/div/div/div[2]/div[1]/div[2]/div[2]/div/button');
        this.listAddressItem = By.xpath('//*[@id="AddressModal"]/div/div/div/div[2]/div[1]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div[2]/div/div/div/ul/li[1]');
        this.modalItemTitle = By.xpath('//*[@id="ProductDetailModal"]/div/div/div/div/div/div/div[1]/div[2]/div[1]/div[1]/div/h1');
    }

    async open() {
        Logger.log(`Открывается страница каталога: ${this.url}`);
        await this.driver.get(this.url);
        Logger.log(`Страница каталога ${this.url} успешно загружена.`);
    }

    async getResultItemText() {
        return await this.driver.findElement(this.resultItemText).getText();
    }

    async addToCart(address) {
        Logger.log(`Добавление товара в корзину...`);
        await this.driver.wait(until.urlContains(this.urlArtCollections), 10000);
        await this.driver.sleep(2000);
        await this.driver.findElement(this.item).click();
        await this.driver.wait(until.urlContains("https://flowwow.by/art-collections/holst-akril-vecher-avgusta/"), 10000);
        await this.driver.sleep(2000);
        const productTitle = await this.driver.findElement(this.modalItemTitle).getText();
        await this.driver.findElement(this.addToCardButton).click();
        await this.driver.sleep(2000);
        const addressInput = await this.driver.findElement(this.inputAddressItem);
        await addressInput.click();
        for (const char of address) {
            await addressInput.sendKeys(char);
            await this.driver.sleep(100);
        }
        await this.driver.sleep(2000);
        const listAddressItem = await this.driver.findElement(this.listAddressItem);
        await listAddressItem.click();
        await this.driver.sleep(1000);
        const buttonAddressItem = await this.driver.findElement(this.buttonAddressItem);
        await buttonAddressItem.click();
        Logger.log(`Товар "${productTitle}" успешно добавлен в корзину.`);
        return productTitle;
    }

    async isProductFind(productName) {
        await this.driver.wait(until.urlContains(this.urlCrockery), 10000);
        await this.driver.sleep(3000);
        const searchOnShop = await this.driver.findElement(this.resultItemText).getText();
        Logger.log(searchOnShop);
        return searchOnShop.includes(productName);
    }
}

export default CatalogPage;
