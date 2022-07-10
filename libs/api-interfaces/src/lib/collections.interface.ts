import { Item } from './items.interface';
import { User } from './user.interface';

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
  liked: boolean;
  user: User;
  _count: {
    likes: number;
    shares: number;
    comments: number;
  };
}
