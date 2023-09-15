import { prisma } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define types for the runMiddleware function parameters
type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (result: unknown) => void
) => void;

async function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction
) {
  return new Promise<void>((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve();
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'GET') {
    try {
      const tweets = await prisma.tweet.findMany({
        orderBy: {
          tweetDate: 'desc'
        }
      });
      res.send(tweets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching tweets." });
    }
  } else if (req.method === 'POST') {
    // Handle POST requests here
  }
}
