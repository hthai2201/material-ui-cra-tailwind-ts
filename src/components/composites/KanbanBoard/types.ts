export type User = {
  id: string;
  name: string;
};

export type Task = {
  id: string;
  task_name: string;
  column_id: Column["id"];
  description: string;
  attachment_count: number;
  comment_count: number;
  due_date: string;
  assignees: User[];
  sort: number;
};

export type Column = {
  name: string;
  id: string;
};
