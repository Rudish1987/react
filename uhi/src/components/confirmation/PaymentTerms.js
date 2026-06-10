import React, { useEffect } from 'react';
import { Grid, Modal, Typography, Box } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'
import Constants from '../../helpers/constants';
import { useLocale } from '../../context/LocaleContext';


export default function PaymentTerms({ openModal = false, handleModalClose }) {

	const [open, setOpen] = React.useState(openModal);
	const { locale } = useLocale();

	const handleClose = () => {
		handleModalClose()
	};

	useEffect(() => {
		setOpen(openModal)
	}, [openModal]);

	return (
		<Grid>
			{/* <Typography className="terms-text"><Checkbox {...label} />I have read and accept the booking <Button onClick={handleOpen} className="terms-cond">Terms and Conditions</Button></Typography> */}

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="modal-bg"
			>
				<Box className="modal-box">
					<Grid item container xs={12}>
						
						<Grid item xs={5}>
							<Typography className="modal-title" id="modal-modal-title" variant="h6" component="h2">
								Terms and Conditions
							</Typography>
						</Grid>
						{locale.value === Constants.LANGUAGES_EN &&
						<Grid item xs={6} sx={{ display: 'flex', alighItems: 'flex-end', justifyContent: 'flex-end', color: 'Secondary/Dark' }}>
							<ClearIcon className="closebutton-pos" onClick={handleClose} />
						</Grid>
						}
						{locale.value === Constants.LANGUAGES_AR &&
						<Grid item xs={6} sx={{ display: 'flex', alighItems: 'flex-end', justifyContent: 'flex-end', color: 'Secondary/Dark' }}>
							<ClearIcon className="closebutton-pos-ar" onClick={handleClose} />
						</Grid>
						}
					</Grid>
					<Grid id="modal-modal-description">
						<Typography className="modal-para-title">UHI TRAVEL, A DIVISION OF WEBBEDS FZ LLC (UHI) </Typography>
						<Typography className="modal-para-title">TERMS & CONDITIONS </Typography>
						<Typography className="modal-para">
							These Booking Terms & Conditions apply to the Client as defined in the Agent Commercial Agreement (the "Agency Agreement"),
							herein referred to as "you". In the event of any conflict between the terms of these Booking Terms & Conditions and those of the
							Agency Agreement, these Booking Terms and Conditions will prevail.
						</Typography>
						<Typography className="modal-para">The Website Policies and Terms & Conditions would be changed or updated occasionally to meet the requirements and standards.  </Typography>
						<Typography className="modal-para">1. Bookings</Typography>
						<Typography className="modal-para">i. Bookings can be made through the following:</Typography>
						<Typography className="modal-para">a) Website</Typography>
						<Typography className="modal-para">b) Call center (for those properties or services not found on the website)</Typography>
						<Typography className="modal-para">ii. Bookings should be made only for genuine reservations. UHI reserves, at our absolute discretion, the right to cancel FIT bookings
							made by the agency if they appear to have been made for the purpose of "holding space" for future sale or otherwise made in bad
							faith or contrary to this agreement.</Typography>
						<Typography className="modal-para">iii. UHI reserves the right to cancel any booking in case of a price loading error which results in an unrealistic booking value.
						</Typography>
						<Typography className="modal-para">iv. It is your responsibility to check all special conditions& important information of the bookings.</Typography>
						<Typography className="modal-para">v. It is your responsibility to ensure that all information in the bookings is correct.</Typography>
						<Typography className="modal-para">You will be liable for any charges incurred due to incorrect information given on the booking.
						</Typography>
						<Typography className="modal-para">vi. UHI voucher, which will be issued to clients via e-mail, should always be issued and given to the traveler. Any voucher manually
							issued from your side will be your responsibility. UHI should be notified prior to arrival if travelers are not carrying any voucher
							otherwise, UHI will not be responsible for any inconvenience/charges caused to the travelers because of not having the voucher.</Typography>
						<Typography className="modal-para">vii. All booking cancellations are subjected to the cancellation conditions of the booking.</Typography>
						<Typography className="modal-para">viii. All booking amendments are subjected to the amendment policy stated on the booking if there is any otherwise, it will follow
							the same deadlines & charges of the cancellation condition.</Typography>
						<Typography className="modal-para">ix. Any requests such as early check in, late check-out, high floors, adjoining, interconnecting, non-smoking and others alike will be
							requested from the hotel but, cannot be guaranteed.</Typography>
						<Typography className="modal-para">x. Bedding type should be requested at the time of booking and is subjected to hotelâ€™s availability.</Typography>
						<Typography className="modal-para">xi. If a triple room is booked, the extra bed provided by the hotel is commonly a roll-away bed.</Typography>
						<Typography className="modal-para">xii. When you wish to extend your booking, please add a new item under the same booking code and you must inform us via
							remarks or email about the extension.</Typography>
						<Typography className="modal-para">xiii. It is your responsibility to add and train â€˜agentsâ€™ or users under your account and to monitor all their bookings. You will be responsible for all payments due on such bookings.</Typography>
						<Typography className="modal-para">xiv. In the occasion where hotel is under renovation, all possible steps will be taken to limit disruptions to the guests. If the hotel is
							carrying out renovation while guests are in-house, this will not entitle you to any refunds.
						</Typography>

						<Typography className="modal-para">xv. We guarantee only the first night of the booking. Hotels may release the rooms after midnight on the day of arrival. If your
							guests are arriving late, it is your responsibility to inform us via remarks, email or contact the emergency number for last minutes
							changes, so we can advise the hotel to hold the rooms.</Typography>
						<Typography className="modal-para">xvi. Double bookings may result in both bookings being charged.
						</Typography>
						<Typography className="modal-para">xvii. Most hotels request for a credit card/cash to be given at the time of check in as guarantee for any extras which they will refund
							upon check out. UHI is not responsible for the extras incurred by the guests.</Typography>
						<Typography className="modal-para">xviii. Bookings can be made in multiple currencies such as USD, GBP, EUR, AED & SAR depending on the card type.
						</Typography>
						<Typography className="modal-para">xix. Bookings can be made using Mastercard, Visa, Amex & Diners.</Typography>
						<Typography className="modal-para">xx. We accept payments online using Visa and MasterCard credit/debit card in AED & USD only</Typography>
						<Typography className="modal-para">xxi. Bookings are not permissible from sanctioned countries such as Afghanistan, Israel, North Korea, Somalia, Sudan, Syria and
							Yemen.</Typography>

						<Typography className="modal-para">2. Rates</Typography>
						<Typography className="modal-para">i. The rates or prices at the time of booking confirmation will always prevail and your invoices will be raised according to this.</Typography>
						<Typography className="modal-para">ii. Hotels may offer special walk in rates from time to time according to their occupancy. On this occasion, we will not be entertaining any rate complaints if their published rate goes lower than UHI rates.</Typography>
						<Typography className="modal-para">iii. Any amendment done on a booking confirmed on a special rate, minimum/long-stay promotions may incur rate change. This is
							also applicable to no-shows.</Typography>
						<Typography className="modal-para">iv. Mark-ups, handling fees and commissions are not applicable on cancelled bookings with charges</Typography>
						<Typography className="modal-para">v. There may be an additional charge for services booked outside the normal hours, which will be communicated to you prior to
							service date.</Typography>
						<Typography className="modal-para">3. Payments and invoices</Typography>
						<Typography className="modal-para">i. All bookingsâ€™ invoices will be issued on the bookingâ€™s arrival date for credit customers and on payment date for
							prepayment customers. Credit agenciesâ€™ payment is due as per the number of days specified in your Agency Agreement</Typography>
						<Typography className="modal-para">ii. Any invoice queries should be raised no later than 15 days after the arrival date.</Typography>
						<Typography className="modal-para">iii. We reserve the right to suspend/block your system access, cancel all future bookings and/or terminate the contract if payments
							are not made as per the agreed period or deadline.</Typography>
						<Typography className="modal-para">iv. Payments made by credit card cannot be cancelled without cause.</Typography>
						<Typography className="modal-para">v. In the event of any cancellation by you, the cancellation policies of the relevant hotels may be applied to the cancellation and
							passed on to you, in which case any hotel cancellation charges that UHI incurs will be payable by you to UHI as a debt immediately
							due and payable, or applied to the credit card you have provided.</Typography>


						<Typography className="modal-para">4. Liability</Typography>
						<Typography className="modal-para">i. Other than as is specified in this agreement UHI is making no representations, undertakings or warranties to Client of any kind,
							and in particular (without limitation)</Typography>
						<Typography className="modal-para">i. UHI is making no representations, undertakings or warranties in relation to the UHI Inventory including as to the description of
							the UHI Inventory and availability of the UHI Inventory and has no liability in relation to those matters;</Typography>
						<Typography className="modal-para">ii. Any information provided on the Website in relation to the UHI Inventory is provided as general information and UHI shall not
							be liable if any such information is incorrect or inaccurate in any respect;</Typography>
						<Typography className="modal-para">iii. UHI is making no representations or warranties in relation to the Booking System and is not liable in any respect for any failure
							of the Booking System;</Typography>
						<Typography className="modal-para">iv. UHI is not liable for any Loss or any kind arising directly or indirectly out of the action of any hotel, transport company or any
							other person providing services comprised in the UHI Inventory.
						</Typography>
						<Typography className="modal-para">v. To the fullest extent permitted by law, you waive any rights of action or claims relating to or arising from the use of a credit card
							for the purposes of making a booking on the UHI website. Furthermore, you will fully indemnify and hold harmless UHI against all
							claims, actions or disputes brought against UHI by any credit card holder ("Claimant") relating to or arising from a booking made on
							the UHI website by you using the Claimant's credit card</Typography>
						<Typography className="modal-para">vi. Any disputes arising shall be governed by and construed in accordance with the laws of the United Arab Emirates.</Typography>

						<Typography className="modal-para">5. Child Policy</Typography>
						<Typography className="modal-para">i. Child/children should always be added on the booking and/or UHI should be informed prior to arrival date if there is/are any
							children coming with the parents. Hotels have different child policies & charges. Failure to do so may result in the guests being
							charged for the extra child/children or not being accommodated.</Typography>
						<Typography className="modal-para">ii. If meals are included on your booking, the property commonly provides meals for children aged 2 years old and below free of
							charge, children between 3-12 years old are commonly subject to extra meal charges, depending on the property.</Typography>
						<Typography className="modal-para">iii. For any transfers booking, if you are travelling with babies or infants, it is the responsibility of the guests to ensure they have the
							correct child/infant seat for use in the booked vehicle. Failure to do this could result in the service not taking place with no refund
							possible.</Typography>

						<Typography className="modal-para">6. Transfers</Typography>
						<Typography className="modal-para">i. All vehicles provided are based on 1 piece of medium-sized luggage per person. You have to inform us beforehand if your guests
							are planning to carry a bigger or more than 1 luggage per person as we may need to arrange a larger vehicle for this, with an extra
							cost. Failure to inform us may results in the driver charging your guests directly for any extras incurred.</Typography>

						<Typography className="modal-para">ii. Waiting time for the driver is 1 hour, guests need to be at the meeting point at least 5 minutes prior to the confirmed pick up time,
							if guests fail to show at the meeting point after an hour, driver will be released and service will be charged in full. For airport pickup,
							driver waiting time is 1 hour after the flight has landed.</Typography>

						<Typography className="modal-para">iii. It is your responsibility to update the details of your transfer booking through the system in case of any changes; and inform us
							accordingly prior to the service date so we can advise our suppliers/drivers.</Typography>

						<Typography className="modal-para">iv. For any last minutes changes, please ask your clients to contact the emergency number given on the voucher.
						</Typography>
						<Typography className="modal-para">v. Guests should be aware of the meeting point stated on the voucher and call the emergency number written on the voucher if they
							cannot locate the driver at the meeting point.</Typography>


						<Typography className="modal-para">7. Book Outs</Typography>
						<Typography className="modal-para">i. In situations where hotel is required to close due to reasons such as overbooking, system errors, government taking over the
							hotel/property for their use and other force majeure, UHI will endeavor to find a suitable alternative accommodation for your guests.
							UHI will try to offer alternative of the same category and location, whenever possible. You will be invoiced as per the hotel or
							accommodation bearing the lower cost.</Typography>

						<Typography className="modal-para">8. Complaints</Typography>

						<Typography className="modal-para">i. Any booking complaints should be raised no later than 30 days after departure date.
						</Typography>
						<Typography className="modal-para">ii. All complaints should be supported with proofs. Any unsupported complaints will not be entertained.
						</Typography>

						<Typography className="modal-para">9. Website Usage</Typography>

						<Typography className="modal-para">i. Any dispute or claim arising out of or in connection with this website shall be governed and construed in accordance with the laws
							of UAE.</Typography>

						<Typography className="modal-para">ii. United Arab of Emirates is our country of domicile.</Typography>

						<Typography className="modal-para">iii. Minors under the age of 18 shall are prohibited to register as a User of this website and are not allowed to transact or use the
							website.</Typography>

						<Typography className="modal-para">iv. If you make a payment for our products or services on our website, the details you are asked to submit will be provided directly
							to our payment provider via a secured connection.</Typography>

						<Typography className="modal-para">v. The cardholder must retain a copy of transaction records and Merchant policies and rules.
						</Typography>
						<Typography className="modal-para">vi. UHI will NOT deal or provide any services or products to any of OFAC (Office of Foreign Assets Control) sanctions countries in
							accordance with the law of UAE.</Typography>

						<Typography className="modal-para">vii. Multiple transactions may result in multiple postings to the cardholderâ€™s monthly statement.
						</Typography>


						<Typography className="end-text">
							Last Updated: Mon Sep 21, 2020 12:53:15 GMT+4h
						</Typography>
					</Grid>
				</Box>
			</Modal>
		</Grid>
	);
}
