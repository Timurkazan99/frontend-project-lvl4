import renderHook from '../helpers/renderHook.jsx';
import useCheckMobileScreen from '../../src/hooks/useCheckMobileScreen.js';

jest.unmock('react');

const mapCases = [
  {
    name: 'Экран больше 768px',
    width: 480,
    expected: true,
  },
  {
    name: 'Экран меньше 768px',
    width: 1280,
    expected: false,
  },
];

describe('хук useCheckMobileScreen', () => {
  it.each(mapCases)('$name', async ({ width, expected }) => {
    window.innerWidth = width;
    const { result } = await renderHook(useCheckMobileScreen);
    expect(result.current).toBe(expected);
  });
});
