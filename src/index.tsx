import * as ReactDom from 'react-dom/client';
import './config/configureMobX.ts';
import Root from 'components/Root';

const root = document.getElementById('root') as HTMLElement;

ReactDom.createRoot(root).render(<Root />);

if (module.hot) {
  module.hot.accept();
}
