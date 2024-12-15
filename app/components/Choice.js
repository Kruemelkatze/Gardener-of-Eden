import React from 'react';
import Card from './Card';
import { ChoiceInfluence } from './ChoiceInfluence';

export default function Choice({ choice, onChoiceSelected }) {

    const selectChoice = () => {
        onChoiceSelected(choice);
    }

    return (<div className="flex flex-grow height-full" onClick={selectChoice} style={{maxWidth: 'calc(50% - 4rem)'}}>
        <Card title={choice?.text ?? 'No Choice'}>
            <ChoiceInfluence {...choice} />
        </Card>
    </div>)
}