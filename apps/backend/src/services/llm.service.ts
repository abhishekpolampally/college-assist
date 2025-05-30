import { OpenAIChatMessage } from "../interfaces/chat.interface.js";

const chatSessions = new Map<string, OpenAIChatMessage[]>();

export const sendMessage = async (userId: string, prompt: string) => {
  const previousMessages = chatSessions.get(userId);

  // Send the Instructions + Chat History + Current Prompt to the LLM and show the content to the user.

  return "";
};
