import { useRouter } from 'next/router';
import Link from 'next/link';
import { getMovies, getMovieById, deleteMovie } from '../../../actions';

const Movie = ({ movie, id }) => {
    const router = useRouter();

    const HandleDelete = (id) => {
        deleteMovie(id).then((movie) => {
            router.push("/");
        });
    };

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-3">{movie.name}</h1>
                <p className="lead">{movie.description}</p>
                <hr className="my-2" />
                <p>{movie.genre}</p>
                <button className="btn btn-primary btn-lg mr-1">Learn More</button>
                <button onClick={() => HandleDelete(id)} className="btn btn-danger btn-lg mr-1">Delete</button>
                <Link href="/movies/[id]/edit" as={`/movies/${id}/edit`}>
                    <button className="btn btn-secondary btn-lg">Edit</button>
                </Link>
            </div>
            <p className="lead">
                {movie.longDescription}
            </p>
        </div>
    );
};

export const getStaticPaths = async () => {
    const getMoviesId = await getMovies();
    const path = getMoviesId.map(getMovie => ({ params: { id: getMovie.id } }));
    return {
        paths: path,
        fallback: false // See the "fallback" section below
    };
};


export const getStaticProps = async (ctx) => {
    const { params: { id = "" } = {} } = ctx;
    const movie = await getMovieById(id);
    return {
        props: { movie, id }, // will be passed to the page component as props
    };
};

export default Movie;