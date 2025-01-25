"use client";

import { useEffect, useState } from "react";

interface Fixture {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeGoals: number | null;
    awayGoals: number | null;
    status: string;
}

interface Prediction {
    id: number;
    fixtureId: number;
    predictedResult: string;
}

interface FixtureCardProps {
    fixture: Fixture;
    prediction?: Prediction;
  }

export default function FixtureCardResults({fixture, prediction}: FixtureCardProps) {

    const [predictionOutcome, setPredictionOutcome] = useState<string | null>(null);

    useEffect(() => {
        const checkPrediction = () => {
          if (fixture.status == "FT" && fixture.homeGoals !== null && fixture.awayGoals !== null && prediction) {
            if (fixture.homeGoals > fixture.awayGoals && prediction.predictedResult === fixture.homeTeam) {
              setPredictionOutcome("Home");
            } else if (fixture.homeGoals < fixture.awayGoals && prediction.predictedResult === fixture.awayTeam) {
              setPredictionOutcome("Away");
            } else if (fixture.homeGoals === fixture.awayGoals && prediction.predictedResult === "Draw") {
              setPredictionOutcome("Draw");
            } else {
              setPredictionOutcome("");
            }
          }
        };

        checkPrediction();
    }, [fixture, prediction]);

    const isFixtureCompleted = fixture.status === "FT";
    
    return (
        <div className="container mx-auto p-4 rounded-lg shadow-md bg-white max-w-md">
        <div className="grid grid-cols-3 gap-4">
        {["Home", "Draw", "Away"].map((resultType) => {
          const isCorrect = isFixtureCompleted && predictionOutcome === resultType;
          const isWrongPrediction = 
            isFixtureCompleted &&
            prediction && 
            prediction.predictedResult === 
              (resultType === "Home" ? fixture.homeTeam : 
               resultType === "Away" ? fixture.awayTeam : 
               "Draw") && 
            !isCorrect;
        
          return (
            <button
              key={resultType}
              className={`p-4 rounded-lg text-center shadow ${
                isCorrect 
                  ? 'bg-green-200' 
                  : isWrongPrediction 
                    ? 'bg-red-200' 
                    : 'bg-gray-100'
              }`}
            >
              <p className="font-bold text-md">
                {resultType === "Home" ? fixture.homeTeam : 
                 resultType === "Away" ? fixture.awayTeam : 
                 "Draw"}
              </p>
            </button>
          );
        })}
        </div>
        </div>
        );
};