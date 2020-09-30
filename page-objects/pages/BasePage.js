import { Selector, t } from 'testcafe'

// Home Page elements from https://open.ruumapp.com/home/
// Navbar is in a separate class - navbarAuth.js
class BasePage {
    constructor() {
        this.tabRuum = Selector('#projects')
        this.taskList = Selector('#tasks')
        this.approvals = Selector('#approvals')
    }

    async authenticateUser() {
        const username = 'victorasul+01@gmail.com'
        const password = '1234qwer'
        await t.expect(loginPage.userEmail.exists).ok()
        loginPage.loginWith(username,password)
        await t.expect(tasksPage.taskList.exists).ok()
        await t.resizeWindow(1024, 768)
        await t.click(tasksPage.taskList)
    }
}

export default BasePage