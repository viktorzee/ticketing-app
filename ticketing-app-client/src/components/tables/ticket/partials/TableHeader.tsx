import { useState } from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

import { TableProps } from '../../../../types/types';


export default function TableHeader({ headers, onSorting }: TableProps) {
	const [sortingKey, setSortingKey] = useState('id');
	const [sortingOrder, setSortingOrder] = useState('asc');

	const onSortChange = (key: string) => {
		const order = key === sortingKey && sortingOrder === 'asc' ? 'desc' : 'asc';
		setSortingOrder(order);
		setSortingKey(key);
		onSorting(key, order);
	};

	return (
		<thead className="">
			<tr className="">
				{headers.map(({ field, use, use_in_search }, index) => (
					<th
						className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
						key={index}
						onClick={() => (use_in_search ? onSortChange(field) : '')}>
						{use}

						{use_in_search && (
							<>
								{sortingKey &&
								sortingKey === field &&
								sortingOrder === 'asc' ? (
									<button>
										<FaCaretUp className="ml-2 no-print" />
									</button>
								) : (
									<button>
										<FaCaretDown className="ml-2 no-print" />
									</button>
								)}
							</>
						)}
					</th>
				))}
			</tr>
		</thead>
	);
}
