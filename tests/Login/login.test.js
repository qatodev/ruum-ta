import { Selector } from 'testcafe'
import LandingPage from '../../page-objects/pages/LandingPage'
import LoginPage from '../../page-objects/pages/LoginPage'
import BasePage from '../../page-objects/pages/BasePage'
import Base from '../../page-objects/components/base'

const landingPage = new LandingPage()
const loginPage = new LoginPage()
const basePage = new BasePage()
const base = new Base()

fixture `An existing user can login to Ruum`
    .page `https://www.ruumapp.com/`

test('User can login with correct credentials', async t => {
    const username = 'victorasul+01@gmail.com'
    const password = '1234qwer'

    await t
        .click(landingPage.loginButton)
        .expect(loginPage.userEmail.exists).ok()

    base.useCredentials(username,password)
    
    await t
        .click(loginPage.loginFormButton)
        .expect(basePage.tabRuum.exists).ok()
})

test('User cannot login with wrong email address', async t => {
    const username = 'wrong.email@gmail.com'
    const password = '1234qwer'

    await t
        .click(landingPage.loginButton)
        .expect(loginPage.userEmail.exists).ok()

        base.useCredentials(username,password)
    
        await t
            .click(loginPage.loginFormButton)
            .expect(loginPage.messageEmailNotFound.exists).ok
})

test('User cannot login with wrong password', async t => {
    const username = 'victorasul+01@gmail.com'
    const password = '1234qwerrrr'

    await t
        .click(landingPage.loginButton)
        .expect(loginPage.userEmail.exists).ok()

        base.useCredentials(username,password)
    
        await t
            .click(loginPage.loginFormButton)
            .expect(loginPage.messageWrongPassword.exists).ok
})