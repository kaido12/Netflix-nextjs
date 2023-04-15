import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCurrentUser from "../hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: "/auth",
          permanent: false,
        }
      }
    }
    return {
      props: {}
    }
  }

  const Profiles = () => {
    //Fetch username
    const { data: user } = useCurrentUser();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center h-full justify-center">
                <div className="flex flex-col">
                    <h1 className="text-2xl sm:text-4xl text-white text-center">Who&#39;s watching?</h1>
                    <div className="flex items-center justify-center gap-6 mt-8">
                        <div onClick={() => router.push("/")}>
                            <div className="group flex-row w-44 mx-auto">
                                <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                                    <img src="./images/aang.jpg" alt="Profile" />
                                </div>
                                <div className="mt-4 text-gray-500 text-xl text-center group-hover:text-white">
                                    {user?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
  }

export default Profiles;