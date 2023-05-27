import isHandleableError from '../../src/utils/handleErrorStatus.js';

const mapCases = [
  {
    name: 'Успешная числа',
    status: 200,
    code: 200,
    expected: true,
  },
  {
    name: 'Успешная строки',
    status: '200',
    code: '200',
    expected: true,
  },
  {
    name: 'Не успешная числа',
    status: 200,
    code: 300,
    expected: false,
  },
  {
    name: 'Не успешная строки',
    status: '200',
    code: '300',
    expected: false,
  },
  {
    name: 'Разные типы',
    status: '200',
    code: 200,
    expected: false,
  },
];

describe('Проверка кодов', () => {
  it.each(mapCases)('$name', ({ status, code, expected }) => {
    expect(isHandleableError(status, code)).toBe(expected);
  });
});
