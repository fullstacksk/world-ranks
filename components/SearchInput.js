import { SearchRounded } from '@material-ui/icons';
import styles from '../styles/SearchInput.module.css';
const SearchInput = ({ ...rest }) => {
	return (
		<div className={styles.wrapper}>
			<SearchRounded />
			<input type="text" className={styles.input} {...rest} />
		</div>
	);
};

export default SearchInput;
