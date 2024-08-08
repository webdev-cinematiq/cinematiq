const Collection = ({ collection }: { collection: any }) => {
  return (
    <div key={collection._id} className="collection-card">
      <h3 className="collection-card-title">{collection.title}</h3>
      <p className="collection-card-description">{collection.description}</p>

      <div className="collection-movies">
        {collection.movies.map((movie: any) => (
          <img
            key={movie._id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="collection-movie-poster"
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
