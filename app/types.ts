
import { NextPage } from 'next';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string; 
}




export interface PageProps<TData = unknown> {
  params: { slug: string };
  data?: TData;
}

export type NextPageWithLayout<P = Record<string, unknown>, TData = unknown> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => JSX.Element;
} & PageProps<TData>;

