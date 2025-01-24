import { prisma } from "@/lib/prisma";

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export default async function fetchAndSaveFixtures(){

    const currentRound = 22;

    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2024&round=Regular%20Season%20-%20${currentRound}`;
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPID_API_KEY!,
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
            },
        };
            const response = await fetch(url, options);
            const data = await response.json();
            const fixtures = data.response;

            for (const fixture of fixtures) {

            const existingFixture = await prisma.fixture.findFirst({
                where: {
                  homeTeam: fixture.teams.home.name,
                  awayTeam: fixture.teams.away.name,
                  round: fixture.league.round,
                  date: fixture.fixture.date,
                  status: fixture.fixture.status.short,
                  homeGoals: fixture.goals.home,
                  awayGoals: fixture.goals.away,
                },
              });

            if (!existingFixture) {
                await prisma.fixture.create({
                    data: {
                        homeTeam: fixture.teams.home.name,
                        awayTeam: fixture.teams.away.name,
                        round: fixture.league.round,
                        date: fixture.fixture.date,
                        status: fixture.fixture.status.short,
                        homeGoals: fixture.goals.home,
                        awayGoals: fixture.goals.away,
                    },
                });

            }

}
}