import {FC} from "react";
import {FaPlay} from "react-icons/fa";
import {useRouter } from "next/router";

interface PlayButtonProps {
    movieId: string;
}


const PlayButton: FC<PlayButtonProps> = ({ movieId }) => {
    
    const router = useRouter();

    return (
    <>
    <button 
        onClick={() => router.push(`/watch/${movieId}`)}
        className="bg-white rounded-md w-auto py-2 md:py-3 px-2 md:px-4 text-xs lg:text-lg
                     font-semibold flex flex-row items-center hover:bg-neutral-300
                    transition"
    >
        <FaPlay className="w-4 md:w-7 text-black" />
        Play
    </button>
    </>
  )
}

export default PlayButton;