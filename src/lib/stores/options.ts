import { persistent } from './persistent';

export const options = persistent('display-options', {
  bgColor: '#FFFFFF',
  bgColorEnabled: false,
  textColor: '#000000',
  fontSize: 1.2,
  autoClose: true,
});
