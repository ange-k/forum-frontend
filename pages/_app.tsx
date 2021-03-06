import '../styles/globals.css'

import type { AppProps } from 'next/app'
import HeaderComponent from '../components/header'

import Layout from '../components/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no"/>
      </Head>
      <HeaderComponent />
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
