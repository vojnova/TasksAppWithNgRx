import { Task } from '../../tasks/models/task';
import { LoremIpsum } from 'lorem-ipsum';
import { v4 as uuid } from 'uuid';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  tasksIds: string[];
  tasks?: Task[];
}

export const createTestUser = (): User => {
  return {
    id: uuid(),
    name: lorem.generateWords(2),
    email: lorem.generateWords(1) + '@mail.bg',
    title: lorem.generateWords(1),
    tasksIds: [],
  };
};
