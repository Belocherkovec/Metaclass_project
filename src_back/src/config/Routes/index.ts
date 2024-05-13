export { default } from './Routes';

export const routerUrls = {
  root: '/',
  product: {
    mask: `/products`,
    create: (id: number) => `/products/${id}`,
  },
};
