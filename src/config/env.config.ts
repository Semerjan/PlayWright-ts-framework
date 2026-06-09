import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  // UI
  baseUrl: process.env.BASE_URL ?? 'https://www.saucedemo.com',

  // SauceDemo users
  users: {
    standard: {
      username: process.env.SAUCE_STANDARD_USER ?? 'standard_user',
      password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
    },
    locked: {
      username: process.env.SAUCE_LOCKED_USER ?? 'locked_out_user',
      password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
    },
    problem: {
      username: process.env.SAUCE_PROBLEM_USER ?? 'problem_user',
      password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
    },
  },

  // API
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://reqres.in',
} as const;
