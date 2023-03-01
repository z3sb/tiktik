import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import { IUser, Video } from "@/types";
import { BASE_URL } from "@/utils";
import useAuthStore from "@/store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();
  const account = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchAccounts = allUsers.filter((user: IUser) =>
    user.userName
      .toLowerCase()
      .replaceAll(" ", "")
      .includes(searchTerm.replaceAll(" ", "").toLowerCase())
  );
  return (
    <div className="w-full">
      <div className="flex gap-10 mt-10 mb-10 border-b-2 border-gray-100 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${account}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchAccounts.length > 0 ? (
            searchAccounts.map((user: IUser, index: number) => (
              <Link href={`/profile/${user._id}`} key={index}>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-blue-400 text-md" />
                    </p>
                    <p className="text-gray-500 capitalize font-medium text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No users found for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos?.length ? (
            videos.map((video, index) => <VideoCard post={video} key={index} />)
          ) : (
            <NoResults text={`No videos results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      videos: data,
    },
  };
};

export default Search;
