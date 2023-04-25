import menu from '../../styles/components/Menu.module.scss';

import Link from 'next/link';
import React, { ReactElement, useState, useEffect, use } from 'react';

const Menu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(menu.menu__hidden);
	const [isBlurred, setIsBlurred] = useState(
		menu.openedMenuContainer__visible
	);

	useEffect(() => {
		if (isOpen) {
			setIsVisible(menu.menu__visible);
			setIsBlurred(menu.openedMenuContainer__blurred);
		} else {
			setIsVisible(menu.menu__hidden);
			setIsBlurred(menu.openedMenuContainer__clear);
		}
	}, [isOpen]);

	useEffect(() => {
		window.addEventListener('keyup', (e) => {
			e.key === 'Escape' ? setIsOpen(false) : false; // On key up echap, exit menu
		});
	}, []);

	const menuList: ReactElement = (
		<div className={`${menu.openedMenuContainer} ${isBlurred}`}>
			<div
				className={`${menu.menuRestPage}`}
				onClick={() => setIsOpen(!isOpen)}
			></div>

			<div className={`${menu.menu} ${isVisible}`}>
				<div className={menu.closeContainer}>
					<div
						className={menu.close}
						onClick={() => setIsOpen(false)}
					></div>
				</div>
				<div className={menu.menuLinksContainer}>
					{[
						['Accueil', '/'],
						['Recettes', '/recettes'],
						['Contact me', 'mailto:marc.lachartre@gmail.com'],
					].map((links) => {
						return (
							<Link
								key={links[0]}
								href={links[1]}
								onClick={() => setIsOpen(false)}
							>
								{links[0]}
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);

	return (
		<div className={menu.menuContainer}>
			{menuList}
			<div className={menu.menuIconContainer}>
				<div
					className={menu.menuIcon}
					onClick={() => setIsOpen(!isOpen)}
				></div>
			</div>
		</div>
	);
};

export default Menu;
