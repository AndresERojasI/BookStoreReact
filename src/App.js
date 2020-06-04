import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';

function App() {
  const apiUrl = "http://localhost:3004";

  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const booksResponse = await axios.get(`${apiUrl}/books`);
      setBooks(booksResponse.data);
    } catch (error) {
      alert("Could not load books")
    }
  }
  useEffect (() => {
    getBooks();
  }, [])

  const filterBooks = id => {
    const book = books.filter(book => book.id === id)
    setBooks(book)
  } 

const booksList = books => books.map(book => (
  <Card key={book.id} style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://assets.entrepreneur.com/content/3x2/2000/20191219170611-GettyImages-1152794789.jpeg" />
  <Card.Body>
  <Card.Title>{book.title}</Card.Title>
    <Card.Text>
      {book.description}
    </Card.Text>
    <Button variant="primary" id={book.id} onClick={() => filterBooks(book.id)}>See Book</Button>
    <Button variant="primary" id={book.id} onClick={() => getBooks()}>Reload Books</Button>
  </Card.Body>
  </Card>
))

  return (
    <Container>
      <Row className="justify-content-md-center">
          <Col>
          <h1>List of Books</h1>
          </Col>
          {
            !books ?
            <h2>loading books...</h2>:
            booksList(books)
          }
      </Row>
    </Container>
  );
}

export default App;
