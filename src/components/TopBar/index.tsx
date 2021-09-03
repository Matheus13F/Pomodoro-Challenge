import styles from './TopBar.module.css';

export default function TopBar() {

    return (
        <header className={styles.topBar}>
            <span>Pomodoro Challenge</span>
        </header>
    )
}