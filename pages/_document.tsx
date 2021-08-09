import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
}

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="MMO/MO(FF14,PSO2,PSO2 NGS, 原神)などのゲームユーザに向けた、コミュニケーションサポートサイトです。一緒に遊びたい、チームを作りたい、など目的別に掲示板に書き込み、検索することができます。" />
          <meta name="robots" content="noindex"/>

          <meta property="og:locale" content="ja_JP"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="GamersHub"/>
          <meta property="og:description" content="MMO/MO(FF14,PSO2,PSO2 NGS, 原神)などのゲームユーザに向けた、コミュニケーションサポートサイトです。一緒に遊びたい、チームを作りたい、など目的別に掲示板に書き込み、検索することができます。"/>
          <meta property="og:url" content="https://gamershub.chalkboard.me/"/>
          <meta property="og:site_name" content="GamersHub"/>
          <meta property="og:image" content="https://tkym-chalkboard.s3.ap-northeast-1.amazonaws.com/wp-content/uploads/2020/08/24012617/blue_header-min.png"/>
          <meta property="og:image:width" content="1242"/>
          <meta property="og:image:height" content="630"/>

          <link rel="apple-touch-icon" type="image/png" href="/apple-touch-icon-180x180.png"/>
          <link rel="icon" type="image/png" href="/icon-192x192.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap" rel="stylesheet"/>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument