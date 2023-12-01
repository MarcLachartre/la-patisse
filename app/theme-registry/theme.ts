import { Nunito } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Nunito({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
});

const theme = createTheme({
	palette: {
		primary: {
			main: '#0c2733',
			// light: ,
			// dark: ,
			// contrastText:
		},
		secondary: {
			main: '#ff642b',
			dark: '#ff4805',
			contrastText: '#fff',
		},
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
		htmlFontSize: 10,
		fontSize: 16,
	},

	components: {
		MuiFilledInput: {
			styleOverrides: {
				// Name of the slot
				root: {
					// Some CSS
					backgroundColor: '#f3f3f3',
					'@media only screen and (min-width: 0px)': {
						fontSize: '1.6rem',
						lineHeight: '2.4rem',
					},
					'@media only screen and (min-width: 480px)': {
						fontSize: '1.65rem',
						lineHeight: '2.5rem',
					},
					'@media only screen and (min-width: 768px)': {
						fontSize: '1.8rem',
						lineHeight: '2.8rem',
					},
					'@media only screen and (min-width: 992px)': {
						fontSize: '1.8rem',
						lineHeight: '2.9rem',
					},
					'@media only screen and (min-width: 1200px)': {
						fontSize: '1.8rem',
						lineHeight: '2.9rem',
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					'@media only screen and (min-width: 0px)': {
						fontSize: '1.6rem',
						lineHeight: '2.4rem',
						'&.MuiInputLabel-shrink': {
							fontSize: '1.6rem',
							lineHeight: '1.6rem ',
						},
					},
					'@media only screen and (min-width: 480px)': {
						fontSize: '1.65rem',
						lineHeight: '2.5rem',
						'&.MuiInputLabel-shrink': {
							fontSize: '1.6rem',
							lineHeight: '1.65rem ',
						},
					},
					'@media only screen and (min-width: 768px)': {
						fontSize: '1.8rem',
						lineHeight: '2.8rem',
						'&.MuiInputLabel-shrink': {
							fontSize: '1.6rem',
							lineHeight: '1.8rem ',
						},
					},
					'@media only screen and (min-width: 992px)': {
						fontSize: '1.8rem',
						lineHeight: '2.9rem',
						'&.MuiInputLabel-shrink': {
							fontSize: '1.6rem',
							lineHeight: '1.8rem ',
						},
					},
					'@media only screen and (min-width: 1200px)': {
						fontSize: '1.8rem',
						lineHeight: '2.9rem',
						'&.MuiInputLabel-shrink': {
							fontSize: '1.6rem',
							lineHeight: '1.8rem ',
						},
					},
				},
			},
		},
	},
});

export default theme;
