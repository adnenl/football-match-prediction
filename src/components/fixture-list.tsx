import FixtureCard from "./fixture-card";
// Define the RAPID_API_KEY variable
const RAPID_API_KEY = process.env.RAPID_API_KEY;

export default async function FixtureList() {

const url = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024&round=Regular%20Season%20-%2023';
const options: RequestInit = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': RAPID_API_KEY!,
		'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
	},
};
	const response = await fetch(url, options);
	const data = await response.json();

  interface Fixture {
    // Define the properties of a fixture based on the API response
    id: number;
    teams: {
      home: {
        name: string;
      };
      away: {
        name: string;
      };
    };
    // Add other properties as needed
  }

  const fixtures: Fixture[] = data.response;

  return (
    <div>
            {fixtures.map((fixture: Fixture) => (
            <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
    </div>
  )
}
