import React from 'react';
import Card from './Card';
import { ChoiceInfluence } from './ChoiceInfluence';

export default function Choice({ choice, onChoiceSelected }) {

    const selectChoice = () => {
        onChoiceSelected(choice);
    }

    return (<div className="flex-1" onClick={selectChoice}>
        <Card title={choice?.text ?? 'No Choice'}>
            <ChoiceInfluence {...choice} />
        </Card>
    </div>)
}