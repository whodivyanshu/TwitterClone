import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { name, email, image } = req.body;
            console.log(name);
            console.log(email)
            console.log(image)

            const existingUser = await prisma.user.findUnique({ where: { username: name } });

            if (existingUser) {
                return res.status(200).json({ error: 'User already exists.' });
            }


            const newUser = await prisma.user.create({
                data: {
                    username: name,
                    email,
                    profilePicture: image,
                    password: "password",
                    followerCount: 0,
                    followingCount: 0,
                    location: '',
                    bio: '',
                },
            });

            const { password: omitPassword, ...user } = newUser;
            return res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    } else {
        const users = await prisma.user.findMany({
            orderBy: {
                username: 'asc'
            }
        });
        return res.send(users);
    }
}
