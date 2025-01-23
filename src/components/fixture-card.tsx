"use client";

import { useState } from "react";

interface Fixture {
  teams: {
    home: {
      name: string;
    };
    away: {
      name: string;
    };
  };
}

interface FixtureCardProps {
    fixture: Fixture;
  }

export default function FixtureCard({fixture }: FixtureCardProps) {

    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const handleClick = (team: string) => {
        setSelectedTeam((prev) => (prev === team ? null : team));
        console.log(team);
        
    }

  return (
    <div className="container mx-auto p-4 rounded-lg shadow-md bg-white max-w-md">
    <div className="grid grid-cols-3 gap-4">

    <button onClick={() => {handleClick(fixture.teams.home.name)}} 
            className={`p-4 rounded-lg  text-center shadow hover:bg-gray-200 ${
            selectedTeam === fixture.teams.home.name ? 'bg-green-200' : 'bg-gray-100'}`}>
      <p className="font-bold text-md">{fixture.teams.home.name}</p>
    </button>

    <button onClick={() => {handleClick("Draw")}} 
            className={`p-4 rounded-lg  text-center shadow hover:bg-gray-200 ${
            selectedTeam === "Draw" ? 'bg-green-200' : 'bg-gray-100'}`}>
      <p className="font-bold text-md mx-auto my-auto">Draw</p>
    </button>

    <button onClick={() => {handleClick(fixture.teams.away.name)}} 
            className={`p-4 rounded-lg  text-center shadow hover:bg-gray-200 ${
            selectedTeam === fixture.teams.away.name ? 'bg-green-200' : 'bg-gray-100'}`}>
      <p className="font-bold text-md">{fixture.teams.away.name}</p>
    </button>
  </div>
</div>

  );
}
