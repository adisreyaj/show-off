import { Item } from './items.interface';
import { User } from './user.interface';

export interface CreateCollectionInput {
  name: string;
  description: string;
}

export type UpdateCollectionInput = Pick<
  Collection,
  'name' | 'description' | 'private' | 'published'
>;

export interface Collection {
  id: string;
  name: string;
  description: string;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  private: boolean;
  published: boolean;
  user: User;
  comments: Comment[];
  _count: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: User;
}
