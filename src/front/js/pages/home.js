import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Container } from "react-bootstrap";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			<div>
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
			<div />
			<div />
			<div />
		</div>
	);
};
