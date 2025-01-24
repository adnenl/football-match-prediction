"use client";

import { useState } from "react";

interface Fixture {
    id: number;
    homeTeam: string;
    awayTeam: string;
}

interface FixtureCardProps {
    fixture: Fixture;
    onChoiceSelect: (fixtureId: number, choice: string | null) => void;
    selectedChoice: string | null;
  }

export default function FixtureCard({fixture, onChoiceSelect, selectedChoice }: FixtureCardProps) {

    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (team: string) => {
        onChoiceSelect(fixture.id, team);
        setSelected(team === selected ? null : team);
    };

  return (
    <div className="container mx-auto p-4 rounded-lg shadow-md bg-white max-w-md">
    <div className="grid grid-cols-3 gap-4">

    <button onClick={() => {handleClick(fixture.homeTeam)}} 
            className={`p-4 rounded-lg  text-center shadow  ${
            selected === fixture.homeTeam ? 'bg-green-200 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
      <p className="font-bold text-md">{fixture.homeTeam}</p>
    </button>

    <button onClick={() => {handleClick("Draw")}} 
            className={`p-4 rounded-lg  text-center shadow hover:bg-gray-200 ${
            selected === "Draw" ? 'bg-green-200 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
      <p className="font-bold text-md mx-auto my-auto">Draw</p>
    </button>

    <button onClick={() => {handleClick(fixture.awayTeam)}} 
            className={`p-4 rounded-lg  text-center shadow hover:bg-gray-200 ${
            selected === fixture.awayTeam ? 'bg-green-200 hover:bg-green-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
      <p className="font-bold text-md">{fixture.awayTeam}</p>
    </button>
  </div>
</div>

  );
}
