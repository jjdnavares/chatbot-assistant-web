import { Injectable, isDevMode } from '@angular/core';
import { OpenAIClient, AzureKeyCredential, GetCompletionsOptions } from '@azure/openai';
import { chatResponse } from '../../../misc/model/chat.model';
import {
  MSG_CONTEXT, SYSTEM_MSG, REPEAT_INSTRUCTION, PROFILE_INSTRUCTION, NEXT_INSTRUCTION, FLAG_MSG
  , TOKEN_START, TOKEN_END, LOCATION_INSTRUCTION, DATE_INSTRUCTION, HTML_INSTRUCTION, RESERVATION
} from './chat-ivobot-constants';
import { getOpenAIConfiguration, getOpenAIConfigurationV2 } from '../../core/openai.connection.service';
import { GeoService } from '../../core/geolocation.service';
import { AIChatPresentationService } from '../chat-presentation-expert-ai/chat-presentation-expert-ai.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { createChat, CancelledCompletionError } from "completions";
import { ServerDetails } from 'src/misc/model/server.model';
import { server_details } from 'src/services/server-mock';

@Injectable({
  providedIn: 'root'
})

export class AIChatService {
  private SYS_MSG: any
  private CONTEXT: any;
  private position: any;
  private client: OpenAIClient;
  private openAIConfig = getOpenAIConfiguration();
  private role: string;

  constructor(
    private geoService: GeoService,
    private hmtlAiService: AIChatPresentationService,
    private http: HttpClient

  )
  {

    this.generateContext();

    this.client = new OpenAIClient(
      this.openAIConfig.openApiEndPoint,
      new AzureKeyCredential(this.openAIConfig.apiKey)
    );

  }

  ngOnInit() {
    console.log("ngOninit");
  }

  setBodyMessage(messages: any, userFlag: number): Promise<any> {
    let msgBody: Array<chatResponse> = [];

    let baseURL = 'https://func-intelliops.azurewebsites.net';

    if (isDevMode()) {
      baseURL = 'http://localhost:7090';
      // console.log('Development! ' + baseURL);
    } else {
      // console.log('Production! ' + baseURL);
    }

    return this.http.get(baseURL + '/api/SetBody?message=' + messages).toPromise();

  }

  getRole() {
    let currentUser = localStorage.getItem("currentUser");
    this.role = JSON.parse(currentUser).Role[0];
  }

  generateContext() {
    //TO DO - Change role - FRED
    this.getRole();

    console.log("generateContext");
    console.log("this.role", this.role);

    this.CONTEXT = MSG_CONTEXT.EMPLOYEE
  }

  generateRepeatInstruction() {
    //TO DO change instruction - FRED
    //parenthesis are important here
    let currentUser = localStorage.getItem("currentUser");
    let instructions: any;

    let instruction = this.CONTEXT.TOKEN_START
      + this.CONTEXT.PROFILE_INSTRUCTION //+ currentUser + ". "
      + this.CONTEXT.REPEAT_INSTRUCTION
      //+ this.CONTEXT.LOCATION_INSTRUCTION + this.position + ". "
      //+ this.CONTEXT.DATE_INSTRUCTION + new Date().toLocaleDateString()
      //+ this.CONTEXT.HTML_INSTRUCTION
      //+ this.CONTEXT.FLAG_MSG
      //+ RESERVATION+ 
      + "Always have the information before responding, so you won't let me wait for you response."
      + this.CONTEXT.TOKEN_END

    return instruction;
  }

  async generateResponse(messages: any): Promise<any> {
    const requestOptions = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    
    let baseURL = 'https://func-intelliops.azurewebsites.net';

    if (isDevMode()) {
      baseURL = 'http://localhost:7090';
      // console.log('Development! ' + baseURL);
    } else {
      // console.log('Production! ' + baseURL);
    }

    return this.http.post(baseURL + '/api/GetAiResult', messages, requestOptions).toPromise();
  }

  generateResponseV3 = createChat({
    apiKey: "***REVOKED-AZURE-OPENAI-KEY-REMOVED***",
    model: "gpt-3.5-turbo",
    functions: [
      {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
        function: async ({ location }) => {
          return {
            location: "Albuquerque",
            temperature: "72",
            unit: "fahrenheit",
            forecast: ["sunny", "windy"],
          };
        },
      },
      //////////////////
      {
        name: "get_current_date",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
        function: async ({ location }) => {
          return {
            location: "Albuquerque",
            temperature: "72",
            unit: "fahrenheit",
            forecast: ["sunny", "windy"],
          };
        },
      }
    ],
    functionCall: "auto",
  })

  getServerDetails(): Observable<ServerDetails[]> {
    const reservation = of(server_details);
    return reservation;
  }
}
