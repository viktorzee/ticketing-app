import { useState, useMemo } from 'react';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

import Pagination from './partials/Pagination';
import TableUtilities from './partials/TableUtilities';
import TableHeader from './partials/TableHeader';

import { useAppDispatch } from '../../../state-management/hooks';
import { destroy, getTicketById } from '../../../state-management/features/ticketSlice';

import { IProps, Irow } from '../../../types/table';
import ViewTicketModal from '../../modals/ViewTicketModal';
import EditTicketModal from '../../modals/EditTicketModal';

export default function TicketsTable({
	columns,
	rows,
	items_Per_Page,
}: IProps) {
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [editModalIsOpen, setEditModalOpen] = useState(false);
	const [viewModalIsOpen, setViewModalOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [sorting, setSorting] = useState({
		key: '',
		order: '',
	});

	const dispatch = useAppDispatch()

	let ITEMS_PER_PAGE = items_Per_Page;
	if (typeof ITEMS_PER_PAGE === 'undefined') {
		ITEMS_PER_PAGE = 10;
	}

	let headers: { field: string; use: string; use_in_search?: boolean }[] =
		columns;

	let sortedData: any = [];

	sortedData = useMemo(() => {
		let computedData = rows;
		if (search) {
			computedData = computedData.filter(
				(item) =>
					item.name.toLowerCase().includes(search.toLowerCase()) ||
					item.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
					item.subject.toLowerCase().includes(search.toLowerCase())
					// item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		setTotalItems(computedData.length);
		//Sorting data

		if (sorting.key) {
			const reversed = sorting.order === 'asc' ? 1 : -1;

			computedData = [...computedData].sort((a: any, b: any): any => {
				let keyA = a[sorting.key];
				let keyB = b[sorting.key];
				if (typeof keyA == 'string' && typeof keyB == 'string') {
					return reversed * keyA.localeCompare(keyB);
				}
				if (typeof keyA == 'number' && typeof keyB == 'number') {
					return reversed * (keyA - keyB);
				}
			});

		}

		//current Page Slice
		if (typeof ITEMS_PER_PAGE !== 'undefined') {
			return computedData.slice(
				(currentPage - 1) * ITEMS_PER_PAGE,
				(currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
			);
		}
	}, [rows, currentPage, search, sorting, ITEMS_PER_PAGE]);
	


	//handle delete
	const handleDelete = async (id: string) => {
		const confirmResult = await Swal.fire({
		  title: 'Are you sure?',
		  text: 'You will not be able to recover this ticket!',
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#d33',
		  cancelButtonColor: '#3085d6',
		  confirmButtonText: 'Yes, delete it!'
		});
	  
		if (confirmResult.isConfirmed) {
		  try {
			await dispatch(destroy(id));
			await Swal.fire({
			  title: 'Deleted!',
			  text: 'Your ticket has been deleted.',
			  icon: 'success',
			  timer: 2000,
			  showConfirmButton: false
			});
			window.location.reload(); // reload the page
		  } catch (err) {
			console.log(err);
			await Swal.fire({
			  title: 'Error!',
			  text: 'An error occurred while deleting the ticket.',
			  icon: 'error',
			  timer: 2000,
			  showConfirmButton: false
			});
		  }
		}
	  };
	  


	//render sorted data
	const renderedData = sortedData.map((column: Irow, index: number) => {
		const created_date = new Date(column.createDate);
		const due_date = new Date(column.dueDate);

		return(
			<tr className="table-black text-center  hover:bg-gray-50" key={column.id}>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">#{index+1}</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{column.name}</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{column.subject}</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{column.assignedTo}</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{column.priority}</td>
				<td className="px-5 py-5 border-b border-gray-200 text-sm">
					<span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${column.status === 'open' ? 'text-green-900' : column.status === 'pending' ? 'text-yellow-900' : 'text-green-900'}`}>
					<span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${column.status === 'open' ? 'bg-green-200' : column.status === 'pending' ? 'bg-yellow-200' : 'bg-green-200'}`}></span>
					<span className="relative">{column.status}</span>
					</span>
				</td>				
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{created_date.toLocaleDateString()}</td>
				<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{due_date.toLocaleDateString()}</td>
				<td className='flex px-5 py-5  justify-center items-center'>
					<FaEye color='blue'  
						onClick={() =>{ 
							dispatch(getTicketById(column.id))
							setViewModalOpen(true)
						}}
						className="cursor-pointer"
					/>
					<FaEdit className="ml-2 cursor-pointer" color='green' 
						onClick={() =>{ 
							dispatch(getTicketById(column.id))
							setEditModalOpen(true)
						}} 
					/>
					<FaTrash className="ml-2 cursor-pointer" color='red' onClick={() => handleDelete(column.id)} />
				</td>
			</tr>
		)
	});

	

	return (
		<div className='bg-white p-5 rounded-3xl'>
			<div className="grid grid-cols-12 justify-between ">
				<TableUtilities
					rows={rows}
					columns={columns}
					onSearch={(value: string) => {
						setSearch(value);
						setCurrentPage(1);
					}}
				/>
			</div>

			<div className="border-1 border-gray-200 mt-1 shadow-lg overflow-x-auto">
				<table className="table-black border-collapse w-full ">
					<TableHeader
						headers={headers}
						onSorting={(key, order) => setSorting({ key, order })}
					/>
					<tbody>{renderedData}</tbody>
				</table>
			</div>
			<div className="p-8">
				<Pagination
					total={totalItems}
					itemsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</div>

			<EditTicketModal  editModalIsOpen={editModalIsOpen} setEditModalOpen={setEditModalOpen}  />
			<ViewTicketModal  viewModalIsOpen={viewModalIsOpen} setViewModalOpen={setViewModalOpen}  />

			
		</div>
	);
}
