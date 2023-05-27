import { jest } from '@jest/globals';

global.jest = jest;

jest.spyOn(Storage.prototype, 'setItem');
Storage.prototype.setItem = jest.fn();

jest.spyOn(Storage.prototype, 'getItem');
Storage.prototype.getItem = jest.fn();

jest.spyOn(Storage.prototype, 'clear');
Storage.prototype.clear = jest.fn();

process.env.REACT_APP_HOST = 'https://localhost:5000';
process.env.REACT_APP_URI = '/imghp';
