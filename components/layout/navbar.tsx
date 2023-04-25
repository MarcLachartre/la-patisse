import Link from 'next/link';
import navbar from '../../styles/components/Navbar.module.scss';
import Menu from './menu';

const Navbar = () => {
	return (
		<div className={`${navbar.navbarContainer} print-hide`}>
			<div className={navbar.navbarLinks}>
				<Link href="/" className={navbar.logo}></Link>
				<Link href="/">Accueil</Link>
				<Link href="/recettes">Recettes</Link>
			</div>
			<Menu />
		</div>
	);
};

export default Navbar;
