const useUser = () => ({
  name: '',
  isAuth: false,
  setName(newName) {
    localStorage.setItem('username', newName);
    this.name = newName;
  },
  setIsAuth(newIsAuth) {
    this.isAuth = newIsAuth;
  },
});

export default useUser;
