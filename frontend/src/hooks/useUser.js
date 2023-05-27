/* eslint-disable functional/no-this-expression */
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
/* eslint-enable functional/no-this-expression */

export default useUser;
