// ----------------------------------------------------------------------

function pxToRem(value) {
	return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg, lHeight }) {
	return {
		'@media (max-width:600px)': {
			fontSize: pxToRem(sm),
			lineHeight: lHeight
		},
		'@media (min-width:900px)': {
			fontSize: pxToRem(md)
		},
		'@media (min-width:1200px)': {
			fontSize: pxToRem(lg)
		}
	};
}

const FONT_PRIMARY = 'Montserrat, sans-serif';

const typography = {
	fontFamily: FONT_PRIMARY,
	fontWeightRegular: 400,
	fontWeightMedium: 500,
	fontWeightSemiBold: 600,
	fontWeightBold: 700,
	// buttonFontSizeLarge: pxToRem(16),
	// buttonFontSizeSmall: pxToRem(12),
	h1: {
		fontWeight: 700,
		lineHeight: 1.17,
		fontSize: pxToRem(52),
		...responsiveFontSizes({ sm: 34, md: 52, lg: 52, lHeight: 1.22 })
	},
	h2: {
		fontWeight: 700,
		lineHeight: 1.2,
		fontSize: pxToRem(44),
		...responsiveFontSizes({ sm: 31, md: 44, lg: 44, lHeight: 1.4 })
	},
	h3: {
		fontWeight: 700,
		lineHeight: 1.22,
		fontSize: pxToRem(36),
		...responsiveFontSizes({ sm: 28, md: 36, lg: 36, lHeight: 1.3 })
	},
	h4: {
		fontWeight: 600,
		lineHeight: 1.24,
		fontSize: pxToRem(30),
		...responsiveFontSizes({ sm: 24, md: 30, lg: 30, lHeight: 1.33 })
	},
	h5: {
		fontWeight: 700,
		lineHeight: 1.33,
		fontSize: pxToRem(24),
		...responsiveFontSizes({ sm: 21, md: 20, lg: 24, lHeight: 1.38 })
	},
	h6: {
		fontWeight: 700,
		lineHeight: 1.4,
		fontSize: pxToRem(20),
		...responsiveFontSizes({ sm: 17, md: 18, lg: 20, lHeight: 1.4 })
	},
	subtitle1: {
		fontWeight: 500,
		lineHeight: 1.33,
		fontSize: pxToRem(24),
		...responsiveFontSizes({ sm: 21, md: 24, lg: 24, lHeight: 1.38 })
	},
	subtitle2: {
		fontWeight: 500,
		lineHeight: 1.4,
		fontSize: pxToRem(20),
		...responsiveFontSizes({ sm: 17, md: 24, lg: 24, lHeight: 1.4 })
	},
	body1: {
		fontWeight: 500,
		lineHeight: 1.5,
		fontSize: pxToRem(16)
	},
	body2: {
		fontWeight: 500,
		lineHeight: 1.5,
		fontSize: pxToRem(14)
	},
	caption: {
		lineHeight: 1.6,
		fontSize: pxToRem(12),
		fontWeight: 400,
		/*letterSpacing: pxToRem(.09)*/
	},
	overline: {
		fontWeight: 500,
		lineHeight: 1.6,
		fontSize: pxToRem(12),
		// letterSpacing: 1.1,
		textTransform: 'uppercase'
	},
	button: {
		fontWeight: 600,
		lineHeight: 1.2,
		fontSize: pxToRem(14),
		textTransform: 'uppercase',
		//...responsiveFontSizes({ sm: 12, md: 14, lg: 16, lHeight: 1.2 })
	},
	tooltip: {
		fontWeight: 500,
		lineHeight: 1.6,
		fontSize: pxToRem(11)
	},
	inputLabel: {
		fontWeight: 500,
		lineHeight: 1.6,
		fontSize: pxToRem(15)
	},
};

export default typography;
