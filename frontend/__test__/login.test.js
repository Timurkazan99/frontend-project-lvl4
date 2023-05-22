/* eslint-disable no-undef */
jest.setTimeout(50000);

describe('Auth', () => {
  beforeAll(async () => {
    await jestPuppeteer.resetBrowser();
    await page.goto('http://localhost:8081');
    await page.waitForSelector('#root');
  });

  it('Has elements Login', async () => {
    await expect(page).toMatchElement('h2', { text: 'Авторизация', timeout: 2000 });
    await expect(page).toMatchElement('input#username', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('input#password', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('button', { text: 'Войти', timeout: 2000 });
    await expect(page).toMatchElement('span', { text: 'Нет аккаунта?', timeout: 2000 });
    await expect(page).toMatchElement('a', { text: 'Регистрация', timeout: 2000 });
  });

  it('Link work', async () => {
    await expect(page).toClick('a', { text: 'Регистрация' });
    await expect(page).toClick('a', { text: 'Авторизуйтесь' });
  });

  it('Empty login', async () => {
    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Поле должно быть заполнено', { timeout: 2000 });
  });

  it('Wrong login', async () => {
    await expect(page).toFillForm('form', {
      username: 'James',
      password: 'Bond',
    }, { timeout: 2000 });
    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Неверные имя пользователя или пароль', { timeout: 2000 });
  });

  it('Success login', async () => {
    await expect(page).toFillForm('form', {
      username: 'admin',
      password: 'admin',
    }, { timeout: 2000 });
    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Ваш ник: admin', { timeout: 2000 });
  });

  it('Lazy login', async () => {
    await page.reload();
    await expect(page).toMatchTextContent('Ваш ник: admin', { timeout: 2000 });
  });

  it('Success logout', async () => {
    await expect(page).toClick('button', { text: 'Выйти' });
    await expect(page).toMatchTextContent('Авторизация', { timeout: 2000 });
  });
});

describe('Registration', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8081/signup');
  });

  it('Has element Signup', async () => {
    await expect(page).toMatchElement('h2', { text: 'Регистрация', timeout: 2000 });
    await expect(page).toMatchElement('input#username', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('input#password', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('input#passwordConfirmation', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('button', { text: 'Зарегистрироваться', timeout: 2000 });
    await expect(page).toMatchElement('span', { text: 'Есть аккаунт?', timeout: 2000 });
    await expect(page).toMatchElement('a', { text: 'Авторизуйтесь', timeout: 2000 });
  });

  it('Empty Signup', async () => {
    await expect(page).toClick('button', { text: 'Зарегистрироваться' });
    await expect(page).toMatchTextContent('Поле должно быть заполнено', { timeout: 2000 });
  });

  it('Min username', async () => {
    await expect(page).toFill('input#username', 'a', { timeout: 2000 });
    await expect(page).toMatchTextContent('От 3 до 20 символов', { timeout: 2000 });
  });

  it('Max username', async () => {
    await expect(page).toFill('input#username', 'abcdefghijklmnopqrstu', { timeout: 2000 });
    await expect(page).toMatchTextContent('От 3 до 20 символов', { timeout: 2000 });
  });

  it('Valid username', async () => {
    await expect(page).toFill('input#username', 'abc', { timeout: 2000 });
    await expect(page).not.toMatchTextContent('От 3 до 20 символов', { timeout: 2000 });

    await expect(page).toFill('input#username', 'abcdefghijklmnopqrst', { timeout: 2000 });
    await expect(page).not.toMatchTextContent('От 3 до 20 символов', { timeout: 2000 });
  });

  it('Min password', async () => {
    await expect(page).toFill('input#password', 'abcde', { timeout: 2000 });
    await expect(page).toMatchTextContent('Не менее 6 символов', { timeout: 2000 });
  });

  it('Valid password', async () => {
    await expect(page).toFill('input#password', 'abcdef', { timeout: 2000 });
    await expect(page).not.toMatchTextContent('Не менее 6 символов', { timeout: 2000 });
  });

  it('Not valid password confirmation', async () => {
    await expect(page).toFill('input#passwordConfirmation', 'abc', { timeout: 2000 });
    await expect(page).toMatchTextContent('Пароли должны совпадать', { timeout: 2000 });
  });

  it('Valid password confirmation', async () => {
    await expect(page).toFill('input#passwordConfirmation', 'abcdef', { timeout: 2000 });
    await expect(page).not.toMatchTextContent('Пароли должны совпадать', { timeout: 2000 });
  });

  it('Success Signup', async () => {
    await expect(page).toFillForm('form', {
      username: 'Login',
      password: '123456',
      passwordConfirmation: '123456',
    }, { timeout: 2000 });

    await expect(page).toClick('button', { text: 'Зарегистрироваться' });
    await expect(page).toMatchTextContent('Ваш ник: Login', { timeout: 2000 });
  });

  it('Login after signup', async () => {
    await expect(page).toClick('button', { text: 'Выйти' });
    await expect(page).toFillForm('form', {
      username: 'Login',
      password: '123456',
    }, { timeout: 2000 });

    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Ваш ник: Login', { timeout: 2000 });
  });
});
/* eslint-enable no-undef */
