// ----------------------------------------------------------------------

// import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

export default function Typography(theme) {
	return {
		MuiTypography: {
			styleOverrides: {
				paragraph: {
					marginBottom: theme.spacing(2)
				},
				gutterBottom: {
					marginBottom: theme.spacing(1)
				},
				caption:{
					fontSize:16,
					fontWeight:600
				}
			}
		}
	};
}
