const ru = {
  translation: {
    errorPage: {
      pageNotFound: 'Страница не найдена',
      mainPage: 'Перейти на главную страницу',
    },
    navBar: {
      logOut: 'Выйти',
    },
    auth: {
      // Errors
      required: 'Поле должно быть заполнено',
      badUser: 'Неверные имя пользователя или пароль',
      lengthUsername: 'От 3 до 20 символов',
      minPassword: 'Не менее 6 символов',
      samePassword: 'Пароли должны совпадать',
      signUpFailed: 'Пользователь с таким именем уже существует',

      // Fields
      username: 'Имя пользователя',
      loginUsername: 'Ваш ник',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',

      // Buttons
      logIn: 'Войти',
      signUp: 'Зарегистрироваться',

      // Titles
      authTitle: 'Авторизация',
      regTitle: 'Регистрация',

      // Footer
      notRegistered: 'Нет аккаунта?',
      registration: 'Регистрация',
      registered: 'Есть аккаунт?',
      authorization: 'Авторизуйтесь',

    },
    channels: {
      title: 'Каналы',
      control: 'Управление каналом',
      list: 'Список каналов',
      rename: 'Переименовать',
      remove: 'Удалить',
    },
    channelModal: {
      // Errors
      required: 'Поле должно быть заполнено',
      alreadyExist: 'Имя канала уже используется',

      // Buttons
      cancel: 'Отменить',
      accept: 'Отправить',
      removeButton: 'Удалить',

      removeBody: 'Вы уверены?',

      // Titles
      createTitle: 'Создать канал',
      renameTitle: 'Переименовать канал',
      deleteTitle: 'Удалить канал',

      // Placeholder
      fieldPlaceholder: 'Введите имя канала',
      fieldLabel: 'Имя канала',
    },
    messages: {
      label: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      addButton: 'Отправить',
      messages_one: '{{ count }} сообщение',
      messages_few: '{{ count }} сообщения',
      messages_many: '{{ count }} сообщений',
    },
    toastText: {
      sentencesStart: 'Канал',
      sentencesAddingEnd: 'создан',
      sentencesRenamingEnd: 'переименован',
      sentencesRemovingEnd: 'удалён',
      errorNetwork: 'Ошибка соединения',
      badWord: 'Не ругайся!',
    },
  },
};

export default ru;
