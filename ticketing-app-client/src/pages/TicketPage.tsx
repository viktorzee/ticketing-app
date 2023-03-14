import React, { useEffect, useState } from 'react';

import {
	getAllTickets,
    selectAllTickets,
	selectTicketStatus,
} from '../state-management/features/ticketSlice';
import { useAppDispatch, useAppSelector } from '../state-management/hooks';

import { Irows, Icolumns } from '../types/table';
import LoadingSpinner from '../components/LoadingSpinner';
import TicketsTable from '../components/tables/ticket/TicketsTable';
import AddTicketModal from '../components/modals/AddTicketModal';
import { selectAllUsers } from '../state-management/features/userSlice';


const TicketPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const ticketStatus = useAppSelector(selectTicketStatus);
	const allTickets:Irows = useAppSelector(selectAllTickets);
	const allUsers = useAppSelector(selectAllUsers);
	const [errorMessage, setErrorMessage] = useState('');
	const [modalIsOpen, setModalOpen] = useState(false);

	console.log(allUsers)
	
	let ticketsColumns: Icolumns = [];

	useEffect(() => {
		if (ticketStatus === 'idle') {
			dispatch(getAllTickets())
				.unwrap()
				.then((promiseResult) => {
					setErrorMessage('');
				})
				.catch((errorResponse) => {
					setErrorMessage(errorResponse.message);
				});
		}
	}, [dispatch, ticketStatus]);


	if (allTickets && allTickets.length > 0) {
		ticketsColumns = [
			{
				field: 's/n',
				use: 'ID',
				use_in_search: true,
			},
			{
				field: 'name',
				use: 'Request By',
				use_in_search: true,
			},
			{
				field: 'subject',
				use: 'Subject',
				use_in_search: true,
			},			
			{
				field: 'assigned_to',
				use: 'Assigned To',
				use_in_search: true,
			},
			{
				field: 'priority',
				use: 'Priority',
				use_in_search: true,
			},
			{
				field: 'status',
				use: 'Status',
				use_in_search: true,
			},
			{
				field: 'createDate',
				use: 'Created Date',
				use_in_search: true,
			},
			{
				field: 'dueDate',
				use: 'Due Date',
				use_in_search: true,
			},
			{
				field: 'id',
				use: 'Actions',
				use_in_search: false,
			},
		];
	}

	return (
		<>
			{ticketStatus === 'pending' && <LoadingSpinner />}

			{errorMessage && (
				<div className="col-span-12 text-center bg-red-600 p-8 text-2xl text-white">
					{errorMessage}
				</div>
			)}

			<div className=' bg-gray-100 h-screen '>
				<div className="flex justify-between px-6 mt-2 mb-2 ">
					<h1 className="text-2xl font-bold mb-8">Tickets</h1>
					<div className="flex justify-between items-center mb-4">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setModalOpen(true)}
						>
						Create Ticket
						</button>
					</div>
				</div>

				<div className="grid grid-cols-12 px-6 ">
					<div className="col-span-12">
						{(allTickets.length === 0  && ticketStatus === 'pending' )&& (
							<p>Please wait while the table is loading...</p>
						)}
						{allTickets && allTickets.length > 0 && (
							<TicketsTable
								columns={ticketsColumns}
								rows={allTickets}
								// export_csv_file={`Tickets`}
							/>
						)}
					</div>

					
				</div>
				<div className='h-screen flex justify-center items-start'>
					{
							(allTickets.length === 0 &&
								(ticketStatus === 'idle' || ticketStatus === 'succeeded') 
							) 
							&&
							(
								<p className="text-center p-5 border-2 rounded-md border-red-300"
								>
									No Data...
								</p>
							)
						}
					</div>
			</div>
			{/* }  */}

			<AddTicketModal
				modalIsOpen={modalIsOpen}
				setModalOpen={setModalOpen}
			/>
		</>
	);
};

export default TicketPage;
