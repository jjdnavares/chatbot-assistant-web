import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, throwError } from 'rxjs';
import { retry, publishLast, refCount, catchError } from 'rxjs/operators';
import { chatResponse, chatHistory } from '../../misc/model/chat.model';
import { Space } from '../../misc/model/space.model';
import { SpaceService } from '../../services/space/space.service';
import QrScanner from 'qr-scanner';
import { AIChatPresentationService } from '../../services/chat/chat-presentation-expert-ai/chat-presentation-expert-ai.service';
import { AIChatService } from '../../services/chat/chat-ivobot-ai/chat-ivobot-ai.service';
import { environment } from '../../environments/environment';
import { CancellationDetails, CancellationReason, PhraseListGrammar, ResultReason, SpeechConfig, SpeechRecognizer, SpeechSynthesizer, SpeakerAudioDestination, AudioConfig } from 'microsoft-cognitiveservices-speech-sdk';
import { UserProfile } from '../../misc/model/user.model';
import { trigger, transition, style, animate } from "@angular/animations";
import { ReservationService } from 'src/services/reservation/reservation.service';
import { UserSpaceReservation } from 'src/misc/model/reservation.model';
import { ServerDetails } from 'src/misc/model/server.model';

@Component({
  selector: 'app-chat-v2',
  templateUrl: './chat-v2.component.html',
  styleUrls: ['./chat-v2.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ChatComponentV2 {

  spaces: Space[] = [];

  title = 'ai-chat';
  @ViewChild('chatFeed', { static: true }) chatFeedContainer!: any;


  //Speech Service variables
  private speechConfig = SpeechConfig.fromSubscription("f097de41aff6452c8c83982139a313ad", "eastus");
  private speechRecognizer = new SpeechRecognizer(this.speechConfig);
  private player = new SpeakerAudioDestination();
  public isMicHidden: boolean = true;
  public isPlayerStopped: boolean = true;
  public isPlayerHidden: boolean = true;
  public responseflag: string;
  boo = false;
  speech: string = '';
  voice = '';

  //AI variables
  aiResponse: chatResponse = <chatResponse>{};

  //Chat variables
  public isWaitingResponse = false;
  public feedThread: Array<chatResponse> = [];
  public backThread: Array<chatResponse> = [];
  public chatHistory: Array<chatHistory> = [];
  private currentThreadTitle: string = '';
  public chatHistoryID: number = 0;
  public isNewThread: boolean = true;
  public nextQuestions: [];


  //QR Scanner variables
  public isCamHidden: boolean = true;
  private qrScanner: any;

  //Settings variables
  public isTextToSpeech: string = "false";
  public isDevToolEnabled: string = "false";

  //User profile variables
  public currentUser: UserProfile;
  public isAdmin: boolean = false;
  public isEmployee: boolean = false;
  public isEA: boolean = false;
  public reservationlist: Array<UserSpaceReservation> = [];
  public serverList: Array<ServerDetails> = [];
  public serverListByAir: Array<ServerDetails> = [];
  public slides = [
    { src: "" },
    { src: "" },
  ];
  public showLoader: boolean = true;
  public showRunning: boolean = false;
  public serverCount: any;

  public airidList: any[] = [
    { value: '2613', viewValue: '2613 - Manage myEngagements' },
    { value: '2700', viewValue: '2700 - MyTimeandExpenses' }
  ];

  public air: any;

  // displaySpinner = false;
  //public id: any;
  //public displayString: any;
  // public hasTableInd: boolean = false;
  // public extractedHtml: any;
  //  public formattedString: any;

  constructor(
    private http: HttpClient
    , private _ngZone: NgZone
    , private route: ActivatedRoute
    , private aiService: AIChatService
    , private domSanitizer: DomSanitizer
    , private reservationService: ReservationService
  ) {

  }

  async ngOnInit() {
    this.getCurrentuser();
    this.air = this.airidList[0].value;
  
    // await this.getAPI();
    
    //for faster testing use this
    this.aiService.getServerDetails().subscribe((data) => {
      this.serverListByAir = data.filter(x => x.Airid == this.air);;
      this.showLoader = false;
      console.log("data", data);
    });
  }

  ngOnDestroy() {
    this.stopAudio();
    //console.log("Goodbye World!");
  }

  getSettings() {

    let isTextToSpeechCache = localStorage.getItem("isTextToSpeech");

    if (isTextToSpeechCache) {
      this.isTextToSpeech = isTextToSpeechCache;
    }

    let isDevToolEnabledCache = localStorage.getItem("isDevToolEnabled");

    if (isDevToolEnabledCache) {
      this.isDevToolEnabled = isDevToolEnabledCache;
    }
  }

  async onSelectAIR() {
    this.showLoader = true;
    //await this.getAPI();
    
    //for faster testing use this
    this.aiService.getServerDetails().subscribe((data) => {
      this.serverListByAir = data.filter(x => x.Airid == this.air);;
      this.showLoader = false;
      console.log("data", data);
    });
  }

  async generateMessage(msg: any, isThread: boolean = false) : Promise<any> {
    let data:any = await this.aiService.setBodyMessage(msg, 1);
    this.backThread.push(data[data.length - 1]);
    return await this.aiService.generateResponse(isThread ? this.backThread : msg);
  }

  async getAPI() {
    this.aiService.getServerDetails().subscribe(async (data) => {
      
      var _data = data.filter(x => x.Airid == this.air);
      console.log("data", _data.length);
      for (let i: number = 0; i < _data.length; i++) {
        let hi: any = await this.aiService.setBodyMessage("hi", 1);
        this.backThread.push(...hi);
        
        console.log("DBName", _data[i].Name);
        let msg: any = await this.generateMessage(`analyze this data and give me some insights. The server total RAM is 32GB. 
        return in html list
        avg:system.cpu.idle, host: ` + _data[i].Name + `, ` + _data[i].idle + ` 
        avg:system.mem.free, host:` + _data[i].Name + `, ` + _data[i].free + `
        avg:system.cpu.iowait, host:` + _data[i].Name + `, ` + _data[i].iowait + `
        avg:sqlserver.activity.blocked_connections, host:` + _data[i].Name + `, ` + _data[i].blocked_connections + `
        avg:sqlserver.buffer.cache_hit_ratio, host:` + _data[i].Name + `, ` + _data[i].cache_hit_ratio + `.`, true);
        var insights = msg.content;
        this.appendbackThread(msg);
        _data[i].Insights = insights;
        console.log("insights", insights);

        msg = await this.generateMessage(`provide recommendations only on the unhealthy or critical state. return in html list`, true);
        var recommendations = msg.content;        
        _data[i].Recommendations = recommendations;
        console.log("recommendations", recommendations);

        // _data[i].Health = insights.toString().toLowerCase().includes("critical") ? "Critical" : insights.toString().toLowerCase().includes("unhealthy") ? "Unhealthy" : "Healthy";

        this.backThread = [];
      }

      this.serverListByAir = _data;
      this.showLoader = false;
    });
  }



  async samplecall() {
    const response = await this.aiService.generateResponseV3.sendMessage("What is the weather in Albuquerque?");
    console.log("v2 response:", response);

  }

  sanitizeHtml(html: any) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  extractContent(html: any) {
    var doc = new DOMParser().parseFromString(html, "text/xml");
    return doc;

  }

  getCurrentuser() {

    let usercache = localStorage.getItem("currentUser")
    if (usercache) {
      console.log(localStorage.getItem("currentUser"));
      this.currentUser = JSON.parse(usercache);

      this.isAdmin = this.currentUser.Role.includes('Admin');
      console.log("isAdmin", this.currentUser.Role.includes('Admin'));

      this.isEmployee = this.currentUser.Role.includes('Employee');
      console.log("isEmployee", this.currentUser.Role.includes('Employee'));

      this.isEA = this.currentUser.Role.includes('EA');
      console.log("isEA", this.currentUser.Role.includes('EA'));



    }

  }


  async submit(feed: string) {

    if (feed.length > 0) {

      this.clearInput();
      const bubble = (document.getElementsByClassName("bubble") as HTMLCollection);
      console.log(bubble);
      bubble.item(0).classList.add("bubble-hide");

      this.getCurrentuser();

      //this.hasTableInd = false;   

      this.isWaitingResponse = true;
      try {

        console.log("feed:", feed);

        const messages: any = await this.buildMessageBody(feed);
        console.log("messages:", messages);

        setTimeout(() => {
          this.chatFeedContainer.nativeElement.scrollTop = this.chatFeedContainer.nativeElement.scrollHeight;
          // this.hasTableInd = false;
        }, 0);
        this.aiResponse = await this.aiService.generateResponse(messages);

        console.log("aiResponse", this.aiResponse.content);

        if (this.isTextToSpeech == "true") {
          this.player.mute();
          this.player.close();
          if (this.player.isClosed) {
            this.isPlayerHidden = true;
            this.player = new SpeakerAudioDestination();
            this.textToSpeech(this.aiResponse.content);
          }
        }

        // if (this.hasTable(this.aiResponse.content)){
        //   this.hasTableInd = true;
        // }

        this.appendThread(this.aiResponse);

        //this.updateHTML();   
        this.isWaitingResponse = false;
        this.updateChatHistory();

        // scroll the chat-feed container to the bottom
        setTimeout(() => {
          this.chatFeedContainer.nativeElement.scrollTop = this.chatFeedContainer.nativeElement.scrollHeight;
          // this.hasTableInd = false;
        }, 0);
      }
      catch (err: any) {
        console.error("ChatComponent -> submit(): ", err);
        alert("OpenAI error:" + err.message);
        this.isWaitingResponse = false;
        // this.hasTableInd = false;
      }

    }


  }

  getLongRunning() {
    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      (chatInput as HTMLInputElement).value = "Query long running transactions that affects my database performance";
    }
  }
  showserverhealth(){
    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      (chatInput as HTMLInputElement).value = "Show server health within the application";
    }
  }
  Recommendations(){
    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      (chatInput as HTMLInputElement).value = "Provide Recommendations only on the unhealthy or critical state";
    }
  }
  Problem(){
    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      (chatInput as HTMLInputElement).value = "What is the problem with server";
    }
  }

  closeLongRunning() {
    this.showRunning = false;
  }

  clearInput() {
    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      (chatInput as HTMLInputElement).value = "";
    };
  }

  private async buildMessageBody(feed: string): Promise<any> {
    let msgBody: Array<chatResponse> = [];

    if (!this.currentThreadTitle && !this.feedThread.length) {

      this.currentThreadTitle = feed;
      msgBody = await this.aiService.setBodyMessage(feed, 1);
      console.log("msgBody1", msgBody);
      this.feedThread.push(...msgBody);

    }
    else {

      msgBody = await this.aiService.setBodyMessage(feed, 1);
      console.log("msgBody2", msgBody);
      this.feedThread.push(msgBody[msgBody.length - 1]);
    }

    console.log("feedThread", this.feedThread);
    //console.log("buildMessageBody msgBody", msgBody);
    return this.feedThread

  }

  newChat() {
    this.isNewThread = true;
    this.currentThreadTitle = "";
    this.feedThread.length = 0;
    //this.nextQuestions.length = 0;
    this.responseflag = "";

    const bubble = (document.getElementsByClassName("bubble") as HTMLCollection);
    console.log(bubble);
    bubble.item(0).classList.remove("bubble-hide");
  }

  private truncationNextQuestions(response: string) {

    let output: any = {
      content: response,
      nextQuestions: ""
    };

    let token = '#flag#';
    let isNext: boolean = response.includes(token);

    //console.log("isNext", isNext);     
    if (isNext) {

      let remove_after = response.indexOf(token);

      output = {
        content: response.substring(0, remove_after),
        nextQuestions: response.slice(response.indexOf(token) + token.length)

      };


    }

    return output;

  }

  private appendThread(resp: chatResponse) {

    //this.truncationNextQuestions(resp.content);

    this.feedThread.push({
      role: resp.role,
      content: this.truncationNextQuestions(resp.content).content
    });

    // this.feedThread.push({
    //   role: resp.role,
    //   content: this.truncationNextQuestions(resp.content).nextQuestions
    // });


    // let nexQRegEx = /\(\d+\)\s*(.*?)(?=\(\d+\)|$)/g;
    // let token = '#flag#';
    // //let nexQRegEx = /(?!\d\)\.\s)(\w+\D+)/gm;
    // this.nextQuestions =  this.truncationNextQuestions(resp.content).nextQuestions; //.match(token);
    // this.responseflag = JSON.stringify(this.nextQuestions);

    // console.log("this.responseflag ", this.responseflag );
  }

  private appendbackThread(resp: chatResponse) {
    this.backThread.push({
      role: resp.role,
      content: resp.content
    });
  }

  private updateChatHistory() {
    if (this.isNewThread) {

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
        if (history.id === this.chatHistoryID) history.thread = [...this.feedThread];
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


  scan() {

    this.isCamHidden = false;
    let camElem = document.getElementById("qrcam") as HTMLVideoElement;

    this.qrScanner = new QrScanner(
      camElem,
      (result: any) => {

        let parkingID = result.data.split(',')[0].split(environment.base_web_url).reverse()[0];
        console.log('decoded qr code:', result.data);
        console.log('parking Id', parkingID);
        this.isCamHidden = true;
        this.qrScanner.stop();

        this.submit("The Parking Id: " + parkingID + ". Please check-in.")

      },
      { /* your options or returnDetailedScanResult: true if you're not specifying any other options */

      },
    );

    this.qrScanner.start();

    console.log("Scan Method!");
  }

  closeScan() {
    this.isCamHidden = true;
    this.qrScanner.stop();
  }

  public speechToText() {
    return new Promise((resolve, reject) => {
      this.speechRecognizer.recognizeOnceAsync(result => {
        let text = "";
        switch (result.reason) {
          case ResultReason.RecognizedSpeech:
            text = result.text;
            break;
          case ResultReason.NoMatch:
            text = "Speech could not be recognized.";
            reject(text);
            break;
          case ResultReason.Canceled:
            var cancellation = CancellationDetails.fromResult(result);
            text = "Cancelled: Reason= " + cancellation.reason;
            if (cancellation.reason == CancellationReason.Error) {
              text = "Canceled: " + cancellation.ErrorCode;
            }
            reject(text);
            break;
        }
        resolve(text);
      });
    });
  }


  public textToSpeech(text: string) {
    var audioConfig = AudioConfig.fromSpeakerOutput(this.player);
    var synthesizer = new SpeechSynthesizer(this.speechConfig, audioConfig);
    synthesizer.speakTextAsync(
      text,
      result => {
        if (result.reason === ResultReason.SynthesizingAudioCompleted) {
          console.log("synthesis finished.");
        } else {
          console.error("Speech synthesis canceled, " + result.errorDetails +
            "\nDid you update the subscription info?");
        }
        synthesizer.close();
        this.player.close();
      },
      error => {
        console.error("Speech synthesis canceled, " + error);
        synthesizer.close();
        this.player.close();
      });
  }

  playingAudio() {
    if (this.isPlayerStopped) {
      this.isPlayerStopped = false;
      this.player.pause();
    }
    else {
      this.isPlayerStopped = true;
      this.player.resume();
    }
  }

  stopAudio() {
    this.player.mute();
    this.isPlayerHidden = false;
  }

  public async startSpeech() {
    console.log("startSpeech");
    if (!this.isMicHidden) // Used for UI effects
      return;
    this.isMicHidden = false;

    await this.speechToText().then((res) => {
      this.submit(res.toString());
    })
      .catch((res: string) => {
        //this._snackBar.open(res, "okay", { duration: 3000 });
      })
      .finally(() => this.isMicHidden = true);
  }

  public stopSpeech() {
    this.isMicHidden = true;
    this.speechRecognizer.stopContinuousRecognitionAsync(
      () => console.log("stopped"),
      (err: any) => console.error(err)
    );
  }
}
