import { Request } from "express";
import fs from "fs/promises";
import { Document, VectorStoreIndex } from "llamaindex";

export class MainService {
    constructor(){}

    handler = async (event: Request, context: any) => {
        let parsedBody: chatBody[] = [...JSON.parse(JSON.stringify(event.body))]

        console.log("-->> event: ", parsedBody);

        try {
            return await this.chatService(parsedBody);
        }
        catch (err) {
            throw new Error('MainService -> handler() error: ' + err);
        }
        
    }

    private chatService = async (parsedBody: chatBody[]) => {

        // Load essay from abramov.txt in Node
        const essay = await fs.readFile(
            "node_modules/llamaindex/examples/abramov.txt",
            "utf-8",
        );

        // Create Document object with essay
        const document = new Document({ text: essay });

        // Split text and create embeddings. Store them in a VectorStoreIndex
        const index = await VectorStoreIndex.fromDocuments([document]);

        // Query the index
        const queryEngine = index.asQueryEngine();
        const response = await queryEngine.query(
            "What did the author do in college?",
        );

        // Output response
        console.log(response.toString());
        return Promise.resolve({response})
    }
}

interface chatBody {
    role: string,
    message: string
}
