import { prisma } from "@/lib/prisma";
import UpvoteButton from "./upvote-button";
import { notFound } from "next/navigation";

export default async function Post({ id }: {
    id: string }) {
    
    const post = await prisma.post.findUnique({
        where: { 
            id: parseInt(id),
        },
    });

    if (!post) {
        notFound();
    }

  return (
    <div>
        <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
        <p className="max-w-[700px] mx-auto">{post.body}</p>
        <UpvoteButton/>
        
    </div>
  )
}