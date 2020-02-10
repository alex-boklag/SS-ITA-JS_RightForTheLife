import React from "react";
import { NavLink } from "react-router-dom";

import { withFetchDataIndicators } from "../../hoc/withFetchDataIndicators";
import { API } from "../../rootConstants";
import { DonateButton } from '../DonateButton';

const Footer = ({ data }) => {
	const { instagram, facebook, phone, email} = data;
	const iconsClassName = 'mx-2 text-3xl';

	return (
		<footer className="flex flex-col lg:flex-row flex-shrink-0 justify-center items-center py-3 bg-white shadow-md font-bold text-xl text-gray-600 my-16 lg:mb-0">
			<ul className="flex my-2">
				<li>
					<a
						href={instagram}
						target="_blank"
						rel='noopener noreferrer'
					>
						<i className={`fab fa-instagram-square text-pink-500 ${iconsClassName}`}></i>
					</a>
				</li>
				<li>
					<a
						href={facebook}
						target="_blank"
						rel='noopener noreferrer'
					>
						<i className={`fab fa-facebook-square text-blue-700 ${iconsClassName}`}></i>
					</a>
				</li>
				<li>
					<a href={`tel:${phone.replace('\'','')}`}>
						<i className={`fas fa-phone-square-alt text-green-500 ${iconsClassName}`}></i>
					</a>
				</li>
				<li>
					<a href={`mailto:${email}`}>
						<i className={`fas fa-envelope text-red-500 ${iconsClassName}`}></i>
					</a>
				</li>
			</ul>
			<span className="mx-24 my-2">Designed by SoftServe Inc.</span>
			<NavLink
				className="mx-4 cursor-pointer text-gray-600 hover:text-gray-700"
				exact
				to="/reports"
				activeClassName="text-gray-700"
			>
				Отчеты
			</NavLink>
			<div className="my-2"><DonateButton /></div>
		</footer>
	);
};

const wrappedComponent = withFetchDataIndicators(Footer, API.ABOUT_US);

export { wrappedComponent as Footer };