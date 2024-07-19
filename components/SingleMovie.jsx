import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "axios";
import instance from "../config/axios";
import { useParams, Link } from "react-router-dom";

const SingleMovie = () => {
  const [movies, setMovies] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [Language, setLanguage] = useState("");
  const { id } = useParams();
  const fetchUrl = instance.baseURL + "movies/find/" + id;

  // A snippet of code which runs based on a specific condition / variables
  useEffect(() => {
    //if [], run once when the row loads , dont run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log(request);

      setMovies(request.data);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developer.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QkqU
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  const list = [movies?.genre?.join(",")];
  console.log(list);

  return (
    <div>
      <section class="gen-section-padding-3 gen-single-movie">
        <div class="container">
          <div class="row no-gutters">
            <div class="col-lg-12">
              <div class="gen-single-movie-wrapper style-1">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="gen-video-holder">
                      <div class="videoWrapper">
                        <div>
                          {trailerUrl ? (
                            <Youtube videoId={trailerUrl} opts={opts} />
                          ) : (
                            <div className="text-center">
                              Movie Trailer Not Found
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div class="gen-single-movie-info">
                      <h2 class="gen-title">{movies.title}</h2>
                      {/* <div class="gen-single-meta-holder">
                        <ul>
                          <li class="gen-sen-rating">TV-PG</li>
                          <li>
                            <i class="fas fa-eye"></i>
                            <span>237 Views</span>
                          </li>
                        </ul>
                      </div> */}
                      <p>{movies.desc}</p>
                      <div class="gen-after-excerpt">
                        <div class="gen-extra-data">
                          <ul>
                            <li>
                              <span>Language :</span>
                              <span>{Language}</span>
                            </li>

                            <li>
                              <span>Audio Languages :</span>
                              <span>{Language}</span>
                            </li>

                            <li>
                              <span>Genre :</span>
                              <li>
                                {
                                  // console.log({genre:movie.genre})
                                  movies.genre &&  movies.genre.length>0 && movies.genre.map((genre, idx) => {
                                    return (
                                      <span key={idx}>
                                        <Link
                                          className="item-link"
                                          to={"/genre/" + genre}
                                        >
                                          {(idx ? "," : "") + genre}
                                        </Link>
                                      </span>
                                    );
                                  })
                                }
                              </li>
                            </li>

                            <li>
                              <span>Release Date :</span>
                              <span>
                                {movies?.year ? movies.year : "Not Found"}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div class="gen-socail-share">
                          <h4 class="align-self-center">Social Share :</h4>
                          <ul class="social-inner">
                            <li>
                              <a href="#" class="facebook">
                                <i class="fab fa-facebook-f"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#" class="facebook">
                                <i class="fab fa-instagram"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#" class="facebook">
                                <i class="fab fa-twitter"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleMovie;
