import * as ReactDom from 'react-dom/client';
import './config/configureMobX';
import Root from 'components/Root';

const root = document.getElementById('root') as HTMLElement;

ReactDom.createRoot(root).render(<Root />);
