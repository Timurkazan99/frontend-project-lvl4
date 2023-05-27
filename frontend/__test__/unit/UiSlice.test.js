import {
  reducer, onShow, onHide, toChat, toList,
} from '../../src/store/reducers/UiSlice.js';

const trueShow = { show: true, activeTab: 'list' };
const falseShow = { show: false, activeTab: 'list' };
const activeTabChat = { show: false, activeTab: 'chat' };
const activeTabList = { show: false, activeTab: 'list' };

jest.unmock('react-redux');

const showCases = [
  {
    name: 'show false/true', func: onShow, state: falseShow, expected: trueShow,
  },
  {
    name: 'show true/true', func: onShow, state: trueShow, expected: trueShow,
  },
  {
    name: 'show empty', func: onShow, state: undefined, expected: trueShow,
  },
  {
    name: 'hide true/false', func: onHide, state: trueShow, expected: falseShow,
  },
  {
    name: 'hide false/false', func: onHide, state: falseShow, expected: falseShow,
  },
  {
    name: 'hide empty', func: onHide, state: undefined, expected: falseShow,
  },
  {
    name: 'toChat list/chat', func: toChat, state: activeTabList, expected: activeTabChat,
  },
  {
    name: 'toChat chat/chat', func: toChat, state: activeTabChat, expected: activeTabChat,
  },
  {
    name: 'toChat empty', func: toChat, state: undefined, expected: activeTabChat,
  },
  {
    name: 'toList chat/list', func: toList, state: activeTabChat, expected: activeTabList,
  },
  {
    name: 'toList list/list', func: toList, state: activeTabList, expected: activeTabList,
  },
  {
    name: 'toList empty', func: toList, state: undefined, expected: activeTabList,
  },
];

describe('UI slice', () => {
  it.each(showCases)('$name', ({ func, state, expected }) => {
    expect(reducer(state, func)).toEqual(expected);
  });
});
