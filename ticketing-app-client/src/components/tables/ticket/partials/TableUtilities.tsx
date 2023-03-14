import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import { UtilityIProps } from '../../../../types/table';


export default function TableUtilities({
	onSearch,
}: UtilityIProps) {
	const [search, setSearch] = useState('');

	function onInputChange(value: any) {
		setSearch(value);
		onSearch(value);
		
	}

	return (
		<>
			
			<div className="flex mb-3">
				<div className="no-print relative flex  md:mt-0  md:float-right ">
					<button className="absolute w-2.5 h-2.5 ml-2 mr-2 top-3 bg-white">
						<FaSearch className="text-gray-600 h-4 w-4  fill-current" />
					</button>
					<input
						className="text-xs py-2 h-10 px-4 pl-6 w-80 focus:outline-none leading-9 tracking-wide 
			text-gray-700 border border-gray-300 bg-gray-100 rounded-lg"
						type="text"
						placeholder="SEARCH..."
						value={search}
						onChange={(e) => onInputChange(e.target.value)}
					/>
				</div>
			</div>
		</>
	);
}
