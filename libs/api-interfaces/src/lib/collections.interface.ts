import { Item } from './items.interface';

export interface CreateCollectionInput {
  name: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  user: any;
  _count: {
    likes: number;
    shares: number;
    comments: number;
  };
}
