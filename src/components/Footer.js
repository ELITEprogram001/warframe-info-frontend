import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
                <div className={styles.attributions}>
                    <h4 className={styles.header}>Attributions</h4>
                    <ul className={styles.attributionsList}>
                        <li>
                            <a href='https://github.com/WFCD' target='_blank' rel='noreferrer'>
                                Warframe Community Developers
                            </a>
                        </li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
        </footer>
    )
}