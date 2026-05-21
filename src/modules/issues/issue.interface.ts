export interface IIssue {
  id?: number;
  reporter_id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}
