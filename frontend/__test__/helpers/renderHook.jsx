import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const renderHook = async (hook, args = null) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const result = {};

  function TestComponent({ hookArgs }) {
    result.current = hookArgs ? hook(...hookArgs) : hook();
    return null;
  }

  const rerender = async (newArgs = args) => {
    await act(() => {
      render((<TestComponent hookArgs={newArgs} />), container);
    });
  };

  await rerender(args);
  return { result, rerender };
};

export default renderHook;
