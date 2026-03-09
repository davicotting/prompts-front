import { render, screen } from '@/lib/test-utils';

describe('First test suit', () => {
  it('should work', () => {
    render(<div>Test</div>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
