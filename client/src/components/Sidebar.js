import React from "react";
import { ListGroup } from "react-bootstrap";

const Sidebar = () => {
  const rooms = ["first", "second", "third", "fourth"];

  return (
    <>
      <h2>Available Rooms</h2>
      <ListGroup>
        {rooms.map((room, id) => {
          return <ListGroup.Item key={id}>{room}</ListGroup.Item>;
        })}
      </ListGroup>
      <h2>Members</h2>
    </>
  );
};

export default Sidebar;
