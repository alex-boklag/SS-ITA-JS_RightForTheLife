import React from "react";
import { API } from "../../rootConstants";
import { withPagination } from "../../hoc/withPagination";
import { withFetchDataIndicators } from "../../hoc/withFetchDataIndicators";
import { AnimalCard } from "../../components/AnimalCard/AnimalCard";

const AnimalsList = ({ data }) => (
	<ul className="flex flex-wrap justify-center mb-8">
		{ data.map(animal => <AnimalCard key={animal._id} animal={animal} />) }
	</ul>
);

const wrappedComponent = withFetchDataIndicators(
  withPagination(AnimalsList, 8),
  API.ANIMALS,
  true
);

export { wrappedComponent as AnimalsList };
