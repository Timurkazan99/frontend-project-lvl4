jest.setTimeout(50000);

const loginMatch = async (user, text) => {
  await expect(page).toFillForm('form', user, { timeout: 2000 });
  await expect(page).toClick('button', { text: 'Войти' });
  await expect(page).toMatchTextContent(text, { timeout: 2000 });
};

const fieldMatch = async (args) => {
  await expect(page).toFill(args.selector, args.value, { timeout: 2000 });
  if (args.valid) {
    await expect(page).not.toMatchTextContent(args.text, { timeout: 2000 });
  } else {
    await expect(page).toMatchTextContent(args.text, { timeout: 2000 });
  }
};

const clickMatch = async (button, text) => {
  await expect(page).toClick('button', { text: button });
  await expect(page).toMatchTextContent(text, { timeout: 2000 });
};

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
    await clickMatch('Войти', 'Поле должно быть заполнено');
  });

  it('Wrong login', async () => {
    await loginMatch({ username: 'James', password: 'Bond' }, 'Неверные имя пользователя или пароль');
  });

  it('Success login', async () => {
    await loginMatch({ username: 'admin', password: 'admin' }, 'Ваш ник: admin');
  });

  it('Lazy login', async () => {
    await page.reload();
    await expect(page).toMatchTextContent('Ваш ник: admin', { timeout: 2000 });
  });

  it('Success logout', async () => {
    await clickMatch('Выйти', 'Авторизация');
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
    await clickMatch('Зарегистрироваться', 'Поле должно быть заполнено');
  });

  it('Min username', async () => {
    await fieldMatch({
      selector: 'input#username',
      value: 'a',
      text: 'От 3 до 20 символов',
      valid: false,
    });
  });

  it('Max username', async () => {
    await fieldMatch({
      selector: 'input#username',
      value: 'abcdefghijklmnopqrstu',
      text: 'От 3 до 20 символов',
      valid: false,
    });
  });

  it('Valid username', async () => {
    const common = {
      selector: 'input#username',
      text: 'От 3 до 20 символов',
      valid: true,
    };
    await fieldMatch({ ...common, value: 'abc' });
    await fieldMatch({ ...common, value: 'abcdefghijklmnopqrst' });
  });

  it('Min password', async () => {
    await fieldMatch({
      selector: 'input#password',
      value: 'abcde',
      text: 'Не менее 6 символов',
      valid: false,
    });
  });

  it('Valid password', async () => {
    await fieldMatch({
      selector: 'input#password',
      value: 'abcdef',
      text: 'Не менее 6 символов',
      valid: true,
    });
  });

  it('Not valid password confirmation', async () => {
    await fieldMatch({
      selector: 'input#passwordConfirmation',
      value: 'abc',
      text: 'Пароли должны совпадать',
      valid: false,
    });
  });

  it('Valid password confirmation', async () => {
    await fieldMatch({
      selector: 'input#passwordConfirmation',
      value: 'abcdef',
      text: 'Пароли должны совпадать',
      valid: true,
    });
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
