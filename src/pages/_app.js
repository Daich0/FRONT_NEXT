import '@/styles/globals.css'
import { ProductsProvider } from '@/context/productContext'
export default function App({ Component, pageProps }) {
  return <ProductsProvider><Component {...pageProps} /></ProductsProvider>
}
