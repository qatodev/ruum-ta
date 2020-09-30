import {Selector } from 'testcafe'

class LoginPage {
    constructor() {
        this.userEmail = Selector('#user-email')
        this.nextButton = Selector('.btn-primary').withAttribute('data-test', 'ruum-auth-signin-button') // add an id attribute
        this.password = Selector('#user-passowrd')
        this.loginFormButton = Selector('button').withText('Log In') // add an id attribute
        this.messageEmailNotFound = Selector('.text-danger').withText('email address cannot be found')
        this.messageWrongPassword = Selector('.text-danger').withText('Password or email incorrect')
    }
}

export default LoginPage