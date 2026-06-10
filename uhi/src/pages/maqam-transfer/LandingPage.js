import React, { useEffect, useState } from 'react';
import { Container,Box } from '@mui/material';
import TransferSearchResults from '../../components/transfers/SearchResults';
import { useSearchTransfers } from '../../context/transfers/hooks'
import SearchresultsSkeleton from '../../components/skeleton/SearchresultsSkeleton';
import { useStoreActions } from 'easy-peasy';
//import { maqamSuppliers } from '../../api/TransferApi';
import { transferCategory } from '../../api/TransferCategoryApi';
import { transferType } from '../../api/TransferTypeApi';
import Constants from '../../helpers/constants'
import { useLocation } from 'react-router-dom';

const TransferPage = () => {
	const location = useLocation();
	let rebook = false;
	if(location.state !== null) {
		rebook = location.state.rebook ?? false;
	}
	const { searchTransfers, isLoading } = useSearchTransfers();
	//const [supplierlist, setSupplierData] = useState([]);
	const [categorylist, setCategoryData] = useState([]);
	const [transfertypelist, setTransferTypeData] = useState([]);
	const getTransferResults = useStoreActions(actions => actions.btoc.getTransferResults);

	const [ counter, setCounter ] = useState(0);


	useEffect(() => {
		const fetchTransfers = async () => {
			await getTransferResults(searchTransfers());
		}
		fetchTransfers()

		//const fetchMaqamSuppliers = async () => {
		//	const results = await maqamSuppliers();
		//	await setSupplierData(results);
		//}
		//fetchMaqamSuppliers()
		const fetchMaqamCategory = async () => {
			const category = await transferCategory();
			await setCategoryData(category)
		}
		fetchMaqamCategory()
		const fetchMaqamTransferType = async () => {
			const transferTypes = await transferType();
			await setTransferTypeData(transferTypes)
		}
		fetchMaqamTransferType()
	}, [counter])

	const handlerefresh = () => {
		setCounter(counter+1)
	}

	if (isLoading) return (<SearchresultsSkeleton stepperNo={Constants.STEP_TEXT_TRANSPORTATION} rebook={rebook}/>);
	return (
		<Box className="box-body-flex" sx={{ paddingTop: '32px!important' }}>
			<Container className="body-container-margin">
				<Container maxWidth='xl' sx={{ paddingLeft: '0!important', paddingRight: '0!important' }}>
					<TransferSearchResults categorylist={categorylist} transfertypelist={transfertypelist} handletryagain={handlerefresh} rebook={rebook}/>
				</Container>
			</Container>
		</Box>
	);
}

export default TransferPage;
