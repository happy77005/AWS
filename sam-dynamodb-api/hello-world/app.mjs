import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamoDB = DynamoDBDocumentClient.from(client);

export const lambdaHandler = async (event, context) => {
    try {
        const params = {
            TableName: "MyTable",
            Item: {
                id: "1",  // Sample ID
                message: "Hello from DynamoDB!"
            }
        };

        await dynamoDB.send(new PutCommand(params));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Data added to DynamoDB!" }),
            
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
