import { render, screen } from '@testing-library/preact';
import Sidepanel from './Sidepanel';

describe('Sidepanel page', () => {
  xit('should render the sidepanel page', () => {
    render(<Sidepanel />);
    expect(screen.getByTestId('sidepanel_text').textContent).toEqual(
      'Sidepanel page'
    );
  });
});
