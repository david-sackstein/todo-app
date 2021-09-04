import { TodoItem } from 'src/app/modules/core/models/todo-item.model';
import { TodoList } from 'src/app/modules/core/models/todo-list.model';

export const TODO_LISTS: TodoList[] = [
  {
    id: 1,
    caption: 'Wake up',
    description: 'Tasks I do in the morning',
    image: '',
    url: '',
    color: '',
  },
  {
    id: 2,
    caption: 'Take kids to school',
    description: 'Tasks I do to prepare the kids for school',
    image: '',
    url: '',
    color: '',
  },
  {
    id: 3,
    caption: 'Work Items',
    description: 'Tasks I do every day at work',
    image: '',
    url: '',
    color: '',
  },
];

export const TODO_ITEMS: TodoItem[] = [
  {
    id: 1,
    caption: 'Brush my teeth',
    listId: 1,
    isCompleted: false,
  },
  {
    id: 2,
    caption: 'Shave',
    listId: 1,
    isCompleted: false,
  },
  {
    id: 3,
    caption: 'Snatch breakfast',
    listId: 1,
    isCompleted: false,
  },
  {
    id: 4,
    caption: 'Wake the kids',
    listId: 2,
    isCompleted: false,
  },
  {
    id: 5,
    caption: 'Help the kids to get dressed',
    listId: 2,
    isCompleted: false,
  },
  {
    id: 6,
    caption: 'Give the kids breakfast',
    listId: 2,
    isCompleted: false,
  },
  {
    id: 7,
    caption: 'Drive the kids to school',
    listId: 2,
    isCompleted: false,
  },
  {
    id: 8,
    caption: 'Drink coffee and chat for an hour',
    listId: 3,
    isCompleted: false,
  },
  {
    id: 9,
    caption: 'Read emails',
    listId: 3,
    isCompleted: false,
  },
  {
    id: 10,
    caption: 'Watch Netflix',
    listId: 3,
    isCompleted: false,
  },
];
