import * as React from 'react';
import './StratagemHeroActivity.css';
import { StratagemInput } from './StratagemInput';
import { StratagemSequences } from '../utils/stratagemSequences';

interface stratagemSequenceProps {
  stratagemName: string,
  stratagemIcon: string,
  inputOptions: {
      key: string,
      entered: boolean
  }[],
}


export function VoiceChannelActivity() {
  const generateSequence = () => {
    const stratagems = []
    for (let i = 0; i < 10; i++) {
      stratagems.push(StratagemSequences[Math.floor(Math.random() * StratagemSequences.length)]);
    }
    const enrichedStratagems: stratagemSequenceProps[] = []
    stratagems.forEach(stratagem => {
      enrichedStratagems.push({
        stratagemName: stratagem.name,
        inputOptions: stratagem.sequence.split('').map((key: string) => ({key, entered: false})),
        stratagemIcon: stratagem.image
      });
    });
    return enrichedStratagems;
  }

  const [stratagemSequence, setStratagemSequence] = React.useState<stratagemSequenceProps[]>(generateSequence());
  const [stratagemsCompleted, setStratagemsCompleted] = React.useState<number>(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    const firstStratagem = stratagemSequence[0];
    const firstUnenteredKeyIndex = firstStratagem.inputOptions.findIndex(option => !option.entered);
    const acceptedKeys: { [key: string]: string[] } = {
      "U": ['W', 'ARROWUP'],
      "D": ['S', 'ARROWDOWN'],
      "L": ['A', 'ARROWLEFT'],
      "R": ['D', 'ARROWRIGHT']
    }

    if (acceptedKeys[firstStratagem.inputOptions[firstUnenteredKeyIndex].key].includes(event.key.toUpperCase())) {
      const updatedInputOptions = firstStratagem.inputOptions.map((option, index) => {
        if (index === firstUnenteredKeyIndex) {
          return {key: option.key, entered: true};
        }
        return option;
      });
      
      const updatedStratagem = {
        stratagemName: firstStratagem.stratagemName,
        inputOptions: updatedInputOptions,
        stratagemIcon: firstStratagem.stratagemIcon
      }

      const allEntered = updatedInputOptions.every(option => option.entered);
      if (allEntered) {
        setStratagemsCompleted(stratagemsCompleted + 1);
        const updatedSequence = stratagemSequence.slice(1);
        if (updatedSequence.length === 0) {
          return setStratagemSequence(generateSequence());
        }
        setStratagemSequence(updatedSequence);
      } else {
        setStratagemSequence([updatedStratagem, ...stratagemSequence.slice(1)]);
      }
    } else {
      const updatedInputOptions = firstStratagem.inputOptions.map(option => ({key: option.key, entered: false}));
      const updatedStratagem = {
        stratagemName: firstStratagem.stratagemName,
        inputOptions: updatedInputOptions,
        stratagemIcon: firstStratagem.stratagemIcon
      }
      setStratagemSequence([updatedStratagem, ...stratagemSequence.slice(1)]);
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [stratagemSequence]);


  return (
    <div className="game_container">
      <div className='game_stats'>
        <p className='stat_description'>Completed</p>
        <p className='stat_value'>{stratagemsCompleted}</p>
      </div>
      <div>
        <div className='stratagem_icons'>
          {stratagemSequence.map((stratagem, index) => (
            <img key={index} src={`/src/images/stratagems/${stratagem.stratagemIcon}`} alt={`${stratagem.stratagemName} Icon`} />
          ))}
        </div>
        <div>
          <p className='stratagem_name'>{stratagemSequence[0].stratagemName}</p>
        </div>
        <StratagemInput inputOptions={stratagemSequence[0].inputOptions} />
      </div>
    </div>
  );
}
