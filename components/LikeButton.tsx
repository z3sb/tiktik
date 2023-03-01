import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "@/store/authStore";

interface IProps {
  handleLike: () => void;
  handleDisLike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDisLike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLinkes: any = likes?.filter(
    (item) => item._ref === userProfile?._id
  );
  console.log(likes);
  useEffect(() => {
    if (filterLinkes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [likes, filterLinkes]);
  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]"
            onClick={handleDisLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length | 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
