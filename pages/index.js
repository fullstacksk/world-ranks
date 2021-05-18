import { Grid } from '@material-ui/core';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import CountriesTable from '../components/CountriesTable';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import styles from '../styles/Home.module.css';

export default function Home({ countries }) {
	const [ keyword, setKeyword ] = useState('');
	const onInputChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};
	const filteredCountries = countries.filter(
		(country) =>
			country.name.toLowerCase().includes(keyword) ||
			country.region.toLowerCase().includes(keyword) ||
			country.subregion.toLowerCase().includes(keyword)
	);
	// console.table(countries);
	return (
		<Layout>
			<Grid container alignItems="center">
				<Grid item xs={4}>
					<div className={styles.count}>Found : {filteredCountries.length} Countries</div>
				</Grid>
				<Grid item xs={8}>
					<SearchInput placeholder="Search by name, Region or Subregion" onChange={onInputChange} />
				</Grid>
				<Grid item xs={12} className={styles.margin_top}>
					<CountriesTable countries={filteredCountries} />
				</Grid>
			</Grid>
		</Layout>
	);
}

export const getStaticProps = async () => {
	try {
		const res = await fetch('https://restcountries.eu/rest/v2/all');
		const countries = await res.json();
		return {
			props: {
				countries
			}
		};
	} catch (err) {
		console.log(err);
	}
};
