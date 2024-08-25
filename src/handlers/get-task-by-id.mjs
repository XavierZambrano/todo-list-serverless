import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const clientConfig = {};
if (process.env.ENDPOINT_OVERRIDE) {
  clientConfig.endpoint = process.env.ENDPOINT_OVERRIDE;
}
const client = new DynamoDBClient(clientConfig);
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE_NAME;

export const getTaskByIdHandler = async (event) => {
  const id = event.pathParameters.id;
 
  var params = {
    TableName : tableName,
    Key: { id },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    if (!data.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Task not found' })
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    };
  } catch (err) {
    console.error("Error", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not get the task' })
    };
  }
}