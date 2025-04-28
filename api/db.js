import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocumentClient, PutCommand} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: 'AKIA4RCAN6X3KFBVGCR6',
    secretAccessKey: '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',
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export {docClient, PutCommand};
