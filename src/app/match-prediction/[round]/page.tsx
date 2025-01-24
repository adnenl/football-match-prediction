import FixtureList from "@/components/fixture-list";
import fetchAndSaveFixtures from "@/lib/fetch-fixtures";
import { prisma } from "@/lib/prisma";


export default async function Page({ params }: {
    params: { round: string } }) {
    
    await fetchAndSaveFixtures();

    const fixtures = await prisma.fixture.findMany({
        where: {
            round: `Regular Season - ${params.round}`,
        },
        select: {
            id: true,
            homeTeam: true,
            awayTeam: true,
            round: true,
            date: true,
            status: true,
            homeGoals: true,
            awayGoals: true,
        },
    });

    const formattedFixtures = fixtures.map((fixture) => ({
        id: fixture.id,
        homeTeam: fixture.homeTeam,
        awayTeam: fixture.awayTeam,
        round: fixture.round,
    }));

    console.log(formattedFixtures);

            
    return (

        <FixtureList fixtures={formattedFixtures}/>
    )
}