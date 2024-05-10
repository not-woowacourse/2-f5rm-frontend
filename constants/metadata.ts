type Answer =
  | {
      type: 'text' | 'url' | 'email' | 'number' | 'datetime';
    }
  | {
      type: 'select' | 'multiselect';
      options: string[];
    };

interface Item {
  question: string;
  description: string;
  answer: Answer;
}

interface Metadata {
  title: string;
  description: string;
  items: Item[];
}

export const metadata: Metadata = {
  title: '설문',
  description: 'asdf',
  items: [
    {
      question: '1',
      description:
        'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem\nlorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem',
      answer: { type: 'select', options: ['A', 'B'] },
    },
  ],
};
