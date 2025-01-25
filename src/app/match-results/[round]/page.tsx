import FixtureList from "@/components/fixture-list";
import FixtureListResults from "@/components/fixture-list-results";
import fetchAndSaveFixtures from "@/lib/fetch-fixtures";
import { prisma } from "@/lib/prisma";


export default async function Page({ params }: {
    params: { round: string } }) {
    
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

    const predictions = await prisma.prediction.findMany({
        where: {
            fixtureId: {
                in: fixtures.map((fixture) => fixture.id),
            } 
        },
        select: {
            id: true,
            fixtureId: true,
            predictedResult: true,
        },
    });



            
    return (

        <FixtureListResults fixtures={fixtures} predictions={predictions}/>
    )
}