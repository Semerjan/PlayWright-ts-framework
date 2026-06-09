// ─── SauceDemo Test Data ─────────────────────────────────────────────────────

export const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  tShirtRed: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;

export const CHECKOUT = {
  valid: {
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    zipCode: '12345',
  },
  missingZip: {
    firstName: 'Jane',
    lastName: 'Smith',
    zipCode: '',
  },
} as const;

// ─── ReqRes API Test Data ────────────────────────────────────────────────────

export const REQRES = {
  validUser: {
    id: 2,
    email: 'janet.weaver@reqres.in',
    firstName: 'Janet',
    lastName: 'Weaver',
  },
  newUser: {
    name: 'John Automation',
    job: 'QA Engineer',
  },
  updatedUser: {
    name: 'John Updated',
    job: 'Senior QA Engineer',
  },
  validLogin: {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  },
  invalidLogin: {
    email: 'nouser@unknown.com',
    password: 'wrongpassword',
  },
  validRegister: {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  },
  nonExistentUserId: 999,
} as const;
