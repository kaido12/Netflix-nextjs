import { FC } from "react";
import {FaPlay} from "react-icons/fa";
import LikeButton from "./LikeButton";
import {useRouter} from "next/router";

interface MovieCardProps {
  data: Record<string, any>;
}

const MovieCard: FC<MovieCardProps> = ({ data }) => {

  const router = useRouter();

  return (
    <>
      <div className="group col-span-1 bg-zinc-900 relative h-[12vw]">
        <img
          src={data?.thumbnailUrl}
          className="cursor-pointer object-cover transition duration shadow-xl rounded-md 
                      group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]"
          alt="Thumbnail"
        />
        <div
          className="opacity-0 absolute top-0 transition duration-200 z-10 invisible 
                      sm:visible delay-300 w-full scale-0 group-hover:scale-100 
                      group-hover:-translate-y-[5vw] group-hover:opacity-100"
        >
          <img src={data.thumbnailUrl} alt="Movie" 
              draggable={false} 
              className="cursor-pointer object-cover transition duration shadow-xl
                         w-full h-[12vw]" />
          <div 
            className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full
                          transition shadow-md "
          >
            <div className="flex flex-row justify-between flex-grow items-center gap-3">
              <span  className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white 
                              flex justify-center items-center transition hover:bg-neutral-300 border-2 rounded-full border-solid border-red-500"
                    onClick={() => router.push(`/watch/${data?.id}`)}
              >
                <FaPlay className="text-black w-2 lg:w-6" />
              </span>
              <span className="text-green-400 gap-4 font-semibold">
                New <span className="text-white">2023</span>
              </span>
              <span className="items-center text-[12px] text-white lg:text-sm">
                <p>{data.genre}</p>
              </span>
              <LikeButton movieId={data?.id}/>
            </div>                      
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
