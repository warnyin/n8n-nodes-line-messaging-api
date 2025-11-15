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
		console.log('[LINE Messaging API] Testing credentials...');
		const channelAccessToken = credentials.data?.channelAccessToken as string;

		if (!channelAccessToken) {
			console.log('[LINE Messaging API] Error: Channel Access Token is missing');
			return {
				status: 'Error',
				message:
					'Channel Access Token is missing. Please enter your token from LINE Developers Console.',
			};
		}

		console.log(
			`[LINE Messaging API] Token starts with: ${channelAccessToken.substring(0, 10)}...`,
		);

		try {
			const options = {
				method: 'GET' as const,
				headers: {
					Authorization: `Bearer ${channelAccessToken}`,
					'Content-Type': 'application/json',
				},
				url: 'https://api.line.me/v2/bot/info',
			};

			console.log('[LINE Messaging API] Calling LINE API...');
			const response: any = await this.helpers.request(options);
			console.log('[LINE Messaging API] Success! Bot info:', response);

			return {
				status: 'OK',
				message: `✅ Connection successful! Bot: ${response.displayName || 'Connected'}`,
			};
		} catch (error: any) {
			console.error('[LINE Messaging API] Test failed:', error);

			const errorMessage = error.response?.body?.message || error.message || 'Unknown error';
			const statusCode = error.statusCode || error.response?.statusCode || 'N/A';
			const errorDetails = error.response?.body ? JSON.stringify(error.response.body, null, 2) : '';

			return {
				status: 'Error',
				message: `❌ LINE API Error (Status: ${statusCode}):

${errorMessage}

${errorDetails ? `Response Details:\n${errorDetails}\n\n` : ''}Token (first 10 chars): ${channelAccessToken.substring(0, 10)}...

Troubleshooting:
- Verify your Channel Access Token from LINE Developers Console
- Ensure it's a long-lived token (not expired)
- Check you're using the correct channel`,
			};
		}
	};
}
