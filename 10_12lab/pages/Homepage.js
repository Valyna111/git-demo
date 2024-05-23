import { By } from 'selenium-webdriver';
import Logger from '../core/logger.js';

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://flowwow.by/';
        this.catalog = By.xpath('//*[@id="grid"]/header/div/header/div[2]/div/div[1]/div[1]');
        this.categoryToClick = By.xpath('//*[@id="grid"]/div[3]/div/div/div/section/div[3]/div/div[1]/div/div[1]/div[2]/div/div/div/div[2]/a[3]');
        this.categoryPictures = By.xpath('//*[@id="grid"]/div[3]/div/div/div/section/div[3]/div/div[1]/div/div[1]/div[2]/div/div/div/div[2]/a[5]');
        this.searchInput = By.xpath(`/html/body/div/div/div/header/div/header/div[1]/div[2]/div[1]/div[2]/div/div[2]/input`);
        this.findSearch = By.className(`shop-name`);
    }

    async open() {
        Logger.log(`Открывается страница: ${this.url}`);
        await this.driver.get(this.url);
        Logger.log(`Страница ${this.url} успешно загружена.`);
    }

    async goToCatalog() {
        Logger.log(`Переход к каталогу...`);
        await this.driver.sleep(2000);
        await this.driver.findElement(this.catalog).click();
        Logger.log(`Каталог открыт.`);
        await this.driver.sleep(2000);
        Logger.log(`Переход к выбору категории...`);
        await this.driver.findElement(this.categoryToClick).click();
        Logger.log(`Категория выбрана.`);
    }

    async goToCatalogPictures() {
        Logger.log(`Переход к каталогу с изображениями...`);
        await this.driver.sleep(2000);
        await this.driver.findElement(this.catalog).click();
        Logger.log(`Каталог с изображениями открыт.`);
        await this.driver.sleep(2000);
        Logger.log(`Переход к выбору категории с изображениями...`);
        await this.driver.findElement(this.categoryPictures).click();
        Logger.log(`Категория с изображениями выбрана.`);
    }
    
    async searchMarket(marketName) {
        Logger.log(`Поиск магазина "${marketName}"...`);
        const searchInput = await this.driver.findElement(this.searchInput);
        await searchInput.click();
        Logger.log(`Ввод символов поиска...`);
        for (const char of marketName) {
            await searchInput.sendKeys(char);
            Logger.log(`Введен символ: ${char}`);
            await this.driver.sleep(100);
        }
        Logger.log('Ввод поиска завершен');
        await this.driver.sleep(2000);
    }
    
    async isMarketFind(marketName) {
        const searchOnShop = await this.driver.findElement(this.findSearch).getText();
        return searchOnShop.trim().toLowerCase() === marketName.trim().toLowerCase();
    }
}

export default HomePage;
