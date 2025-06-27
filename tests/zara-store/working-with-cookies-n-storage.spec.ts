import test from "@playwright/test"


test('get cookies', async ({page, context }) => {
    await page.goto('https://www.zara.com/ua/', {waitUntil: "commit"});

    const cookies = await context.cookies();
    console.log(cookies);
});

test('add cookies', async ({page, context}) => {
    await page.goto('https://www.zara.com/ua/', {waitUntil: "commit"});

    await context.addCookies([
  {
    name: 'psp-cookies',
    value: 'some value',
    domain: '.zara.com',
    path: '/',
    expires: 1751040670.851509,
    httpOnly: false,
    secure: false,
    sameSite: 'Lax'
  },
])
    const cookies = await context.cookies();
    console.log(cookies);
});

test('clear cookies', async ({page, context}) => {
    await page.goto('https://www.zara.com/ua/', {waitUntil: "commit"});

    await context.addCookies([
  {
    name: 'psp-cookies',
    value: 'some value',
    domain: '.zara.com',
    path: '/',
    expires: 1751040670.851509,
    httpOnly: false,
    secure: false,
    sameSite: 'Lax'
  },
])
    let cookies = await context.cookies();
    console.log(cookies);

    await context.clearCookies({name: "psp-cookies"});

    cookies = await context.cookies();
    console.log(cookies);
});

test('edit cookies', async ({page, context}) => {
    await page.goto('https://www.zara.com/ua/', {waitUntil: "commit"});

    await context.addCookies([
  {
    name: 'psp-cookies',
    value: 'some value',
    domain: '.zara.com',
    path: '/',
    expires: 1751040670.851509,
    httpOnly: false,
    secure: false,
    sameSite: 'Lax'
  },
])
    let cookies = await context.cookies(); // read cookies;
    const cookie = cookies.find((value) => value.name === "psp-cookies"); // find needed cookie in cookies. 
    //console.log(cookie);
    // Browser Cookies are stored as array of objects
    
    if (cookie) cookie.value = "updated some value"; // if cookie is not undefined, update its value
    await context.clearCookies({name: "psp-cookies"});
    if(cookie) await context.addCookies([cookie]);

    cookies = await context.cookies();
    console.log(cookies);
});
