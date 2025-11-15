import type {
	IAuthenticateGeneric,
	ICredentialTestFunctions,
	ICredentialType,
	INodeProperties,
	ICredentialsDecrypted,
	INodeCredentialTestResult,
} from 'n8n-workflow';

export class LineMessagingApi implements ICredentialType {
	name = 'lineMessagingApi';
	displayName = 'LINE Messaging API';
	documentationUrl = 'https://developers.line.biz/en/docs/messaging-api/';
	properties: INodeProperties[] = [
		{
			displayName: 'Webhook URL Setup',
			name: 'webhookNotice',
			type: 'notice',
			default: '',
			displayOptions: {
				show: {},
			},
		},
		{
			displayName: 'To receive messages from LINE, create a Webhook node in n8n and paste its URL into the LINE Developers Console under Messaging API > Webhook URL. The webhook will receive LINE events that you can process and reply to using this node.',
			name: 'webhookInfo',
			type: 'notice',
			default: '',
		},
		{
			displayName: 'Channel Access Token',
			name: 'channelAccessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The Channel Access Token for your LINE Messaging API channel',
		},
		{
			displayName: 'Channel Secret',
			name: 'channelSecret',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'The Channel Secret for your LINE Messaging API channel',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.channelAccessToken}}',
			},
		},
	};

	// @ts-ignore - n8n supports function tests despite the type definition
	test = async function (
		this: ICredentialTestFunctions,
		credentials: ICredentialsDecrypted,
	): Promise<INodeCredentialTestResult> {
		const channelAccessToken = credentials.data?.channelAccessToken as string;

		if (!channelAccessToken) {
			return {
				status: 'Error',
				message: 'Channel Access Token is missing',
			};
		}

		try {
			const options = {
				method: 'GET' as const,
				headers: {
					Authorization: `Bearer ${channelAccessToken}`,
					'Content-Type': 'application/json',
				},
				url: 'https://api.line.me/v2/bot/info',
			};

			await this.helpers.request(options);

			return {
				status: 'OK',
				message: 'Authentication successful',
			};
		} catch (error: any) {
			const errorMessage = error.response?.body?.message || error.message || 'Unknown error';
			const statusCode = error.statusCode || error.response?.statusCode || 'N/A';
			const errorDetails = error.response?.body ? JSON.stringify(error.response.body) : '';

			return {
				status: 'Error',
				message: `LINE API Error (${statusCode}): ${errorMessage}${
					errorDetails ? `\n\nDetails: ${errorDetails}` : ''
				}\n\nToken (first 10 chars): ${channelAccessToken.substring(0, 10)}...`,
			};
		}
	};
}
