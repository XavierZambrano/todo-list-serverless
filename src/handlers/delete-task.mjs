import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';

const clientConfig = {}
if (process.env.ENDPOINT_OVERRIDE) {
    clientConfig.endpoint = process.env.ENDPOINT_OVERRIDE;
}
const client = new DynamoDBClient(clientConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

export const deleteTaskHandler = async (event) => {
    const id = event.pathParameters.id;

    const getParams = {
        TableName: tableName,
        Key: { id: id }
    };

    try {
        const { Item } = await ddbDocClient.send(new GetCommand(getParams));

        if (!Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Task not exists, please provide a valid id' })
            };
        }

        const deleteParams = {
            TableName: tableName,
            Key: { id: id }
        };

        await ddbDocClient.send(new DeleteCommand(deleteParams));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Task deleted successfully' })
        };
    } catch (err) {
        console.error("Error", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not delete the task' })
        };
    }
};

