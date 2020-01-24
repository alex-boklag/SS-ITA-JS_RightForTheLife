import React, { useState, useEffect } from "react";
import { AnimalsList } from "../../components/AnimalsList";

export const AnimalsPage = () => {
	const dataApi =
		"https://alex-boklag.github.io/SSA-Demo-AnimalShelter/db/animals.json";
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		fetch(dataApi)
			.then(data => data.json())
			.then(list => setAnimals(list));
	}, []);

	return (
		<div className="animals-page bg-lightgray-100 min-h-screen pb-8">
			<AnimalsList animals={animals} />
		</div>
	);
};
