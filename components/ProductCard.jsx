import React, { useEffect } from "react";
import Link from "next/link";
import { FaCheck, FaPlus } from "react-icons/fa";
import { Card, Button, Badge } from "react-bootstrap";
import { ServiceApi } from "../redux/apiService";
const { useAddToMyListMutation, useDeleteFromMyListMutation } = ServiceApi;

const ProductCard = ({ movie, myList, refetch }) => {
  const [addToMyList] = useAddToMyListMutation();
  const [deleteFromMyList] = useDeleteFromMyListMutation();

  useEffect(() => {
    if (refetch && typeof refetch==="function") {
      refetch();
    }
  }, [refetch]);

  const handleAddToMyList = async () => {
    await addToMyList(movie._id);
    if (refetch && typeof refetch==="function") {
      refetch();
    }
  };

  const handleDeleteFromMyList = async () => {
    await deleteFromMyList(movie._id);
    if (refetch && typeof refetch==="function") {
      refetch();
    }
  };

  return (
    <Card className="mb-3">
      <Link href={`/movie/${movie._id}`}>
        <Card.Img variant="top" src={movie.imageurl || movie.poster} alt={movie.title} />
      </Link>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <strong>Premiered:</strong> {movie.premiered}
        </Card.Text>
        <Card.Text>
          {movie.genre.map((genre, idx) => (
            <Link href={`/genre/${genre._id}`} key={idx}>
              <Badge className="mr-1" variant="secondary">
                {genre.name}
              </Badge>
            </Link>
          ))}
        </Card.Text>
        <Button
          variant={ "primary"}
          onClick={myList?.includes(movie._id) ? handleDeleteFromMyList : handleAddToMyList}
        >
            {myList?.includes(movie._id) ? <>
              <FaCheck />
              {"My List"}
            </>:<>
              <FaPlus />
              {"My List"}
             
              </>
            }
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
