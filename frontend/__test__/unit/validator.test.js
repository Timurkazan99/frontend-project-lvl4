import { ChannelSchema, LoginSchema, SignupSchema } from '../../src/utils/validator';

const init = 'general';
const mapSuits = [
  {
    name: 'Валидатор авторизация',
    cases: [
      {
        name: 'Валидная',
        values: { username: 'name', password: '1234567' },
        isError: false,
      },
      {
        name: 'Не валидная',
        values: { username: {}, password: {} },
        isError: true,
        error: 'must be a `string`',
      },
      {
        name: 'Пустая',
        values: { username: '', password: '' },
        isError: true,
        error: 'required',
      },
      {
        name: 'Без значений',
        values: {},
        isError: true,
        error: 'required',
      },
    ],
    schema: LoginSchema,
  },
  {
    name: 'Валидатор каналов',
    cases: [
      {
        name: 'Валидная',
        values: { channelName: 'topics' },
        isError: false,
      },
      {
        name: 'Не валидная',
        values: { channelName: {} },
        isError: true,
        error: 'must be a `string`',
      },
      {
        name: 'Существующая',
        values: { channelName: init },
        isError: true,
        error: 'alreadyExist',
      },
      {
        name: 'Пустая',
        values: { channelName: '' },
        isError: true,
        error: 'required',
      },
      {
        name: 'Без значений',
        values: {},
        isError: true,
        error: 'required',
      },
    ],
    schema: ChannelSchema([init]),
  },
  {
    name: 'Валидатор регистрация',
    cases: [
      {
        name: 'Валидная',
        values: { username: 'user', password: 'password', passwordConfirmation: 'password' },
        isError: false,
      },
      {
        name: 'Не валидная',
        values: { username: {}, password: {}, passwordConfirmation: {} },
        isError: true,
        error: 'must be a `string`',
      },
      {
        name: 'Имя меньше 3',
        values: { username: 'ян', password: '123456', passwordConfirmation: '123456' },
        isError: true,
        error: 'lengthUsername',
      },
      {
        name: 'Имя больше 20',
        values: { username: 'Здесь_больше_двадцати', password: '123456', passwordConfirmation: '123456' },
        isError: true,
        error: 'lengthUsername',
      },
      {
        name: 'Пароль меньше 6',
        values: { username: 'Нормальное', password: '12345', passwordConfirmation: '12345' },
        isError: true,
        error: 'minPassword',
      },
      {
        name: 'Разные пароли',
        values: { username: 'Нормальное', password: '12345', passwordConfirmation: '54231' },
        isError: true,
        error: 'samePassword',
      },
      {
        name: 'Пустая',
        values: { username: '', password: '', passwordConfirmation: '' },
        isError: true,
        error: 'required',
      },
      {
        name: 'Без значений',
        values: {},
        isError: true,
        error: 'required',
      },
    ],
    schema: SignupSchema,
  },
];

const generateTests = (cases, schema) => {
  it.each(cases)('$name', ({ values, isError, error }) => {
    const validate = () => schema.validateSync(values);
    expect(schema.isValidSync(values)).toBe(!isError);
    if (isError) {
      expect(validate).toThrow(error);
    } else {
      expect(validate).not.toThrow();
    }
  });
};

describe.each(mapSuits)('$name', ({ cases, schema }) => {
  generateTests(cases, schema);
});
