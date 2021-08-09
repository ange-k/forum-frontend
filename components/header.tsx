import styles from '../styles/Common.module.scss'
export default function Header() {
    return (
        <header className={styles.header}>
            <a href={'/'}> 
                <div className={styles.container}>
                    <h1 className={styles.logo} >GamersHub</h1>
                </div>
            </a>
            <div className={styles.information}>
                <a href={'/help'}>
                    <div>ヘルプ</div>
                </a>
                <a href={'/privacy'}>
                    <div>プライバシーポリシー</div>
                </a>
            </div>
        </header>
    )
}