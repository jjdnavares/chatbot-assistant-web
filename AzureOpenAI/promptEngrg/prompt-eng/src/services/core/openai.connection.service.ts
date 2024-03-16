import CONFIG from '../../config/azureOpenAi.config.json';
//import { OpenAIClient, AzureKeyCredential, GetCompletionsOptions } from '@azure/openai';

export function getOpenAIConfiguration() {
    let CFG = CONFIG.V2;
    let output: any = {};

    output.deploymentId = CFG.DEPLOYMENT_ID;
    output.openApiEndPoint = CFG.OPENAI_ENDPOINT;
    output.apiKey = CFG.API_KEY;
    
    return output;
}

export function getOpenAIConfigurationV2() {
    let CFG = CONFIG.V2;
    let output: any = {};

    output.deploymentId = CFG.DEPLOYMENT_ID;
    output.openApiEndPoint = CFG.OPENAI_ENDPOINT;
    output.apiKey = CFG.API_KEY;
    output.model = CFG.OPENAI_MODEL;
    
    return output;
}