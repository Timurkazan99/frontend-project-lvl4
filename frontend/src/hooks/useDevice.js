const useDevice = () => ({
  isMobile: false,
  setIsMobile(newValue) {
    this.isMobile = newValue;
  },
});

export default useDevice;
