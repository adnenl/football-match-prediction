"use client";

import { useState } from "react";
import FixtureCard from "./fixture-card";
import { savePrediction } from "@/actions/actions";
import FixtureCardResults from "./fixture-card-results";

interface Fixture {
    id: number;
    homeTeam: string;
    awayTeam: string;
    round: string;
    homeGoals: number | null;
    awayGoals: number | null;
    status: string;
    };

interface Prediction {
    id: number;
    fixtureId: number;
    predictedResult: string;
}

interface FixtureListProps {
    fixtures: Fixture[];
    predictions: Prediction[];
}

export default function FixtureListResults({ fixtures, predictions }: FixtureListProps) {
    

    return (
        <div>
                {fixtures.map((fixture: Fixture) => {
                    const prediction = predictions.find(p => p.fixtureId === fixture.id);
                    return (
                    <FixtureCardResults 
                        key={fixture.id} 
                        fixture={fixture} 
                        prediction={prediction}
                        />
                    );
            })}
                
        </div>
    )
}