import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Button,
  Row,
  Col
} from "shards-react";

const Projects = ({ title, discussions }) => (
  <Card>
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      {discussions.map((discussion, idx) => (
        <div key={idx} className="blog-comments__item d-flex p-3">
          {/* Avatar */}
          <div className="blog-comments__avatar mr-3">
            <img src={discussion.author.image} alt={discussion.author.name} />
          </div>

          {/* Content */}
          <div className="blog-comments__content">
            {/* Content :: Title */}
            <div className="blog-comments__meta text-mutes">
              <a className="text-secondary" href={discussion.author.url}>
                {discussion.author.name}
              </a>{" "}
              <span className="text-mutes">- {discussion.date}</span>
            </div>

            {/* Content :: Body */}
            <p className="m-0 my-1 mb-2 text-muted">{discussion.body}</p>

            {/* Content :: Actions */}
            <div className="blog-comments__actions">
              <ButtonGroup size="sm">
                <Button theme="white">
                  <span className="text-success">
                    <i className="material-icons">check</i>
                  </span>{" "}
                  Details
                </Button>
              </ButtonGroup>
            </div>


          </div>
        </div>
      ))}
    </CardBody>

    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit">
            View All Projects
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

Projects.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The discussions dataset.
   */
  discussions: PropTypes.array
};

Projects.defaultProps = {
  title: "Projects",
  discussions: [
    {
      id: 1,
      date: "February 2019",
      author: {
        image: require("../../images/icon/jalapeno.jpeg"),
        name: "Jalapeno",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "Well, the way they make shows is, they make..."
    },
    {
      id: 2,
      date: "January 2019",
      author: {
        image: require("../../images/icon/grilled-chicken.jpeg"),
        name: "Grilled Chicken",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "After the avalanche, it took us a week to climb out..."
    },
    {
      id: 3,
      date: "January 2019",
      author: {
        image: require("../../images/icon/thai-resto.jpeg"),
        name: "Authentic Thai",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "My money's in that office, right? If she start...  "
    }, {
      id: 3,
      date: "December 2018",
      author: {
        image: require("../../images/icon/the-fish-restaurant-logo.jpg"),
        name: "The Fish",
        url: "#"
      },
      post: {
        title: "Hello World!",
        url: "#"
      },
      body: "My money's in that office, right? If she start...  "
    }
  ]
};

export default Projects;
