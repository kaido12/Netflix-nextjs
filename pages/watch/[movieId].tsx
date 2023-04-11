import {BsArrow90DegLeft} from "react-icons/bs"
import useMovie from "../../hooks/useMovie";
import { useRouter } from "next/router";
import {BsArrowLeft} from "react-icons/bs"

const Watch = () => {

    const router = useRouter();

    const {movieId} = router.query;

    const {data} = useMovie(movieId as string)

   return (
    <>
    <div className="h-screen w-screen bg-black">
        <nav className="fixed w-full p-4 z-10 flex flex-row text-white items-center gap-4 bg-zinc-900/70">
            <BsArrowLeft onClick={() => router.push("/")}  className="cursor-pointer text-white" size={35} />
            <p className="text-white text-xl md:text-3xl font-bold"></p>
            <span className="font-light text-white">
                Watching :
            </span>
            {data?.title}
        </nav>
        <video className="h-full w-full" autoPlay controls src={data?.videoUrl}></video>
    </div>
    </>
   )
}

export default Watch;