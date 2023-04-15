import { useCallback, FC } from "react";
import useBillboard from "../hooks/useBillboard";
import { BsInfoCircle } from "react-icons/bs";
import PlayButton from "./PlayButton";
import useInfoModalStore from "../hooks/useInfoModalStore";

const Billboard: FC = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModalStore();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop
        src={data?.videoUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
      ></video>
      <div className="absolute top-[30%] sm:top-[40%] ml-4 sm:ml-8">
        <p className="text-white text-3xl sm:text-4xl h-full w-[50%] lg:text-5xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[14px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl whitespace-wrap">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={() => handleOpenModal()}
            className="flex flex-row items-center bg-white/30 text-white rounded-md py-1 md:py-2 px-2 md:px-4 text-sm lg:text-lg w-auto font-semibold hover:bg-opacity-20
              transition "
          >
            <BsInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
