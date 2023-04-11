import axios from "axios";
import { useCallback, useMemo, FC } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import useLiked from "../hooks/useLiked";
import { BiPlus, BiCheck } from "react-icons/bi";

interface LikeButtonProps {
    movieId: string;
}

const LikeButton: FC<LikeButtonProps> = ({ movieId }) => {

    const { mutate: mutateLiked } = useLiked();
    const { data: currentUser, mutate } = useCurrentUser();

    const isLiked = useMemo(() => {
        const list = currentUser?.favouriteIds || [];
    
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleLiked = useCallback(async () => {
        let response;
    
        if (isLiked) {
          response = await axios.delete('/api/favourite', { data: { movieId } });
        } else {
          response = await axios.post('/api/favourite', { movieId });
        }
    
        const updatedFavouriteIds = response?.data?.favouriteIds;
    
        mutate({ 
          ...currentUser, 
          favouriteIds: updatedFavouriteIds,
        });
        mutateLiked();
      }, [movieId, isLiked, currentUser, mutate, mutateLiked]);

      const LikeIcon = isLiked ? BiCheck  : BiPlus;

    return (
        <>
            <div 
                onClick={toggleLiked} 
                className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10
                        flex justify-center items-center transition hover:border-neutral-300"
            >
                <LikeIcon size={30} className="text-white group-hover/item:text-neutral-300"/>
            </div>
        </>
    )
}

export default LikeButton;