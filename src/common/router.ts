import { faTable } from '@fortawesome/free-solid-svg-icons';

export interface RouteConfig {
  name: string,
  key: string;
  icon: any;
}

export const dataRoutes: RouteConfig[] = [
  {
    key: 'jobs',
    name: '工作',
    icon: faTable
  },
  {
    key: 'companies',
    name: '公司',
    icon: faTable
  },
  {
    key: 'projects',
    name: '项目',
    icon: faTable
  },
  {
    key: 'addresses',
    name: '地址',
    icon: faTable
  }
]