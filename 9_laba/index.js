const { Builder, By, until } = require('selenium-webdriver');
const { Select } = require('selenium-webdriver');

async function createNewPaste() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Открыть https://pastebin.com
        await driver.get('https://pastebin.com');

        // Заполнение полей
        const code = "Hello from WebDriver";
        const pasteExpiration = "10 Minutes";
        const pasteNameTitle = "helloweb";

        // Ввод данных
        await driver.findElement(By.id('postform-text')).sendKeys(code);
        await driver.findElement(By.id('postform-name')).sendKeys(pasteNameTitle);


        // Создание нового паста
        await driver.findElement(By.className('btn -big')).click();

        // Ждем, пока страница загрузится
        await driver.wait(until.titleContains(pasteNameTitle), 10000);

        // Получаем текст созданного паста и сравниваем с ожидаемым
        
        const pasteText = await driver.findElement(By.className('de1')).getText();
        console.log(pasteText);
        console.log(code);
        if (pasteText === code) {
            console.log("Paste created successfully.");
        } else {
            console.log("Failed to create paste.");
        }

    } finally {
        // Закрыть браузер после завершения
        await driver.quit();
    }
}
createNewPaste();