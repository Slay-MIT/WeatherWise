// types.ts
export interface Message {
    content: string;
    sender: string;
    type: 'user' | 'bot';
  }