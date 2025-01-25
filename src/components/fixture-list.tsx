"use client";

import { useState } from "react";
import FixtureCard from "./fixture-card";
import { savePrediction } from "@/actions/actions";

interface Fixture {
    id: number;
    homeTeam: string;
    awayTeam: string;
    round: string;
    status: string;
    };

interface FixtureListProps {
    fixtures: Fixture[];
}

export default function FixtureList({ fixtures }: FixtureListProps) {

    const [choices, setChoices] = useState<Record<number, string | null>>({});

    const handleChoiceSelect = (fixtureId: number, choice: string | null) => {
        setChoices((prevChoices) => ({
            ...prevChoices,
            [fixtureId]: prevChoices[fixtureId] === choice ? null : choice,
        }));
    };

    console.log(choices);

    const handleSubmit = async () => {
        if (Object.keys(choices).length !== fixtures.length) {
            alert("Please make a prediction for all fixtures");
        }
        const result = await savePrediction(choices);
        console.log(result);
    }
    

    return (
        <div>
                {fixtures.map((fixture: Fixture) => (
                <FixtureCard key={fixture.id} 
                    fixture={fixture} 
                    onChoiceSelect={handleChoiceSelect} 
                    selectedChoice={choices[fixture.id] || null} />
                ))}
                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
        </div>
    )
}
