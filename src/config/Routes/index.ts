export { default } from './Routes';

export const routerUrls = {
  root: '/',
  product: {
    mask: `/product`,
    create: (id: number) => `/product/${id}`,
  },
};
