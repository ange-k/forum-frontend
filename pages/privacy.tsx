import { InferGetServerSidePropsType } from "next"
import styles from '../styles/Help.module.scss'

export const getStaticProps = async () => {
    return {
        props: {
        },
    }
}

export default function PrivacyPolicy({}:InferGetServerSidePropsType<typeof getStaticProps>) {

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <h2>プライバシーポリシー</h2>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.item}>
                    <h3>個人情報の収集</h3>
                    <p>当サイトにおいて、個人情報の収集を行うことはありません。</p>
                    <p>ただし、サイトの利用に際して、IPアドレスを始めとした情報を蓄積しています。</p>
                </div>

                <div className={styles.item}>
                    <h3>第三者提供について</h3>
                    <p>IPアドレス等のアクセス情報は、捜査機関等以外に提供することはありません。</p>
                </div>
            </div>
        </div>
    )
}