import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import diary from "../Asset/image/diary.webp";
import { Link } from "react-router-dom";
import AppNavBar from "../component/AppNavBar";



const Home = () => {
  return (
    <div>
     <AppNavBar/>
     

      {/* Main Content */}
      <Container className="mt-5">
        <Row className="align-items-center">
          {/* Left Section */}
          <Col md={6} className="text-center text-md-start">
            <h1 className="fw-bold display-4">Mydiary..</h1>
            <p className="text-muted">
              Keep your memories and thoughts organized in a beautifully designed diary.
            </p>
            <Link to='/diary'><button className="btn btn-dark">Get Started.</button></Link>
          </Col>

          {/* Right Section */}
          <Col md={6} className="text-center">
            <img
              src={diary} // Use the imported variable here
              alt="Diary"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>

      {/* Footer (Optional) */}
      <footer className="text-center py-3 mt-5 bg-light">
        <a href="https://linkedin.com" className="mx-2 text-dark">
          LinkedIn
        </a>
        <a href="https://twitter.com" className="mx-2 text-dark">
          Twitter
        </a>
        <a href="https://facebook.com" className="mx-2 text-dark">
          Facebook
        </a>
      </footer>
      
    </div>
  );
};

export default Home;
