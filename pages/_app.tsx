import '../styles/globals.css'

import type { AppProps } from 'next/app'
import HeaderComponent from '../components/header'

import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <HeaderComponent />
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
