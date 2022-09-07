# slbtesttask

To run all the scenarios use command:

BASE_URL=https://mr-fedorof.github.io npx playwright test --headed

Where BASE_URL - env you want to test the scenarios

Defined in 'playwright.config.ts':
baseURL: process.env.BASE_URL