import FixtureList from "@/components/fixture-list";
import fetchAndSaveFixtures from "@/lib/fetch-fixtures";
import { prisma } from "@/lib/prisma";


export default async function Page() {
    
    await fetchAndSaveFixtures();

    const fixtures = await prisma.fixture.findMany({
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


            
    return (
        <FixtureList fixtures={fixtures}/>
    )
}