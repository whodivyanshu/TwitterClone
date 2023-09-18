import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { username, tweetContent, newDate, profilePicture } = req.body;

            // Validate input data here (e.g., check if required fields are present)

            const existingUser = await prisma.user.findUnique({ where: { username } });

            if (existingUser) {
                const newTweet = await prisma.tweet.create({
                    data: {
                        tweetContent,
                        likeCount: 0,
                        retweetCount: 0,
                        profilePicture,
                        tweetDate: newDate,
                        user: {
                            connect: {
                                username
                            }
                        }
                    }
                });
                res.status(201).json(newTweet); // Send a success response with the newly created tweet
            } else {
                res.status(404).json({ error: "User not found." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while creating a tweet." });
        }
    } else if (req.method === 'GET') {



    }

    // Disconnect from the Prisma client when done
    await prisma.$disconnect();
}
