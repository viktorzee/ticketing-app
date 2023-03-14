import React, { useCallback, useState } from 'react';
import { useMemo, useEffect } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import { PaginationProps } from '../../../../types/types';

export default function Pagination({
	total = 0,
	itemsPerPage = 3,
	currentPage = 1,
	onPageChange,
}: PaginationProps) {
	const [totalPages, setTotalPages] = useState(0);
	const [activePage, setActivePage] = useState(false);

	useEffect(() => {
		if (total > 0 && itemsPerPage > 0)
			setTotalPages(Math.ceil(total / itemsPerPage));
	}, [total, itemsPerPage]);

	const handleClick = useCallback(
		(index: number) => {
			setActivePage(!activePage);
			onPageChange(index);
		},
		[activePage, onPageChange]
	);
	const paginationItems = useMemo(() => {
		const pages = [];

		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<button
					className={`px-4 py-2 text-white border shadow-md ${
						i === currentPage ? 'bg-green-500  shadow-md' : 'text-green-500'
					}`}
					key={i}
					onClick={() => handleClick(i)}>
					{i}
				</button>
			);
		}

		return pages;
	}, [totalPages, currentPage, handleClick]);

	let renderedPaginationItems = (
		<div className="no-print flex items-center justify-end space-x-1">
			<button
				className={`${
					currentPage === 1
						? 'bg-gray-200 text-gray-700 cursor-not-allowed'
						: 'text-gray-500'
				} flex items-center px-4 py-2   border shadow-md`}
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}>
				<FaCaretLeft />
			</button>

			{paginationItems}
			<button
				className={`${
					currentPage === totalPages
						? 'bg-gray-200 text-gray-700 cursor-not-allowed'
						: 'text-gray-500'
				} flex items-center px-4 py-2   border shadow-md`}
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				<FaCaretRight />
			</button>
		</div>
	);

	return <>{totalPages > 1 && renderedPaginationItems}</>;
}
