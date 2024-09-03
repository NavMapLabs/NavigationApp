import { render } from '@testing-library/react-native';

import Index from '@/app/index';

describe('\"Go to Login\ option"', () => {
  test('\"Go to Login\ option renders correctly on Index', () => {
    const { getByText } = render(<Index />);

    const textLabel = getByText('Go to Login');

    expect(textLabel).toBeTruthy();
  });
});
