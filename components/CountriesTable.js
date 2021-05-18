import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import styles from '../styles/CountriesTable.module.css';

const CountriesTable = ({ countries }) => {
	return (
		<div>
			<TableContainer component={Paper}>
				<Table aria-label="customized table">
					<TableHead>
						<TableRow classes={{ root: styles.headRoot }}>
							<TableCell classes={{ root: styles.row, body: styles.head }}>Flag </TableCell>
							<TableCell classes={{ root: styles.row, body: styles.head }}>Name</TableCell>
							<TableCell classes={{ root: styles.row, body: styles.head }}>Population</TableCell>
							<TableCell classes={{ root: styles.row, body: styles.head }}>
								Area &nbsp;(Km<sup>2</sup>)
							</TableCell>
							<TableCell classes={{ root: styles.row, body: styles.head }}>Gini</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{countries.map((country) => (
							<Link href={`country/${country.alpha3Code}`} key={country.name}>
								<TableRow classes={{ root: styles.bodyRowRoot }}>
									<TableCell
										component="th"
										scope="row"
										classes={{ root: styles.row, body: styles.body }}
									>
										<img src={country.flag} className={styles.flag} alt={country.name} />
									</TableCell>
									<TableCell classes={{ root: styles.row, body: styles.body }}>
										{country.name}
									</TableCell>
									<TableCell classes={{ root: styles.row, body: styles.body }}>
										{country.population}
									</TableCell>
									<TableCell classes={{ root: styles.row, body: styles.body }}>
										{country.area}
									</TableCell>
									<TableCell classes={{ root: styles.row, body: styles.body }}>
										{country.gini ? country.gini + '%' : '0%'}
									</TableCell>
								</TableRow>
							</Link>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default CountriesTable;
