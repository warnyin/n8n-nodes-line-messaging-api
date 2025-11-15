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
				Authorization: '={{"Bearer " + $credentials.channelAccessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: 'https://api.line.me/v2',
			url: '/bot/info',
		},
	};
}
