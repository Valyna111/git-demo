const { Builder, By, until } = require('selenium-webdriver');
const handleTestResult = require('./handleTestResult');

async function TestCaseSearch() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://flowwow.by/minsk/glasses/');
        const filterBrandInput = "бокала";

        await driver.sleep(2000);

        await driver.findElement(By.xpath(`//*[@id="grid"]/header/div/header/div[2]/div/div[1]/div[1]`)).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath('/html/body/div/div/div/div[3]/div/div/div/section/div[3]/div/div[1]/div/div[1]/div[2]/div/div/div/div[2]/a[3]')).click();

        await driver.findElement(By.xpath('/html/body/div/div/div/div[3]/div/div/div/section/div[3]/div/div[2]/div[2]/div[1]/div[2]/div/div/div/div[2]/a[2]')).click();

        await driver.wait(until.urlContains("https://flowwow.by/minsk/glasses/"), 10000);

        await driver.sleep(2000);

        const itemBodyTest = await driver.findElement(By.xpath('/html/body/div/div/div/section/div/div/div[5]/div[2]/div[2]/div/div[1]/div/article[2]/a/div/div[2]/div[1]')).getText();
       
        
        const resultTest = itemBodyTest.includes(filterBrandInput);

        handleTestResult(resultTest, "Posuda filtered successfully.", "Failed to filter phone.");
        
    } finally {
        await driver.quit();
    }
}
TestCaseSearch();