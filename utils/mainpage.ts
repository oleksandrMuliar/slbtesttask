const base = require('@playwright/test')
const newTest = base.test.extend({
    login: async({page}, use) => {
        await login();
        await use(page); //runs test here
        //logic after test
    }
})
exports.newTest = newTest
exports.expect = newTest.expect