import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const CarouselCard = ({ imgSm, id, genre, title,rate }) => {
  const roundedRate = Math.round(rate);

  const generateStars = () => {
    let stars = [];
    for (let i = 0; i < roundedRate; i++) {
      stars.push(<i className="fas fa-star" key={i} />);
    }
    return stars;
  };

  const [MyList, setMyList] = useState([]);
 
  const GetMyList = async () => {
    await axios
      .get("/mylists")
      .then((res) => setMyList(res.data?.result))
      .catch((error) => console.error(error));
  };
  const addTomylist = async (id) => {
    await axios
      .post("/mylists/add", {
        listid: id,
      })
      .then((res) => GetMyList())
      .catch((error) => console.error(error));
  };
  const deleteFromomylist = async () => {
    await axios
      .delete("/mylists/delete?listid=" + id)
      .then((res) => GetMyList())
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    
    GetMyList()
    return () => {
    }
  }, [])
  
  return (
    <div className="col-xl-3 col-lg-4 col-6 col-md-6">
     <div className="movie type-movie status-publish has-post-thumbnail hentry movie_genre-action movie_genre-adventure movie_genre-drama">
        <div className="gen-carousel-movies-style-2 movie-grid style-2">
          <div className="gen-movie-contain">
            <div className="gen-movie-img">
              <img width={"100%"} src={imgSm} alt="owl-carousel-video-image" />
              <div className="gen-movie-add">
                <div className="movie-actions--link_add-to-playlist dropdown">
                 
                     {MyList.includes(id) ? (
                        <i className="fa fa-check"  onClick={deleteFromomylist}/>
                      ) : (
                        <i className="fa fa-plus"  onClick={() => addTomylist(id)} />
                      )}
                  <div className="dropdown-menu mCustomScrollbar">
                    <div className="mCustomScrollBox">
                      <div className="mCSB_container">
                        <a className="login-link">
                          Sign in to add this movie to a playlist.
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gen-movie-action">
                <div class="gen-movie-action">
                  <Link href={"/singlemovie/" + id} class="gen-button">
                    <i class="fa fa-play"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="gen-info-contain">
              <div className="gen-movie-info">
                <h3>
                  <Link href={"/singlemovie/" + id}>{title}</Link>
                </h3>
              </div>
              <div className="gen-movie-meta-holder">
                <ul>
                  {/* <li>2hr 00mins</li> */}
                  <li>
                    {genre.length>0 &&  genre.map((genre, idx) => {
                      return (
                        <span key={idx}>
                          <Link className="item-link" href={"/genre/" + genre}>
                            {(idx ? "," : "") + genre}
                          </Link>
                        </span>
                      );
                    })}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      {/* End movie item rendering */}
    </div>
 
  );
};

export default CarouselCard;
