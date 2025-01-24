"use server";

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parse } from "path";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(1000),
});

export async function createPost(formData: unknown): Promise<void> {

    const { isAuthenticated } = getKindeServerSession();

    if (!(await isAuthenticated())) {
        redirect("/api/auth/login");
        return;
    }


    const result = postSchema.safeParse(formData);

    if (!result.success) {
        console.error("Validation failed:", result.error.errors);
        return;
    }

    const { title, body } = result.data;

    await prisma.post.create({
        data: { 
            title,
            body,
        },
    });

    revalidatePath('/posts');
}

export async function savePrediction(choices: Record<number, string | null>): Promise<void> {

    for (const [fixtureId, choice] of Object.entries(choices)) {
        if (choice) {
            const existingPrediction = await prisma.prediction.findFirst({
                where: {
                    fixtureId: parseInt(fixtureId),
                },
            });

            if (existingPrediction) {
                await prisma.prediction.update({
                    where: {
                        id: existingPrediction.id,
                    },
                    data: {
                        predictedResult: choice,
                    },
                });
            } else {

            await prisma.prediction.create({
                data: {
                    fixtureId: parseInt(fixtureId),
                    predictedResult: choice,
                },
            });
        }
    }
}
}
