// pages/genre/[genre].js
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import ProductCard from "../../components/ProductCard";
import { NextSeo } from "next-seo";
import { Container, Row, Col, Button, Spinner, Alert} from "react-bootstrap";
import { ServiceApi } from "../../redux/apiService";
const {useGetMoviesByGenreQuery,useGetMyListQuery}=ServiceApi
const GenreCategory = () => {
  const router = useRouter();
  const { genre } = router.query;
  const [pageNumber, setPageNumber] = React.useState(1);
  const { data: myList, refetch } = useGetMyListQuery({isMylistpage:0});

  
  const { data, error, isLoading } = useGetMoviesByGenreQuery({genre:genre|| "", limit:12, pageNumber} );

  const gotoPrevious = () => setPageNumber(Math.max(1, pageNumber - 1));
  const gotoNext = () => setPageNumber(Math.min(data && data.totalPage, pageNumber + 1));

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPageIndex = Math.max(1, pageNumber - halfMaxVisiblePages);
    let endPageIndex = Math.min(data && data.totalPage, pageNumber + halfMaxVisiblePages);

    if (endPageIndex - startPageIndex < maxVisiblePages - 1) {
      if (startPageIndex === 1) {
        endPageIndex = Math.min(data && data.totalPage, startPageIndex + maxVisiblePages - 1);
      } else {
        startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1);
      }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <>
      <NextSeo title={`Movies in ${genre} Genre`} description={`Browse through movies in the ${genre} genre.`} />
      <Container className="gen-section-padding-3">
        <Row>
          {isLoading ? (
            <Col className="text-center">
              <Spinner animation="border" />
            </Col>
          ) : error ? (
            <Col className="text-center">
              <Alert variant="danger">Error fetching movies</Alert>
            </Col>
          ) : data && data.data.length > 0 ? (
            data.data.map((movie) => (
              <Col key={movie._id} xs={12} md={6} lg={4}>
                <ProductCard  movie={movie}  myList={myList} refetch={refetch}/>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <h1>No movies available</h1>
            </Col>
          )}
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Button variant="primary" onClick={gotoPrevious} disabled={pageNumber === 1}>
              Previous
            </Button>
          </Col>
          {getVisiblePages().map((pageIndex) => (
            <Col xs="auto" key={pageIndex}>
              <Button
                variant={pageNumber === pageIndex ? "secondary" : "outline-secondary"}
                onClick={() => setPageNumber(pageIndex)}
              >
                {pageIndex}
              </Button>
            </Col>
          ))}
          <Col xs="auto">
            <Button variant="primary" onClick={gotoNext} disabled={pageNumber ===data && data.totalPage}>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GenreCategory;
