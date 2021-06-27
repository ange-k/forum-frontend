import styles from '../styles/Common.module.scss'
export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo} >GamersHub</h1>
            </div>
        </header>
    )
}