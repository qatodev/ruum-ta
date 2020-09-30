import { Selector } from 'testcafe'

// Landing Page elements from https://www.ruumapp.com/
// Navbar is in a separate class - navbarUnauth.js
class LandingPage {
    constructor() {
        this.loginButton = Selector('.login.w-button') // add an id attribute
    }
}

export default LandingPage