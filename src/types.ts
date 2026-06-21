export interface ActiveUser {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  isPremium: boolean;
}

export type SidebarTab =
  | 'dashboard'
  | 'workflows'
  | 'resumes'
  | 'job_search'
  | 'applications'
  | 'ats_optimizer'
  | 'documents'
  | 'reports'
  | 'settings';

export interface WorkflowStep {
  id: number;
  name: string;
  subtitle: string;
  time?: string;
  iconName: string;
  color: string;
  borderColor: string;
  bgLight: string;
}

export interface ActivityLog {
  id: string;
  event: string;
  detail: string;
  status: 'Completed' | 'Pending' | 'Failed';
  time: string;
  iconBg?: string;
  iconColor?: string;
}

export interface JobRole {
  id: string;
  title: string;
  matchPercent: number;
  iconBg: string;
  iconColor: string;
}
