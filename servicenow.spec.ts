import {test, expect} from '@playwright/test'

test("Testcase for purchasing iPhone", async({page})=>{
    await page.goto("https://dev296651.service-now.com/navpage.do")
    await page.locator("#user_name").fill("admin") //entering user name
    await page.locator("#user_password").fill("E7i*7wNgX*mM")//entering password
    await page.locator("#sysverb_login").click()
    await page.waitForTimeout(5000)

    await page.locator("[class='sn-polaris-tab can-animate polaris-enabled']").first().click() //clicking on All option
    await page.waitForTimeout(3000)
    await page.locator("#filter").fill("Service Catalog") //entering Service catalog in filter section
    await page.waitForTimeout(3000)
    await page.getByText("Service Catalog").nth(1).click()//selecting service catalog
    await page.waitForTimeout(2000)

    await page.frameLocator("#gsft_main").locator("[aria-label='Mobiles. Cell phones to meet your business needs.']").click() //selecting mobile option under iframe
    await page.waitForTimeout(3000)

    await page.frameLocator("#gsft_main").locator("[class='service_catalog']").nth(2).click() //selecting iphone 13 pro
    await page.waitForTimeout(3000)

    const frame = page.frameLocator("#gsft_main")
    await frame.locator("//label[text()='Yes']").click() //selecting Yes option
    await frame.locator("//input[@class='cat_item_option sc-content-pad form-control']").fill("99") //entering mobile number
    await frame.locator("[class='form-control cat_item_option ']").selectOption({ index: 2 }) //selecting the Unlimited option from drop down
    await frame.locator("//label[text()='Sierra Blue']").click() //selecting 'Sierra Blue' option
    await frame.locator("//label[contains(text(),'512 GB')]").click() //selecting '512 GB
    await frame.locator("#oi_order_now_button").click() //clicking on order now

    const message=frame.locator("//span[@class='notification-icon icon-check-circle']")  //order status message
    await expect(message).toBeVisible()
    const messageContent=frame.locator("//span[@class='notification-icon icon-check-circle']").textContent()
    console.log("Confirmation message is: "+messageContent)
    await page.screenshot({path:'Test_Report/orderstatus.png',fullPage: true}) //take full page screenshot and stored it in Testreport

})