import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Observable, throwError } from 'rxjs';
import { retry , publishLast, refCount, catchError } from 'rxjs/operators';
import { OpenAIClient, AzureKeyCredential, GetCompletionsOptions } from '@azure/openai';
import { SYSTEM_MSG, REPEAT_INSTRUCTION } from '../../misc/constant/chat-constants';
import { chatResponse, chatHistory } from '../../misc/model/chat.model';
import { Space } from '../../misc/model/space.model';
import { SpaceService } from '../../services/space/space.service';
import CONFIG from '../../config/azureOpenAi.config.json';
import QrScanner from 'qr-scanner';

var CFG = CONFIG.V1;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})


export class ChatComponent {

  

  spaces: Space[] = [];

  title = 'parkme-chat';
  @ViewChild('chatFeed', { static: true }) chatFeedContainer!: ElementRef<HTMLInputElement>;

  private client: OpenAIClient;
  private deploymentId = CFG.DEPLOYMENT_ID;
  private openApiEndPoint = CFG.OPENAI_ENDPOINT;
  private apiKey = CFG.API_KEY;
  public isWaitingResponse = false;
  public feedThread: Array<chatResponse> = [];
  public chatHistory: Array<chatHistory> = [];
  private currentThreadTitle: string = '';
  public chatHistoryID: number = 0;
  public isNewThread: boolean = true;

  boo = false;
  speech: string = '';
  voice = '';

  aiResponse: chatResponse = <chatResponse>{};

  public id: any;
  public isCamHidden: boolean = true;

  private qrScanner: any;

  private isInit: boolean = true;
  
  // displaySpinner = false;

  

  constructor(

      private http : HttpClient
    , private _ngZone: NgZone
    , private route: ActivatedRoute
    , private spaceService: SpaceService
    
    ) {
    this.client = new OpenAIClient(
      this.openApiEndPoint,
      new AzureKeyCredential(this.apiKey)
    );
  }

  

  //sample service | Constant
  getSpaces(): void {
    this.spaces = this.spaceService.getSpaces();
    console.log("Spaces:");
    console.log(this.spaces);
  }

  //sample service | Observable
  getSpaceList(): void {
   this.spaceService.getSpaceList()
      .subscribe(spaces => 
        {
          this.spaces = spaces
          console.log("Space List:");
          console.log(this.spaces);
        });
    
  }

  ngOnInit() {  

    //sample service call
    //this.getSpaces();
    //this.getSpaceList();

    this.route.paramMap.subscribe((params: ParamMap) => {   
      console.log("this.id", +params.get('id'))
      this.id = +params.get('id');
    })


    // this.route.paramMap.subscribe((params: ParamMap) => {   
    //   console.log("this.name", params.get('name'))
    //   this.id = +params.get('name');
    // })    
    

    if (this.id == 911)
      this.submit("I am neaby my office reservation.");
    else if (this.id > 0)
      this.submit("The Parking Id: "+ this.id + ". Please check-in.")
    
    // if (this.isInit == true){
    //   this.buildMessageBody("IsInitXXX");
    // }
      

  }

  async submit(feed: string) {

    console.log("feed:", feed);
    this.isWaitingResponse = true;

    try {
      const messages = this.buildMessageBody(feed);
       
      this.aiResponse = await this.sendChat(messages);
      this.appendThread(this.aiResponse);

      this.isWaitingResponse = false;
      this.updateChatHistory();

      // scroll the chat-feed container to the bottom
      setTimeout(() => {
        this.chatFeedContainer.nativeElement.scrollTop = this.chatFeedContainer.nativeElement.scrollHeight;
      }, 0);
    }
    catch (err) {
      console.error("AppComponent -> submit(): ", err);
      this.isWaitingResponse = false;
    }
  }

  async sendChat(messages: any[]): Promise<chatResponse> {
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

    const chatInput = document.getElementById("chatInput");

    if (chatInput) {
      (chatInput as HTMLInputElement).value = "";
    };

    return result.choices[0].message as chatResponse;
  }

  newChat() {
    this.isNewThread = true;
    this.currentThreadTitle = "";
    this.feedThread.length = 0;
  }

  loadHistory(id: number) {
    let getPastThread = this.chatHistory.find((history) => history.id === id);

    if(getPastThread) {
      this.feedThread.length = 0;
      this.chatHistoryID = getPastThread.id;
      this.currentThreadTitle = getPastThread.title;
      this.feedThread = [...getPastThread.thread];

      const chatInput = document.getElementById("chatInput");

      if (chatInput) {
        (chatInput as HTMLInputElement).value = "";
      };

    }

  }

  private buildMessageBody(feed:string): Array<chatResponse> {

    let msgBody:Array<chatResponse> = [];

      
    if(!this.currentThreadTitle && !this.feedThread.length) {
      this.currentThreadTitle = feed;
      msgBody.push(
        {
          role: 'system',
          content: SYSTEM_MSG
        },      
        {
          role: 'user',
          content: feed + " " + REPEAT_INSTRUCTION
        }
      );

      this.feedThread.push(...msgBody);

    }
    else {
      msgBody.push(
        ...this.feedThread,
        {
          role: 'user',
          content: feed + " " + REPEAT_INSTRUCTION
        }
      );

      this.feedThread.push(msgBody[msgBody.length - 1]);

    }

    console.log("msgBody", msgBody);
    return msgBody    

  }

  private appendThread(resp: chatResponse) {
    this.feedThread.push({
      role: resp.role,
      content: resp.content
    });
  }

  private updateChatHistory() {
    if(this.isNewThread) {

      let currentThread: chatHistory = {
        id: this.chatHistory.length + 1,
        title: this.currentThreadTitle,
        thread: [...this.feedThread]
      };

      this.chatHistoryID = currentThread.id;
      this.chatHistory.push(currentThread);

      this.isNewThread = false;
    }
    else {
      this.chatHistory.find((history) => {
        if(history.id === this.chatHistoryID) history.thread = [...this.feedThread];
      })

    }
  }

  unshowAppendedLastInstruction(str: string): string {
    const regex = /\(([^)]+)\)[^(]*$/;
    const match = regex.exec(str);
    if (match) {
      return str.replace(match[0], '');
    }
    return str;
  }

  private postProcessChat(payload: any): Observable<any> {
    console.log("calling postProcessChat ", payload);
    let url = 'http://localhost:6969/promptEng';

    let chatResponse = this.http.post<any>(url, payload).pipe(
      publishLast(),refCount(),retry(3),
      catchError((err: any) => throwError(err || 'Server error')));
    return chatResponse;
  }

  scan(){

    this.isCamHidden = false;
    let camElem = document.getElementById("qrcam") as HTMLVideoElement;
  
    this.qrScanner = new QrScanner(
        camElem,
        (result:any) => {

            let parkingID = result.data.split(',')[0].split("https://genai-team8-web-app.azurewebsites.net/chat/").reverse()[0];
            console.log('decoded qr code:', result.data);
            console.log('parking Id', parkingID);
            this.isCamHidden = true;
            this.qrScanner.stop();
            
            this.submit("The Parking Id: "+ parkingID + ". Please me check-in.")
            
        },
        { /* your options or returnDetailedScanResult: true if you're not specifying any other options */
          
        },
    );
  
    this.qrScanner.start();
   
    console.log("Scan Method!");
  }

  closeScan(){
    this.isCamHidden = true;
    this.qrScanner.stop();
  }
}
