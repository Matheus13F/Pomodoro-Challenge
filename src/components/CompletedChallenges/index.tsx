import { useContext } from 'react';
import { ChallengesContext } from '../../context/ChallengesContext';
import styles from './CompletedChallenges.module.css';

export default function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Ciclos de Pomodoro concluídos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}