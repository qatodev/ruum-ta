import { Selector, t } from 'testcafe'
import LoginPage from '../../page-objects/pages/LoginPage'

const loginPage = new LoginPage()

class Base {
    constructor() {

    }
    async useCredentials(username,password) {
        await t
            .typeText(loginPage.userEmail, username, {paste: true, replace: true})
            .click(loginPage.nextButton)
            .typeText(loginPage.password, password, {paste: true, replace: true})
    }
    async logIn() {
        const username = 'victorasul+01@gmail.com'
        const password = '1234qwer'
        this.useCredentials(username,password)
        await t.click(loginPage.loginFormButton)
        await t.resizeWindow(1024, 768)

    }

}

export default Base