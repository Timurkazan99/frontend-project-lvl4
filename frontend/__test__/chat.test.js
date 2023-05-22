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
    await expect(page).toMatchElement('button', { text: 'Создать канал', timeout: 2000 });
    await expect(page).toMatchElement('b', { text: '#general', timeout: 2000 });
    await expect(page).toMatchElement('span', { text: /\d+ сообщени./, timeout: 2000 });
    await expect(page).toMatchElement('input', { text: '', timeout: 2000 });
    await expect(page).toMatchElement('button', { text: 'Отправить', timeout: 2000 });
  });

  it('Send message', async () => {
    await expect(page).toFill('input', 'message to general', { timeout: 2000 });
    await expect(page).toClick('button[type="submit"]');
    await expect(page).toMatchTextContent('message to general', { timeout: 2000 });
    await expect(page).toClick('button', { text: '# random' });
    await expect(page).not.toMatchTextContent('message to general', { timeout: 2000 });
    await expect(page).toFill('input', 'message to random', { timeout: 2000 });
    await expect(page).toClick('button[type="submit"]');
    await expect(page).toMatchTextContent('message to random', { timeout: 2000 });
    await expect(page).toClick('button', { text: '# general' });
    await expect(page).not.toMatchTextContent('message to random', { timeout: 2000 });
    await expect(page).toMatchTextContent('message to general', { timeout: 2000 });
  });

  it('Send message with badwords', async () => {
    await expect(page).toFill('input', 'собшение: блять', { timeout: 2000 });
    await expect(page).toClick('button[type="submit"]');
    await expect(page).toMatchTextContent('собшение: *****', { timeout: 2000 });
    await expect(page).not.toMatchTextContent('собшение: блять', { timeout: 2000 });
  });

  it('Add Channel', async () => {
    await expect(page).toClick('button', { text: 'Создать канал' });
    await expect(page).toMatchTextContent('Создать канал', { timeout: 2000 });
    await expect(page).toFill('#channelName', 'chanel1', { timeout: 2000 });
    await page.waitForTimeout(2000);
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('# chanel1', { timeout: 2000 });
  });

  it('Add exist Channel', async () => {
    await expect(page).toClick('button', { text: 'Создать канал' });
    await expect(page).toMatchTextContent('Создать канал', { timeout: 2000 });
    await expect(page).toFill('#channelName', 'general', { timeout: 2000 });
    await page.waitForTimeout(2000);
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('Имя канала уже используется', { timeout: 2000 });
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
    await expect(page).toClick('a', { text: 'Переименовать' });
    await expect(page).toFill('#channelName', 'Edited', { timeout: 2000 });
    await page.waitForTimeout(2000);
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('# Edited', { timeout: 2000 });
    await expect(page).not.toMatchTextContent('# forEdit', { timeout: 2000 });
    await page.waitForTimeout(1000);
  });

  it('Edit to exist Channel', async () => {
    await expect(page).toClick('button', { text: 'Управление каналом forAbort' });
    await expect(page).toClick('a', { text: 'Переименовать' });
    await expect(page).toFill('#channelName', 'general', { timeout: 2000 });
    await page.waitForTimeout(2000);
    await expect(page).toClick('.modal-body button', { text: 'Отправить' });
    await expect(page).toMatchTextContent('Имя канала уже используется', { timeout: 2000 });
    await expect(page).toClick('button', { text: 'Отменить' });
    await page.waitForTimeout(1000);
  });

  it('Delete Channel', async () => {
    await expect(page).toClick('button', { text: 'Управление каналом forDelete' });
    await expect(page).toClick('a', { text: 'Удалить' });
    await expect(page).toMatchTextContent('Удалить канал', { timeout: 2000 });
    await expect(page).toMatchTextContent('Вы уверены?', { timeout: 2000 });
    await expect(page).toClick('button', { text: 'Удалить' });
    await expect(page).not.toMatchTextContent('# forDelete', { timeout: 2000 });
    await page.waitForTimeout(1000);
  });
});
/* eslint-enable no-undef */
