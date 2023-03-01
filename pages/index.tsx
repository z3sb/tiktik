import axios from "axios";
import { Video } from "@/types";
import VideoCard from "@/components/VideoCard";
import NoResults from "@/components/NoResults";
import { NextPage } from "next";
import { BASE_URL } from "@/utils";

interface IProps {
  videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={videos._id} />
        ))
      ) : (
        <NoResults text="No Videos" />
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response: any = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }
  return {
    props: {
      videos: response.data,
    },
  };
};

export default Home;
