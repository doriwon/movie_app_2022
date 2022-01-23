import { useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetail(json.data.movie);
    setLoading(false);
    console.log(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div style={{ background: detail.background_image }}>
          <h1>{detail.title}</h1>
          <ul>
            {detail.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <p>Rating : {detail.rating}</p>
          <img src={detail.large_cover_image} alt={detail.title} />
          <p>{detail.description_intro}</p>
        </div>
      )}
    </>
  );
}

export default Detail;
