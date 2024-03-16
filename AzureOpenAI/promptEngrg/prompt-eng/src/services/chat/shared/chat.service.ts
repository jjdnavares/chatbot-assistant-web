import { Injectable } from '@angular/core';
import { OpenAIClient, AzureKeyCredential, GetCompletionsOptions } from '@azure/openai';
import CONFIG from '../../../config/azureOpenAi.config.json';
import { chatResponse, chatHistory } from '../../../misc/model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client: OpenAIClient;
  private deploymentId = CONFIG.DEPLOYMENT_ID;
  private openApiEndPoint = CONFIG.OPENAI_ENDPOINT;
  private apiKey = CONFIG.API_KEY;

  constructor() {

  this.client = new OpenAIClient(
      this.openApiEndPoint,
      new AzureKeyCredential(this.apiKey)
  );


  }

  async generateResponse(messages: any[]): Promise<chatResponse> {

    const options: GetCompletionsOptions = {
      maxTokens: 1000,
      // temperature: 0.7,
      // topP: 0.95,
      // frequencyPenalty: 0,
      // presencePenalty: 0,
      // stop: ["None"]
    };

    const result = await this.client.getChatCompletions(
      this.deploymentId,
      messages,
      options
    );

    return result.choices[0].message as chatResponse;
  }
 
}
