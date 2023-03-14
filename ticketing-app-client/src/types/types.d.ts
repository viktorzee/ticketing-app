export interface User {
    id: string;
    name: string;
    email:string;
    isAdmin: boolean
}

export interface ITicket {
    id: string;
    name: string;
    subject: string;
    assignedTo: string;
    priority: string;
    status: string;
    createDate: string;
    dueDate: string;
}

export interface ITicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket?: {
      id: string;
      requestBy: string;
      subject: string;
      assignedTo: string;
      priority: string;
      status: string;
      createDate: string;
      dueDate: string;
    };
}

export interface ITicketListProps {
    tickets: Ticket[];
    onEdit: (ticket: Ticket | null) => void;
}

export interface TableProps {
	headers: { field: string; use: string; use_in_search?: boolean }[];
	onSorting: (key: string, order: string) => void;
}

export interface PaginationProps {
	total: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (item: number) => void;
}
  