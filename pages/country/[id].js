import { Card, CardContent, CardMedia, Divider, Grid, StylesProvider, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/[id].module.css';

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

	const country = await res.json();

	return country;
};

const Country = ({ country }) => {
	const [ borders, setBorders ] = useState([]);

	const getBorders = async () => {
		const borders = await Promise.all(country.borders.map((border) => getCountry(border)));

		setBorders(borders);
	};

	useEffect(() => {
		getBorders();
	}, []);
	return (
		<Layout title={country.name}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={4}>
					<Card>
						<CardMedia
							component="img"
							alt={country.name}
							height="200"
							image={country.flag}
							title={country.flag}
						/>
						<CardContent>
							<h4>{country.name}</h4>
							<div className={styles.flex}>
								<div className={styles.flexColumn}>
									<h5>{country.population}</h5>
									<h5 className={styles.textColor}>Population</h5>
								</div>
								<div className={styles.flexColumn}>
									<h5>{country.area}</h5>
									<h5 className={styles.textColor}>Area</h5>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} md={8}>
					<Card>
						<CardContent>
							<h4>Detail</h4>
							<Divider />
							<div className={styles.flex}>
								<h5 className={styles.textColor}>Capital</h5>
								<h5>{country.capital}</h5>
							</div>
							<Divider />
							<div className={styles.flex}>
								<h5 className={styles.textColor}>Languages</h5>
								<h5>{country.languages.map(({ name }) => name).join(', ')}</h5>
							</div>
							<Divider />
							<div className={styles.flex}>
								<h5 className={styles.textColor}>Currencies</h5>
								<h5>{country.currencies.map(({ name }) => name).join(', ')}</h5>
							</div>
							<Divider />
							<div className={styles.flex}>
								<h5 className={styles.textColor}>Native Name</h5>
								<h5>{country.nativeName}</h5>
							</div>
							<Divider />
							<div className={styles.flex}>
								<h5 className={styles.textColor}>Gini</h5>
								<h5>{country.gini}</h5>
							</div>
							<Divider />

							<div className={styles.flex}>
								<h5 className={styles.textColor}>Neighbour Countries</h5>
							</div>
							<div className={styles.flex} style={{ marginTop: 16 }}>
								{borders.map(({ name, flag }) => {
									return (
										<div className={styles.flexColumn}>
											<img src={flag} alt={name} className={styles.neighbour} />
											<h5>{name}</h5>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Layout>
	);
};

export const getServerSideProps = async ({ params }) => {
	try {
		const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${params.id}`);
		const country = await res.json();
		return {
			props: {
				country
			}
		};
	} catch (err) {
		console.log(err);
	}
};

export default Country;
