/* eslint-disable no-undef */
describe('Auth', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:5000');
  });

  it('Has elements Login', async () => {
    await expect(page).toMatchElement('h2', { text: 'Авторизация' });
    await expect(page).toMatchElement('input#username', { text: '' });
    await expect(page).toMatchElement('input#password', { text: '' });
    await expect(page).toMatchElement('button', { text: 'Войти' });
    await expect(page).toMatchElement('span', { text: 'Нет аккаунта?' });
    await expect(page).toMatchElement('a', { text: 'Регистрация' });
  });

  it('Link work', async () => {
    await expect(page).toClick('a', { text: 'Регистрация' });
    await expect(page).toClick('a', { text: 'Авторизуйтесь' });
  });

  it('Empty login', async () => {
    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Поле должно быть заполнено');
  });

  it('Wrong login', async () => {
    await expect(page).toFillForm('form', {
      username: 'James',
      password: 'Bond',
    });
    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Неверные имя пользователя или пароль');
  });

  it('Success login', async () => {
    await expect(page).toFillForm('form', {
      username: 'admin',
      password: 'admin',
    });
    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Ваш ник: admin');
  });

  it('Lazy login', async () => {
    await page.reload();
    await expect(page).toMatchTextContent('Ваш ник: admin');
  });

  it('Success logout', async () => {
    await expect(page).toClick('button', { text: 'Выйти' });
    await expect(page).toMatchTextContent('Авторизация');
  });
});

describe('Registration', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:5000/signup');
  });

  it('Has element Signup', async () => {
    await expect(page).toMatchElement('h2', { text: 'Регистрация' });
    await expect(page).toMatchElement('input#username', { text: '' });
    await expect(page).toMatchElement('input#password', { text: '' });
    await expect(page).toMatchElement('input#passwordConfirmation', { text: '' });
    await expect(page).toMatchElement('button', { text: 'Зарегистрироваться' });
    await expect(page).toMatchElement('span', { text: 'Есть аккаунт?' });
    await expect(page).toMatchElement('a', { text: 'Авторизуйтесь' });
  });

  it('Empty Signup', async () => {
    await expect(page).toClick('button', { text: 'Зарегистрироваться' });
    await expect(page).toMatchTextContent('Поле должно быть заполнено');
  });

  it('Min username', async () => {
    await expect(page).toFill('input#username', 'a');
    await expect(page).toMatchTextContent('От 3 до 20 символов');
  });

  it('Max username', async () => {
    await expect(page).toFill('input#username', 'abcdefghijklmnopqrstu');
    await expect(page).toMatchTextContent('От 3 до 20 символов');
  });

  it('Valid username', async () => {
    await expect(page).toFill('input#username', 'abc');
    await expect(page).not.toMatchTextContent('От 3 до 20 символов');

    await expect(page).toFill('input#username', 'abcdefghijklmnopqrst');
    await expect(page).not.toMatchTextContent('От 3 до 20 символов');
  });

  it('Min password', async () => {
    await expect(page).toFill('input#password', 'abcde');
    await expect(page).toMatchTextContent('Не менее 6 символов');
  });

  it('Valid password', async () => {
    await expect(page).toFill('input#password', 'abcdef');
    await expect(page).not.toMatchTextContent('Не менее 6 символов');
  });

  it('Not valid password confirmation', async () => {
    await expect(page).toFill('input#passwordConfirmation', 'abc');
    await expect(page).toMatchTextContent('Пароли должны совпадать');
  });

  it('Valid password confirmation', async () => {
    await expect(page).toFill('input#passwordConfirmation', 'abcdef');
    await expect(page).not.toMatchTextContent('Пароли должны совпадать');
  });

  it('Success Signup', async () => {
    await expect(page).toFillForm('form', {
      username: 'Login',
      password: '123456',
      passwordConfirmation: '123456',
    });

    await expect(page).toClick('button', { text: 'Зарегистрироваться' });
    await expect(page).toMatchTextContent('Ваш ник: Login');
  });

  it('Login after signup', async () => {
    await expect(page).toClick('button', { text: 'Выйти' });
    await expect(page).toFillForm('form', {
      username: 'Login',
      password: '123456',
    });

    await expect(page).toClick('button', { text: 'Войти' });
    await expect(page).toMatchTextContent('Ваш ник: Login');
  });
});
/* eslint-enable no-undef */
