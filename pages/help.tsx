import { InferGetServerSidePropsType } from "next"
import styles from '../styles/Help.module.scss'
import Image from 'next/image'
export const getStaticProps = async () => {
    return {
        props: {
            data: [
                {
                    title: "",
                    answer: ""
                }
            ]
        },
    }
}

export default function Help({data}:InferGetServerSidePropsType<typeof getStaticProps>) {

    return (
        <div className={styles.container}>
            <h2>このサイトについて</h2>
            <div className={styles.subContainer}>
                <p>このサイトはMMO/MOなど、不特定多数の相手とコミュニケーションをとれるゲームのサポートを目的につくられています。</p>
                <p>用途として、一緒に遊ぶ相手の募集やアイテム取引、ギルド/チームの創設など、目的に合わせた募集を行うことができます。</p>
            </div>
            <h3>要望・機能改善</h3>
            <div className={styles.subContainer}>
                <p>このサイトのリンク、「https://gamershub.chalkboard.me/」を含んだツイートをTwitterにて行ってください。</p>
            </div>
            <h3>利用方法：検索</h3>
            <div className={styles.subContainer}>
                <p>投稿を検索するには、<a href={'/'}>トップページ</a>より行うことができます。</p>
                <ul className={styles.table}>
                    <li className={styles.item}>
                        <Image
                            src={"/search.png"}
                            width={"50px"}
                            height={"50px"}
                            alt=""
                        />
                        投稿の検索を行うことができます。検索の条件を設定し、検索ウィンドウ上部のボタンで検索を実行します。
                    </li>
                    <li className={styles.item}>
                        <Image
                            src={"/write.png"}
                            width={"50px"}
                            height={"50px"}
                            alt=""
                        />
                        <a href={'/post'}>投稿ページ</a>へ移動します。
                    </li>
                    <li className={styles.item}>
                        <Image
                            src={"/delete.png"}
                            width={"50px"}
                            height={"50px"}
                            alt=""
                        />
                        投稿の削除を行います。削除するには、投稿時に削除キーを設定している必要があります。
                    </li>                    
                </ul>
            </div>

            <h3>利用方法：投稿</h3>
            <div className={styles.subContainer}>
                <p>投稿するには、<a href={'/post'}>投稿ページ</a>より行うことができます。</p>
                <p>投稿する各内容には文字数制限や必須項目があります。それらを満たしていない場合は投稿ボタンが押せません。</p>
                <ul className={styles.table}>
                    <li className={styles.item}>
                        <Image
                            src={"/post.png"}
                            width={"50px"}
                            height={"50px"}
                            alt=""
                        />
                        投稿に成功したとき、その履歴を最大5件まで保持しています。<br/>投稿した履歴を読み出して、投稿する情報に反映することができます。
                    </li>
                </ul>
            </div>

            <h3>注意事項-投稿について</h3>
            <div className={styles.subContainer}>
                <p>削除、投稿した情報が反映されるまで時間がかかります。</p>
                <p>直ぐに反映を確認したい場合、投稿してから1分待ち、トップページへアクセスしてください。</p>
                <p>その際、まだ更新されていなければトップページをリロードしてください。</p>
            </div>

            <h3>注意事項-投稿内容について</h3>
            <div className={styles.subContainer}>
                <p>不適切な投稿は管理権限により削除します。</p>
            </div>
        </div>
    )
}