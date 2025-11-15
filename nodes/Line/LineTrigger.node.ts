import {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	NodeOperationError,
} from 'n8n-workflow';

import * as crypto from 'crypto';

export class LineTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'LINE Trigger',
		name: 'lineTrigger',
		icon: 'file:line.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Handle LINE webhook events (messages, postbacks, follows, etc.)',
		defaults: {
			name: 'LINE Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'lineMessagingApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				options: [
					{
						name: 'Message',
						value: 'message',
						description: 'When user sends a message (text, image, video, audio, location, sticker, file)',
					},
					{
						name: 'Follow',
						value: 'follow',
						description: 'When user adds your bot as a friend',
					},
					{
						name: 'Unfollow',
						value: 'unfollow',
						description: 'When user blocks or removes your bot',
					},
					{
						name: 'Join',
						value: 'join',
						description: 'When bot joins a group or room',
					},
					{
						name: 'Leave',
						value: 'leave',
						description: 'When bot leaves a group or room',
					},
					{
						name: 'Member Joined',
						value: 'memberJoined',
						description: 'When user joins a group or room where bot is a member',
					},
					{
						name: 'Member Left',
						value: 'memberLeft',
						description: 'When user leaves a group or room where bot is a member',
					},
					{
						name: 'Postback',
						value: 'postback',
						description: 'When user taps a button in a template message',
					},
					{
						name: 'Beacon',
						value: 'beacon',
						description: 'When user enters/leaves beacon range',
					},
					{
						name: 'Account Link',
						value: 'accountLink',
						description: 'When account link process is completed',
					},
					{
						name: 'Things',
						value: 'things',
						description: 'When device is linked/unlinked',
					},
				],
				default: ['message'],
				required: true,
				description: 'The events to listen for',
			},
			{
				displayName: 'Webhook URL Info',
				name: 'webhookInfo',
				type: 'notice',
				default: '',
				displayOptions: {
					show: {},
				},
			},
			{
				displayName: 'Copy the webhook URL above and paste it into LINE Developers Console under Messaging API > Webhook URL. Make sure to enable "Use webhook" and verify the URL.',
				name: 'webhookInstructions',
				type: 'notice',
				default: '',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const credentials = await this.getCredentials('lineMessagingApi');
		const channelSecret = credentials.channelSecret as string;
		const events = this.getNodeParameter('events', []) as string[];

		const req = this.getRequestObject();
		const body = this.getBodyData();

		// Verify LINE signature
		const signature = req.headers['x-line-signature'] as string;
		if (!signature) {
			throw new NodeOperationError(
				this.getNode(),
				'Missing x-line-signature header',
			);
		}

		const bodyString = JSON.stringify(body);
		const hash = crypto
			.createHmac('sha256', channelSecret)
			.update(bodyString)
			.digest('base64');

		if (signature !== hash) {
			throw new NodeOperationError(
				this.getNode(),
				'Invalid signature - webhook request is not from LINE',
			);
		}

		// Process LINE events
		const webhookData = body as any;
		const lineEvents = webhookData.events || [];

		const returnData: any[] = [];

		for (const event of lineEvents) {
			// Filter events based on user selection
			if (!events.includes(event.type)) {
				continue;
			}

			// Structure the event data nicely
			const eventData: any = {
				eventType: event.type,
				timestamp: event.timestamp,
				source: event.source,
				webhookEventId: event.webhookEventId,
				deliveryContext: event.deliveryContext,
			};

			// Add replyToken if available
			if (event.replyToken) {
				eventData.replyToken = event.replyToken;
			}

			// Add event-specific data
			switch (event.type) {
				case 'message':
					eventData.message = {
						id: event.message.id,
						type: event.message.type,
					};

					// Add message content based on type
					switch (event.message.type) {
						case 'text':
							eventData.message.text = event.message.text;
							eventData.message.emojis = event.message.emojis;
							eventData.message.mention = event.message.mention;
							break;
						case 'image':
						case 'video':
						case 'audio':
						case 'file':
							eventData.message.contentProvider = event.message.contentProvider;
							if (event.message.type === 'image') {
								eventData.message.imageSet = event.message.imageSet;
							}
							if (event.message.type === 'file') {
								eventData.message.fileName = event.message.fileName;
								eventData.message.fileSize = event.message.fileSize;
							}
							if (event.message.type === 'video') {
								eventData.message.duration = event.message.duration;
							}
							if (event.message.type === 'audio') {
								eventData.message.duration = event.message.duration;
							}
							break;
						case 'location':
							eventData.message.title = event.message.title;
							eventData.message.address = event.message.address;
							eventData.message.latitude = event.message.latitude;
							eventData.message.longitude = event.message.longitude;
							break;
						case 'sticker':
							eventData.message.packageId = event.message.packageId;
							eventData.message.stickerId = event.message.stickerId;
							eventData.message.stickerResourceType = event.message.stickerResourceType;
							eventData.message.keywords = event.message.keywords;
							break;
					}
					break;

				case 'postback':
					eventData.postback = {
						data: event.postback.data,
						params: event.postback.params,
					};
					break;

				case 'follow':
					// No additional data needed
					break;

				case 'unfollow':
					// No additional data needed
					break;

				case 'join':
					// No additional data needed
					break;

				case 'leave':
					// No additional data needed
					break;

				case 'memberJoined':
					eventData.joined = {
						members: event.joined.members,
					};
					break;

				case 'memberLeft':
					eventData.left = {
						members: event.left.members,
					};
					break;

				case 'beacon':
					eventData.beacon = {
						hwid: event.beacon.hwid,
						type: event.beacon.type,
						dm: event.beacon.dm,
					};
					break;

				case 'accountLink':
					eventData.link = {
						result: event.link.result,
						nonce: event.link.nonce,
					};
					break;

				case 'things':
					eventData.things = {
						type: event.things.type,
						deviceId: event.things.deviceId,
					};
					break;
			}

			returnData.push(eventData);
		}

		// If no events matched the filter, return empty
		if (returnData.length === 0) {
			return {
				workflowData: [[]],
			};
		}

		return {
			workflowData: [this.helpers.returnJsonArray(returnData)],
		};
	}
}
