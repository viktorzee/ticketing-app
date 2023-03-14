export interface Icolumn {
	//Used to get string data from the each row object
	field: string;

	//This will be used to display in the table heading.
	use: string;

	//Indicates that of this column should be used to search (optional). defaults to true.
	use_in_search?: boolean;

	//Indicates If this property should be used displayed in the table header (optional). defaults to true.
	use_in_display?: boolean;

	//Indicates if this field can be exported on the CSV (optional) defaults to true.
}
export type ItemsPerPageProps = number | undefined;

export type Icolumns = Icolumn[];
export interface Irow {
	[key: string]: any;
}
export type Irows = Irow[];

export interface IProps {
	columns: Icolumns;
	rows: Irows;
	items_Per_Page?: ItemsPerPageProps;
}

export interface UtilityIProps {
	rows: Irow[];
	columns: Icolumns;
	onSearch: (item: string) => void;
	export_csv_file?: Exportcsvfile;
}

export interface HeaderProps {
	onSorting: (key: string, order: string) => void;
}

