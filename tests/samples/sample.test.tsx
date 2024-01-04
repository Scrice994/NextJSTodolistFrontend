import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

function SampleComponent(){
    return(
        <div>This is an example</div>
    )
}

describe('SampleComponent', () => {
    it('renders an example', () => {
      render(<SampleComponent />)
   
      const sample = screen.getByText('This is an example');
   
      expect(sample).toBeInTheDocument()
    })
  })

