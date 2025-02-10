export interface Task {
	id?: string;
	userId: string;
	title: string;
	priority: string;
	status: string;
	dueDate: Date;
}