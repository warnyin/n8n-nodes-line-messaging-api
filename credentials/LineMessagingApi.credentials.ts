import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
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
				Authorization: '={{"Bearer " + $credentials.channelAccessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.line.me/v2',
			url: '/bot/info',
		},
	};
}
