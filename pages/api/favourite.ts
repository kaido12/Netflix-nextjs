import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '../../libs/prismadb';
import serverAuth from "../../libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // To add movieId to the list of favouriteIds
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req);
      
            const { movieId } = req.body;
        
            const existingMovie = await prismadb.movie.findUnique({
              where: {
                id: movieId,
              }
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data : {
                    favouriteIds: {
                        push: movieId,
                    }
                }
            });

            return res.status(200).json(user);
        }
        
        // To delete movieId to the list of favouriteIds
        if (req.method === "DELETE") {
            const {currentUser} = await serverAuth(req);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                  id: movieId,
                }
            });
  
            if (!existingMovie) {
                  throw new Error('Invalid ID');
            }

              // list of current favourite ids without this movieId using ladash
            const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favouriteIds: updatedFavouriteIds
                }
            })

            return res.status(200).json(updatedUser);
        }
        // 405 Method Not Allowed response status code indicates 
        // that the server knows the request method,
        // but the target resource doesn't support this method.

        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}