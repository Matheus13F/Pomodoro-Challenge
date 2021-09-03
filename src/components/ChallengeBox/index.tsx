import { useContext } from 'react';
import { ChallengesContext } from '../../context/ChallengesContext';
import { CountdownContext } from '../../context/CountdownContext';
import styles from './ChallengeBox.module.css';

export default function ChallengeBox() {
    const {
        activeChallenge,
        resetChallenge,
        completeChallenge 
    } = useContext(ChallengesContext);

    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded() {
        completeChallenge();
        resetChallenge();
        resetCountdown();
    }

    function handleChallengeFailed() {
        resetChallenge();
        resetCountdown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Descanse 5 segundos</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="imagem"/>
                        <strong>Nova atividade!</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>

                        <button 
                            type="button"
                            className={styles.challengeSucceedButton}
                            onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>

            ) : (
                <div className={styles.challengeNotActive}>
                    <strong> Inicie um ciclo de pomodoro para receber atividades! </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="levep-up" />
                        A cada ciclo uma nova atividade para melhorar sua saúde!
                    </p>
                </div>
            )}
        </div>
    )
}