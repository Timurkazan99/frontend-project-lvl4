/* eslint-disable no-undef */
jest.setTimeout(50000);

describe('Chat', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8081');
    await page.waitForSelector('#username');
    await page.type('#username', 'admin');
    await page.waitForSelector('#password');
    await page.type('#password', 'admin');
    await page.click('button');
  });

  it('Has elements Chat', async () => {
    await expect(page).toMatchElement('span', { text: 'Каналы', timeout: 2000 });
    await expect(page).toMatchElement('button', { text: 'Создать канал', timeout: 2000});
    await expect(page).toMatchElement('b', { text: '#general', timeout: 2000 });
    await expect(page).toMatchElement('span', { text: /\d+ сообщени./, timeout: 2000 });
    await expect(page).toMatchElement('input', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('button', { text: 'Отправить', timeout: 2000 });
  });

  it('Send message', async () => {
    await expect(page).toFill('input', 'message to general');
    await expect(page).toClick('button[type="submit"]');
    await expect(page).toMatchTextContent('message to general');
    await expect(page).toClick('button', { text: '# random' });
    await expect(page).not.toMatchTextContent('message to general');
    await expect(page).toFill('input', 'message to random');
    await expect(page).toClick('button[type="submit"]');
    await expect(page).toMatchTextContent('message to random');
    await expect(page).toClick('button', { text: '# general' });
    await expect(page).not.toMatchTextContent('message to random');
    await expect(page).toMatchTextContent('message to general');
  });

  it('Send message with badwords', async () => {
    await expect(page).toFill('input', 'собшение: блять');
    await expect(page).toClick('button[type="submit"]');
    await expect(page).toMatchTextContent('собшение: *****');
    await expect(page).not.toMatchTextContent('собшение: блять');
  });

  it('Add Channel', async () => {
    await expect(page).toClick('button', { text: 'Создать канал' });
    await expect(page).toMatchTextContent('Создать канал');
    await expect(page).toFill('#channelName', 'chanel1');
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('# chanel1', { timeout: 2000 });
  });

  it('Add exist Channel', async () => {
    await expect(page).toClick('button', { text: 'Создать канал' });
    await expect(page).toMatchTextContent('Создать канал');
    await expect(page).toFill('#channelName', 'general');
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('Имя канала уже используется');
    await expect(page).toClick('button', { text: 'Отменить' });
    await page.waitForTimeout(2000);
  });
});

describe('Edit Channel', () => {
  beforeAll(async () => {
    await page.waitForSelector('#addChanel');
    await page.click('#addChanel');
    await page.waitForSelector('#channelName');
    await page.type('#channelName', 'forEdit');
    await page.$eval('.modal-body button[type="submit"]', (element) => element.click());
    await page.waitForTimeout(2000);

    await page.waitForSelector('#addChanel');
    await page.click('#addChanel');
    await page.waitForSelector('#channelName');
    await page.type('#channelName', 'forAbort');
    await page.$eval('.modal-body button[type="submit"]', (element) => element.click());
    await page.waitForTimeout(2000);

    await page.waitForSelector('#addChanel');
    await page.click('#addChanel');
    await page.waitForSelector('#channelName');
    await page.type('#channelName', 'forDelete');
    await page.$eval('.modal-body button[type="submit"]', (element) => element.click());
    await page.waitForTimeout(2000);
  });

  it('Edit Channel', async () => {
    await expect(page).toClick('button', { text: 'Управление каналом forEdit' });
    await expect(page).toClick('a', { text: 'Переименовать', timeout: 2000 });
    await expect(page).toFill('#channelName', 'Edited');
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('# Edited');
    await expect(page).not.toMatchTextContent('# forEdit');
    await page.waitForTimeout(1000);
  });

  it('Edit to exist Channel', async () => {
    await expect(page).toClick('button', { text: 'Управление каналом forAbort' });
    await expect(page).toClick('a', { text: 'Переименовать' });
    await expect(page).toFill('#channelName', 'general');
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('Имя канала уже используется');
    await expect(page).toClick('button', { text: 'Отменить' });
    await page.waitForTimeout(1000);
  });

  it('Delete Channel', async () => {
    await expect(page).toClick('button', { text: 'Управление каналом forDelete' });
    await expect(page).toClick('a', { text: 'Удалить', timeout: 2000 });
    await expect(page).toMatchTextContent('Удалить канал');
    await expect(page).toMatchTextContent('Вы уверены?');
    await expect(page).toClick('button', { text: 'Удалить' });
    await expect(page).not.toMatchTextContent('# forDelete');
    await page.waitForTimeout(1000);
  });
});
/* eslint-enable no-undef */
