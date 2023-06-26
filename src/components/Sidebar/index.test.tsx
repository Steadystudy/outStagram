import { render } from '@testing-library/react';
import Sidebar from '.';

describe('Sidebar', () => {
  it('이름, 유저네임 정상적으로 렌더링', () => {
    const user = {
      id: '',
      name: 'eman',
      username: 'Steadystudy',
      email: '',
    };
    const result = render(<Sidebar user={user} />);
    const h3 = document.getElementsByTagName('h3');

    expect(h3[0].innerHTML).toEqual('Steadystudy');
    expect(result.getByText('eman')).toBeInTheDocument();
    expect(result.getByText('@Copyright OUTSTAGRAM from METAL')).toBeInTheDocument();
  });
});
