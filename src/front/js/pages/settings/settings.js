import React, { useContext } from "react";
import { Context } from "../../store/appContext";
// import rigoImageUrl from "../../img/clock-(no-background).jpg";
import "../../../styles/home.scss";
import { Container, Card, Button, Nav, ListGroup, ListGroupItem } from "react-bootstrap";

export const Settings = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div className="my-3">
				<div className="fadein-animation d-flex">
					<div className="position-try">
						<sapn className="font-title">LateNoMore APP</sapn>
						<br />
						<sapn className="font-body text-justify">
							LateNoMore APP has been brought to you to ensure that your workers feel on a safe place
							regarding their job, you can control clock-in and clock-out and manage payments and wages so
							they can be aware of what
							{"'"}s going on.{" "}
						</sapn>
					</div>
					<img
						className="home-header"
						src="https://mms.businesswire.com/media/20201027005001/en/830831/5/Compass_Offices_Why_the_Office_remains_in_Japans_Future_Way_of_Working.jpg"
					/>
				</div>
			</div>
			<div className="margin mx-auto d-flex justify-content-around text-white">
				<div>
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="far fa-clock font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem className="bg-transparent">Cras justo odio</ListGroupItem>
							<ListGroupItem className="bg-transparent">Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem className="bg-transparent">Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-book font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem className="bg-transparent">Cras justo odio</ListGroupItem>
							<ListGroupItem className="bg-transparent">Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem className="bg-transparent">Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-user-cog font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem className="bg-transparent">Cras justo odio</ListGroupItem>
							<ListGroupItem className="bg-transparent">Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem className="bg-transparent">Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
				<div>
					<Card style={{ width: "18rem" }} className="shade-color3 border-0 fadein-animation">
						<Card.Body>
							<Card.Title>
								<i className="fas fa-globe font-size-xl" />
							</Card.Title>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the card
								{"'"}s content.
							</Card.Text>
						</Card.Body>
						<ListGroup className="list-group-flush">
							<ListGroupItem className="bg-transparent">Cras justo odio</ListGroupItem>
							<ListGroupItem className="bg-transparent">Dapibus ac facilisis in</ListGroupItem>
							<ListGroupItem className="bg-transparent">Vestibulum at eros</ListGroupItem>
						</ListGroup>
						<Card.Body>
							<Card.Link href="#" className="btn shade-button text-white">
								Card Link
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
			</div>
			<div className="my-3 container">
				<div>
					<Card className="shade-color4 border-0 text-white">
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
							<Button variant="primary" className="btn shade-button">
								Go somewhere
							</Button>
						</Card.Body>
					</Card>
				</div>
			</div>

			<div />
		</div>
	);
};
