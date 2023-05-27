import useDevice from '../../src/hooks/useDevice.js';

describe('хук useDevice', () => {
  it('Проверка полей', () => {
    const { isMobile, setIsMobile } = useDevice();
    expect(isMobile).toBe(false);
    expect(setIsMobile).toBeInstanceOf(Function);
  });

  it('Изменение isMobile', () => {
    const device = useDevice();

    expect(device.isMobile).toBe(false);
    device.setIsMobile(true);
    expect(device.isMobile).toBe(true);
    device.setIsMobile(false);
    expect(device.isMobile).toBe(false);
  });
});
