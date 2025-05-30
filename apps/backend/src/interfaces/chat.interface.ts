export interface OpenAIChatMessage {
  role: ChatMessageRole;
  content: string;
}

export enum ChatMessageRole {
  SYSTEM = "system",
  USER = "user",
}
