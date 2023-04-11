import bcrpyt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../libs/prismadb";

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  try {
    if (request.method !== "POST") {
      return response.status(405).end();
    }
    const { name, email, password } = request.body;

    const activeUser = await prismadb.user.findUnique({
        where: {
            email,
        }
    })

    if (activeUser) {
        return response.status(422).json({ error: "Email taken"});
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = await prismadb.user.create({
        data: {
          email,
          name,
          hashedPassword,
          image: '',
          emailVerified: new Date(),
        }
      })
      return response.status(200).json(user);
  } catch (error) {

  }
};

export default handler;
