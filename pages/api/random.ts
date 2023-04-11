import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../libs/prismadb";
import serverAuth from "../../libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }
    await serverAuth(req); // to check if user is logged in

    const moviesCount = await prismadb.movie.count(); // to count number of movies without loading them
    const randomIndex = Math.floor(Math.random() * moviesCount);

    //pagination
    const randomMovies = await prismadb.movie.findMany({
        take: 1,
        skip: randomIndex
      });

    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
