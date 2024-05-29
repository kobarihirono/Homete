// フォームで使用する変数の型を定義
export interface formInputs {
  email: string;
  password: string;
  confirm: string;
  username: string;
}

declare module 'openai' {
  export interface CreateChatCompletionResponse {
    choices: {
      message?: {
        content?: string | null;
      };
    }[];
  }
}
