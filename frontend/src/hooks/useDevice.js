/* eslint-disable functional/no-this-expression */
const useDevice = () => ({
  isMobile: false,
  setIsMobile(newValue) {
    this.isMobile = newValue;
  },
});
/* eslint-enable functional/no-this-expression */

export default useDevice;
