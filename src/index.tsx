import * as ReactDom from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from 'config/Routes';

const root = document.getElementById('root') as HTMLElement;

ReactDom.createRoot(root).render(<RouterProvider router={router} />);
