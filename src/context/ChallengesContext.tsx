import { createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction, useContext } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

interface IChallengeProps {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesContextData {
  level: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  activeChallenge: IChallengeProps; 
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface IChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as IChallengesContextData);

export function ChallengesProviders({ children, ...rest }: IChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, challengesCompleted])

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Pomodoro Challenge', {
        body: `Descanse por 5 segundos ou faça uma atividade!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{
      level, 
      challengesCompleted,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      completeChallenge,
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}

