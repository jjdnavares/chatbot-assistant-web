import { Injectable } from '@angular/core';
import { OpenAIClient, AzureKeyCredential, GetCompletionsOptions } from '@azure/openai';
import CONFIG from '../../../config/azureOpenAi.config.json';
import { chatResponse} from '../../../misc/model/chat.model';
import { SYSTEM_MSG, REPEAT_INSTRUCTION} from './chat-presentation-expert-constants';
import { getOpenAIConfiguration } from '../../core/openai.connection.service';

@Injectable({
  providedIn: 'root'
})
export class AIChatPresentationService {

  private client: OpenAIClient;
  private openAIConfig = getOpenAIConfiguration();


  constructor() {

  this.client = new OpenAIClient(
      this.openAIConfig.openApiEndPoint,
      new AzureKeyCredential(this.openAIConfig.apiKey)
  );

  }

  setBodyMessage(messages: any, userFlag: number):Array<chatResponse> {

    let msgBody:Array<chatResponse> = [];   
    
    if(userFlag == 1){

        msgBody.push(
            {
              role: 'system',
              content: SYSTEM_MSG
            },      
            {
              role: 'user',
              content: messages
            })

    }
    else{

        msgBody.push(
                
            {
              role: 'user',
              content: messages
            })

    }    
     return msgBody;

  }

  async generateResponse(messages: any): Promise<any> {

    console.log("AIHTML generateResponse:", messages);


    let bodyMessage = this.setBodyMessage(messages, 1);  
    
    
    console.log("AIHTML bodyMessage:", bodyMessage);

    const options: GetCompletionsOptions = {
      maxTokens: 1000,
      temperature: 0.4,
      // topP: 0.95,
      // frequencyPenalty: 0,
      // presencePenalty: 0,
      // stop: ["None"]
    };

    // const result = await this.client.getChatCompletions(
    //   this.openAIConfig.deploymentId,
    //   bodyMessage,
    //   options
    // );

    let response; //= result.choices[0].message as chatResponse;

    return response;
  }
 
}
