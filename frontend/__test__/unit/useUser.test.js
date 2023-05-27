import useUser from '../../src/hooks/useUser.js';

describe('Хук useUser', () => {
  it('Проверка полей', () => {
    const user = useUser();
    expect(user.name).toBe('');
    expect(user.isAuth).toBe(false);
    expect(user.setName).toBeInstanceOf(Function);
    expect(user.setIsAuth).toBeInstanceOf(Function);
  });

  it('Изменение имени', () => {
    const user = useUser();
    expect(user.name).toBe('');
    user.setName('Петя');
    expect(user.name).toBe('Петя');
    user.setName('Саша');
    expect(user.name).toBe('Саша');
  });

  it('Изменение авторизации', () => {
    const user = useUser();
    expect(user.isAuth).toBe(false);
    user.setIsAuth(true);
    expect(user.isAuth).toBe(true);
    user.setIsAuth(false);
    expect(user.isAuth).toBe(false);
  });
});
