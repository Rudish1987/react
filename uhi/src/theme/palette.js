import { alpha } from '@mui/material/styles';
import styles from '../style/scss/style.module.scss';

// ----------------------------------------------------------------------
// console.log('styles', styles)
function createGradient(color1, color2) {
	return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
	0: '#FFFFFF',
	50: '#FAFAFA',
	100: styles.greyScale100,
	200: styles.greyScale200,
	300: styles.greyScale300,
	400: styles.greyScale400,
	500: styles.greyScale500,
	600: styles.greyScale600,
	700: styles.greyScale700,
	800: styles.greyScale800,
	900: styles.greyScale900,
	500_8: alpha('#919EAB', 0.08),
	500_12: alpha('#919EAB', 0.12),
	500_16: alpha('#919EAB', 0.16),
	500_24: alpha('#919EAB', 0.24),
	500_32: alpha('#919EAB', 0.32),
	500_48: alpha('#919EAB', 0.48),
	500_56: alpha('#919EAB', 0.56),
	500_80: alpha('#919EAB', 0.8)
};

const PRIMARY = {
	lighter: '#f5d7d6',
	light: styles.primaryLightColor,
	main: styles.primaryMainColor,
	dark: styles.primaryDarkColor,
	darker: '#540703',
	contrastText: '#fff'
};
const SECONDARY = {
	lighter: '#D6E4FF',
	light: styles.secondaryLightColor,
	main: styles.secondaryMainColor,
	dark: styles.secondaryDarkColor,
	darker: '#091A7A',
	contrastText: '#fff'
};
const INFO = {
	lighter: '#D0F2FF',
	light: styles.infoLightColor,
	main: styles.infoMainColor,
	dark: styles.infoDarkColor,
	darker: '#04297A',
	contrastText: '#fff'
};
const SUCCESS = {
	lighter: '#E9FCD4',
	light: styles.successLightColor,
	main: styles.successMainColor,
	dark: styles.successDarkColor,
	darker: '#08660D',
	contrastText: 'fff'
};
const WARNING = {
	lighter: '#FFF7CD',
	light: styles.warningLightColor,
	main: styles.warningMainColor,
	dark: styles.warningDarkColor,
	darker: '#7A4F01',
	contrastText: '#fff'
};
const ERROR = {
	lighter: '#FFE7D9',
	light: styles.errorLightColor,
	main: styles.errorMainColor,
	dark: styles.errorDarkColor,
	darker: '#7A0C2E',
	contrastText: '#fff'
};

const GRADIENTS = {
	primary: createGradient(PRIMARY.light, PRIMARY.main),
	info: createGradient(INFO.light, INFO.main),
	success: createGradient(SUCCESS.light, SUCCESS.main),
	warning: createGradient(WARNING.light, WARNING.main),
	error: createGradient(ERROR.light, ERROR.main)
};

const CHART_COLORS = {
	violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
	blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
	green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
	yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
	red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4']
};

const palette = {
	common: { black: '#000', white: '#fff' },
	fontWeight:{},
	primary: { ...PRIMARY },
	secondary: { ...SECONDARY },
	info: { ...INFO },
	success: { ...SUCCESS },
	warning: { ...WARNING },
	error: { ...ERROR },
	grey: GREY,
	gradients: GRADIENTS,
	chart: CHART_COLORS,
	divider: GREY[500_24],
	text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
	background: { paper: '#fff', default: GREY[200], neutral: GREY[200] },
	action: {
		active: GREY[600],
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48
	}
};

export default palette;