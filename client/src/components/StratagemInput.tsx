import * as React from 'react';
import './StratagemInput.css';

interface stratagemInputProps {
    inputOptions: {
        key: string,
        entered: boolean
    }[]
}

export function StratagemInput({
    inputOptions,
}: stratagemInputProps) {

    return (
        <div className='stratagem_inputs'>
            {inputOptions.map((inputOption, index) => (
                <div className='input_arrow' key={index}>
                    {inputOption.key === 'U' ? (
                        inputOption.entered ?
                        <img src='/src/images/arrows/selected/U.png' alt='U' />
                        : <img src='/src/images/arrows/unselected/U.png' alt='U' />
                    ) : inputOption.key === 'D' ? (
                        inputOption.entered ?
                        <img src='/src/images/arrows/selected/D.png' alt='D' />
                        : <img src='/src/images/arrows/unselected/D.png' alt='D' />
                    ) : inputOption.key === 'L' ? (
                        inputOption.entered ?
                        <img src='/src/images/arrows/selected/L.png' alt='L' />
                        : <img src='/src/images/arrows/unselected/L.png' alt='L' />
                    ) : inputOption.key === 'R' ? (
                        inputOption.entered ?
                        <img src='/src/images/arrows/selected/R.png' alt='R' />
                        : <img src='/src/images/arrows/unselected/R.png' alt='R' />
                    ) : null}
                </div>
            ))}
        </div>
    );
}
