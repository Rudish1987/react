// ----------------------------------------------------------------------
import styles from '../../style/scss/style.module.scss';
import { useStoreState } from 'easy-peasy';

export default function Button(theme) {
	const isWhiteLabel = useStoreState(s => s.whitelabel.isWhiteLabel)
	const layoutDetails = useStoreState(s => s.whitelabel.layoutDetails)
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					// fontSize:'15px',
					fontWeight: 600,

					'&.Mui-disabled': {
						backgroundColor: 'rgba(0, 0, 0, 0.12)',
						color: 'rgba(0, 0, 0, 0.26)',
						border: '1px solid rgba(0, 0, 0, 0.12)'
					},
					'&.MuiButton-outlined.Mui-disabled': {
						backgroundColor: 'rgba(0, 0, 0, 0.12)',
						color: 'rgba(0, 0, 0, 0.26)',
						border: '1px solid rgba(0, 0, 0, 0.12)',
						boxShadow: 'none'
					},
					'&.MuiButton-contained.Mui-disabled': {
						backgroundColor: 'rgba(0, 0, 0, 0.12)',
						color: 'rgba(0, 0, 0, 0.26)',
						border: 'none'
					},

					[theme.breakpoints.down('lg')]: {
						height: '56px',
						padding: '6px 16px',
						fontSize: 14
					},
					[theme.breakpoints.down('sm')]: {
						height: '40px',
						padding: '4px 10px',
						fontSize: 12
					},
					borderRadius: '4px',
					boxShadow: 'none',
					lineHeight: '120%'
				},
				sizeLarge: {
					height: styles.buttonLargeHeight,
					fontSize: 16,
					padding: '8px 22px',
					letterSpacing: '0.12px',

				},
				sizeMedium: {
					height: 40,
					fontSize: 14,
					padding: '6px 16px',
					letterSpacing: '0.105px',


				},
				sizeSmall: {
					height: 30,
					fontSize: 12,
					padding: '4px 10px',
					letterSpacing: '0.105px',
				},
				containedInherit: {
					color: styles.greyScale700,
					boxShadow: theme.customShadows.z8,
					'&:hover': {
						backgroundColor: theme.palette.grey[400]
					},
				},
				containedPrimary: {
					backgroundColor: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryMainColor,
					color: isWhiteLabel ? layoutDetails.details.colors.ButtonTextColor : styles.greyScaleWhite,
					//boxShadow: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : theme.customShadows.primary,
					'&:hover': {
						//boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.20)',
						background: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryDarkColor
					},
					'&:focus': {
						backgroundColor: styles.primaryMainColor,
						//background: 'var(--common-white-30-p-ripple, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(255, 255, 255, 0.30) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
						background: 'var(Common/White/30p Ripple,rgba(255, 255, 255, 0.3)rgba(255, 255, 255, 0))'
					}
				},
				containedSecondary: {
					background: styles.secondaryMainColor,
					backgroundColor: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.secondaryMainColor,
					color: isWhiteLabel ? layoutDetails.details.colors.ButtonTextColor : styles.greyScaleWhite,
					boxShadow: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : theme.customShadows.secondary,
					'&:hover': {
						background: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.secondaryDarkColor,
						/* Elevation/4 */
						//boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.20)'
					},
					'&:focus': {
						backgroundColor: styles.secondaryDarkColor,
						//background: 'var(--common-white-30-p-ripple, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(255, 255, 255, 0.30) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
						background: 'var(Common/White/30p Ripple,rgba(255, 255, 255, 0.3)rgba(255, 255, 255, 0))'
					}
				},
				containedError: {
					/* Elevation/2 */
					boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)',
					'&:hover': {
						background: styles.errorDarkColor,
						/* Elevation/4 */
						boxShadow: '0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.20)'
					},
				},
				outlined: {
					border: '1px solid',
					backgroundColor: styles.greyScaleWhite,
					color: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryMainColor,
					'&:hover': {
						backgroundColor: styles.greyScale100,
						color: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryMainColor,
						borderColor: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryMainColor
					},
					'&:focus': {
						//background: 'var(--radial-button-effect, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(178, 178, 178, 0.35) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
						background: 'var(Radial/Button Effect,rgba(178, 178, 178, 0.35),rgba(255, 255, 255, 0))'
					}
				},
				outlinedSecondary: {
					border: '1px solid',
					borderColor: styles.secondaryMainColor,
					color: styles.secondaryMainColor,
					'&:hover': {
						border: `1px solid ${styles.greyScale600}`,
						backgroundColor: styles.greyScale100
					},
					'&:focus': {
						border: `1px solid ${styles.greyScale600}`,
						background: 'var(Common/White/30p Ripple,rgba(255, 255, 255, 0.3)rgba(255, 255, 255, 0))'
					}
				},
				outlinedError: {
					border: '1px solid rgba(211, 47, 47, 0.50))',
					'&:hover': {
						border: '1px solid rgba(211, 47, 47, 0.50)',
						background: 'rgba(211, 47, 47, 0.04)'
					},
					'&:focus': {
						borderColor: 'rgba(211, 47, 47, 0.50)',
						background: 'var(--light-error-shades-30-p-ripple, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(211, 47, 47, 0.30) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
					}
				},
				outlinedWarning: {
					'&:hover': {
						border: '1px solid rgba(237, 108, 2, 0.50)',
						background: 'rgba(237, 108, 2, 0.04)'
					},
					'&:focus': {
						background: 'var(--light-warning-shades-30-p-ripple, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(237, 108, 2, 0.30) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
					}
				},
				outlinedInfo: {

					'&:hover': {
						border: '1px solid rgba(2, 136, 209, 0.50)',
						background: 'rgba(2, 136, 209, 0.04)'
					},
					'&:focus': {
						border: '1px solid rgba(2, 136, 209, 0.50)',
						background: 'var(--light-info-shades-30-p-ripple, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(2, 136, 209, 0.30) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
					}
				},
				outlinedSuccess: {

					'&:hover': {
						border: '1px solid rgba(46, 125, 50, 0.50)',
						background: 'rgba(46, 125, 50, 0.04)'
					},
					'&:focus': {
						border: '1px solid rgba(46, 125, 50, 0.50)',
						background: 'var(--light-success-shades-30-p-ripple, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(46, 125, 50, 0.30) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
					}
				},
				outlinedInherit: {
					border: '1px solid',
					backgroundColor: styles.greyScaleWhite,
					color: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.greyScale600,
					'&:hover': {
						backgroundColor: styles.greyScale100,
						color: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryMainColor,
						borderColor: isWhiteLabel ? layoutDetails.details.colors.ButtonColor : styles.primaryMainColor
					},
					'&:focus': {

						background: 'var(--radial-button-effect, radial-gradient(36.59% 100.80% at 50.00% 50.00%, rgba(178, 178, 178, 0.35) 99.54%, rgba(255, 255, 255, 0.00) 100%))'
					}
				},
				textInherit: {
					color: styles.greyScale600,
					'&:hover': {
						backgroundColor: styles.greyScale100
					}
				},
				text: {
					'&:hover': {
						backgroundColor: styles.greyScale100
					},
				},
				textError: {

					'&:hover': {
						backgroundColor: styles.errorShade4,

					}
				},
				textWarning: {

					'&:hover': {
						backgroundColor: styles.warningShade4,

					}
				},
				textInfo: {

					'&:hover': {
						backgroundColor: styles.infoShade4,

					}
				},
				textSuccess: {

					'&:hover': {
						backgroundColor: styles.successShade4,

					}
				}
			}
		}
	};
}
