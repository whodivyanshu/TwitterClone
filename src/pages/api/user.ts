import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // For hashing passwords

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const { name, email, image, password } = req.body;
            console.log(name);
            console.log(email)
            console.log(image)

            // Check if the user with the given username already exists
            // const existingUser = await prisma.user.findUnique({ where: { username: name } });

            // if (existingUser) {
            //     return res.status(400).json({ error: 'User already exists.' });
            // }

            // // Hash the password
            // const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed

            // // Create the user with hashed password
            // const newUser = await prisma.user.create({
            //     data: {
            //         username: name,
            //         email,
            //         profilePicture: image,
            //         password: hashedPassword, // Store the hashed password
            //         followerCount: 0,
            //         followingCount: 0,
            //         location: '',
            //         bio: '',
            //     },
            // });

            // // Return a response with limited user data
            // const { password: omitPassword, ...user } = newUser;
            // return res.status(201).json(user);
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
