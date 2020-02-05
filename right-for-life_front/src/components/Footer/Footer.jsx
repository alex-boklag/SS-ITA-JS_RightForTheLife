import React from "react";
import { NavLink } from "react-router-dom";

import { DonateButton } from '../DonateButton';

import logo from "../../assets/logo.jpg";

export const Footer = () => {
	const iconsClassName = 'mx-2 text-3xl';

	return (
		<footer className="flex flex-shrink-0 justify-center items-center py-3 bg-white shadow-md font-bold text-xl text-gray-600">
			<ul className="flex">
				<li>
					<a
						href="https://www.facebook.com/FOND.Mi.za.pravo.na.zhizn/?ref=page_internal"
						target="_blank"
						rel='noopener noreferrer'
					>
						<i className={`fab fa-facebook-square text-blue-700 ${iconsClassName}`}></i>
					</a>
				</li>
				<li>
					<a href="tel:093235037">
						<i className={`fas fa-phone-square-alt text-green-500 ${iconsClassName}`}></i>
					</a>
				</li>
				<li>
					<a href="mailto:olyaum76@gmail.com">
						<i className={`fas fa-envelope text-red-500 ${iconsClassName}`}></i>
					</a>
				</li>
			</ul>
			<span className="mx-24">Designed by SoftServe Inc.</span>
			<DonateButton />
		</footer>
	);
};