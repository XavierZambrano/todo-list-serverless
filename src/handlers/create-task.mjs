import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.SAMPLE_TABLE;


export const createTaskHandler = async (event) => {
    const body = JSON.parse(event.body);
    const content = body.content;
    const id = uuidv4();
    const completed = false;

    const params = {
        TableName: tableName,
        Item: { id, content, completed }
    };

    try {
        await ddbDocClient.send(new PutCommand(params));

        return {
            statusCode: 201,
            body: JSON.stringify({ id, content, completed })
        };
    } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not create the task' })
        };
    }
};