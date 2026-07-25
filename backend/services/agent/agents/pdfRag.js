import fs from 'fs/promises'
import  { PDFParse } from 'pdf-parse'
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { getModel } from '../graph/llmModel.js';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { detectCredits } from '../utils/detectCredits.js';
import { checkLimit } from '../config/rateLimit.js';


export const pdfRag = async(state) => {
    try {
        await checkLimit(state.userId, "pdf")
        const buffer = fs.readFileSync(state.file.path);
        const pdf = new PDFParse({
            data : buffer
        })

        const result = await pdf.getText();

        const text = result.text;

        const splitter = new RecursiveCharacterTextSplitter({
            chunkOverlap : 100,
            chunkSize : 300
        });

        const docs = splitter.createDocuments([text]);
        const collectionName = `pdf-${Date.now()}`;

        const store = await vectorStoreDb(docs, collectionName);

        const relevantDocs = await store.similaritySearch(state.prompt, 5);

        const context = relevantDocs.map(c => c.pageContent).join('\n\n');

        const llm = await getModel("pdfRag");

        const messages = [
            new SystemMessage(`
                You are Zentra AI PDF Assistant.

Rules:

-Answer only from the uploaded pdf.
-Never make up information.
-If the answer is not present in the pdf, reply : "i couldn't find this information in the uploaded pdf"
-use markdown formating
                `),

                new HumanMessage(`
                    Context : ${context}
                    Question : ${state.prompt}
                    `)
        ]

        const response = await llm.invoke(messages);
        await detectCredits(state.userId, "pdf")
        return {
            ...state,
            aiResponse : response.content
        }

        
    } catch (error) {
        console.log("error in pdf rag: ", error.message);
        return {
            ...state,
            aiResponse : "❌Failed to generte response"
        }
    } finally {
        await fs.unlinkSync(state.file.path);
    }
}