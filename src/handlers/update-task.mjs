import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const clientConfig = {}
if (process.env.ENDPOINT_OVERRIDE) {
    clientConfig.endpoint = process.env.ENDPOINT_OVERRIDE;
}
const client = new DynamoDBClient(clientConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

export const updateTaskHandler = async (event) => {
    const body = JSON.parse(event.body);

    const id = event.pathParameters.id;
    const content = body.content;
    const completed = body.completed;

    var params = {
        TableName : tableName,
        Item: { id, content, completed }
    };

    try {
        await ddbDocClient.send(new PutCommand(params));
        return {
            statusCode: 200,
        };    
      } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update the task' })
        };
      }
};
