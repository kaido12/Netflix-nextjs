import type { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";
import Navbar from "../components/Navbar";
import Billboard from "../components/Billboard";
import MovieList from "../components/MovieList";
import useMovieList from "../hooks/useMovieList";
import useLiked from "../hooks/useLiked";

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

const Home = () => {

  const {data: movies = [] } = useMovieList();
  const {data:  liked = [] } = useLiked();

  return(
    <>
      <Navbar />
      <Billboard />
      <div className="pb-20">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={liked} />
      </div>
    </>
  
  )
};

export default Home;
