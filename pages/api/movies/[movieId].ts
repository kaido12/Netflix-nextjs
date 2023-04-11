import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

// In Next.js you can add brackets to a page ([param]) to create a dynamic route

// This api is used to initate actual play button

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    await serverAuth(req);

    const { movieId } = req.query; // [movieId] is in square brackets so this suggest req.query is used or dynamic routing

    if (typeof movieId !== "string") {
      throw new Error("Invalid Id");
    }

    if (!movieId) {
      throw new Error("Id is missing");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("Invalid Id");
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
