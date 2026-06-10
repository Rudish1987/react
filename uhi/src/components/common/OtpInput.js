import React from 'react';
import '../../css/otp.css';

const OtpInput = ({fieldLength, setStateValue}) => {
	const [otp, setOtp] = React.useState(new Array(fieldLength).fill(''));

	const handleChange = (element, index) => {
		if (isNaN(element.value)) return false;

		setOtp([...otp.map((d, idx) => (idx === index) ? element.value : d)])
		setStateValue([...otp.map((d, idx) => (idx === index) ? element.value : d)])

		if (element.nextSibling) {
			element.nextSibling.focus();
		}
	}

	return (
		<>
			{otp.map((data, index) => {
				return (
					<input
						className="otp-field"
						name="otp"
						maxLength='1'
						key={index}
						value={data}
						onChange={e => handleChange(e.target, index)}
						onFocus={e => e.target.select()}
					/>
				)
			})}
		</>
	)
}

export default OtpInput
