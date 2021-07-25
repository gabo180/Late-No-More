import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation">
					<img
						className="home-header"
						src="https://mms.businesswire.com/media/20201027005001/en/830831/5/Compass_Offices_Why_the_Office_remains_in_Japans_Future_Way_of_Working.jpg"
					/>
					<div className="position-try">
						<sapn className="font-title">LateNoMore APP</sapn>
						<br />
						<sapn className="font-body">
							LateNoMore APP has been brought to you to ensure that your workers <br /> feel on a safe
							place regarding their job, you can control clock-in and clock-out <br /> and manage payments
							and wages so they can be aware of what
							{"'"}s going on.{" "}
						</sapn>
					</div>
				</div>
			</div>
			<div className="margin mx-auto d-flex justify-content-around">
				<div>
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem>Cras justo odio</ListGroupItem>
							<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem>Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#">Card Link</Card.Link>
							<Card.Link href="#">Another Link</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem>Cras justo odio</ListGroupItem>
							<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem>Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#">Card Link</Card.Link>
							<Card.Link href="#">Another Link</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem>Cras justo odio</ListGroupItem>
							<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem>Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#">Card Link</Card.Link>
							<Card.Link href="#">Another Link</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem>Cras justo odio</ListGroupItem>
							<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem>Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#">Card Link</Card.Link>
							<Card.Link href="#">Another Link</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem>Cras justo odio</ListGroupItem>
							<ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem>Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#">Card Link</Card.Link>
							<Card.Link href="#">Another Link</Card.Link>
						</Card.Body>
					</Card>
				</div>
			</div>
			<div className="my-3 container">
				<div>
					<Card>
						<Card.Header>
							<Nav variant="tabs" defaultActiveKey="#first">
								<Nav.Item>
									<Nav.Link href="#first">Active</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href="#link">Link</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link href="#disabled">Disabled</Nav.Link>
								</Nav.Item>
							</Nav>
						</Card.Header>
						<Card.Body>
							<Card.Title>Special title treatment</Card.Title>
							<Card.Text>
								With supporting text below as a natural lead-in to additional content.
							</Card.Text>
							<Button variant="primary">Go somewhere</Button>
						</Card.Body>
					</Card>
				</div>
			</div>

			<div />
		</div>
	);
};
