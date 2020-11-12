import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootStore } from "../reducers";
import { UserComment } from "./UserComment";
import {PostInfo, UserInfo, LikeInfo} from '../states/states';
import { Like } from "./Like";

//Refers to the post-id
interface IProps{
  id:number
}

const initialState:UserInfo = {
    id:0,
    email:"",
    password: "",
    firstName: "",
    lastName:"",
    photo: ""
}


export const Post: React.FC<IProps> = (props:IProps) => {
  const postState = useSelector((state:RootStore):[PostInfo, LikeInfo[]]=> state.feed.postsAndLikes[props.id]);
  const usersState = useSelector((state:RootStore) => state.users);

  const [user, setUser] = useState<UserInfo>(initialState);

  
  
  const findUser = () =>{
    
    let i:any;
    for(i in usersState.users){
        if(postState[0].authorId === usersState.users[i].id){
          setUser(usersState.users[i]);
          
          break;
        }
    }
    // return(
    //   <h1>Hello</h1>
    // )
  }

  useEffect(()=>{
   findUser();
  }, [usersState])
  
  return (
    <>
      <Card className="mt-5">
        <Card.Body>
          <Card.Title>
            <img src="/images/defaultImage.svg" width="50"  alt="profile"/>
            <p className="m-2 d-inline">{user.firstName} {user.lastName}</p>
            {/* <p className="m-2 d-inline">{postState.authorId}</p> */}
          </Card.Title>
          <Card.Img variant="top" src="/images/apost.jpg" />
          <Card className="mb-4">
            <Container>
              <Row>
                <Col className="m-4">
                  <Card.Text>{ postState[0] && postState[0].content}</Card.Text>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Like post = {postState[0]} like = {postState[1]}/>
                </Col>
              </Row>
            </Container>
          </Card>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0" className="blue">
                Comments
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {/* Comments here */}
                  <UserComment />
                  <UserComment />
                  <UserComment />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Form className="mt-4">
            <Form.Group controlId="postComment">
              <Form.Control type="text" />
            </Form.Group>
            <Button className="blue">Enter comment</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
