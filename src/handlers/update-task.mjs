import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

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

    try {
        const getParams = {
            TableName: tableName,
            Key: { id }
        };
        const { Item } = await ddbDocClient.send(new GetCommand(getParams));

        if (!Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Task not exists, please provide a valid id' })
            };
        }

        const putParams = {
            TableName: tableName,
            Item: { id, content, completed }
        };

        await ddbDocClient.send(new PutCommand(putParams));
        return {
            statusCode: 200,
            body: JSON.stringify(putParams.Item)
        };
    } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update the task' })
        };
    }
};