import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class Line implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'LINE',
		name: 'line',
		icon: 'file:line.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with LINE Messaging API',
		defaults: {
			name: 'LINE',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'lineMessagingApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Profile',
						value: 'profile',
					},
				],
				default: 'message',
			},
			// Message resource operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Push',
						value: 'push',
						description: 'Send push message',
						action: 'Push a message',
					},
					{
						name: 'Reply',
						value: 'reply',
						description: 'Reply to a message',
						action: 'Reply to a message',
					},
					{
						name: 'Multicast',
						value: 'multicast',
						description: 'Send message to multiple users',
						action: 'Multicast a message',
					},
					{
						name: 'Broadcast',
						value: 'broadcast',
						description: 'Send message to all users',
						action: 'Broadcast a message',
					},
					{
						name: 'Get Content',
						value: 'getContent',
						description: 'Get binary content (image, video, audio, file) from message',
						action: 'Get message content',
					},
				],
				default: 'push',
			},
			// Profile resource operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['profile'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get user profile',
						action: 'Get a profile',
					},
				],
				default: 'get',
			},
			// Message:Push fields
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['push'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the user to send the message to',
			},
			// Message:Reply fields
			{
				displayName: 'Reply Token',
				name: 'replyToken',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['reply'],
					},
				},
				default: '',
				required: true,
				description: 'The reply token received from webhook',
			},
			// Message:Multicast fields
			{
				displayName: 'User IDs',
				name: 'userIds',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['multicast'],
					},
				},
				default: '',
				required: true,
				description: 'Comma-separated list of user IDs to send the message to (max 500)',
			},
			// Message Type (for all message operations)
			{
				displayName: 'Message Type',
				name: 'messageType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Text',
						value: 'text',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
					{
						name: 'Location',
						value: 'location',
					},
					{
						name: 'Sticker',
						value: 'sticker',
					},
					{
						name: 'Flex',
						value: 'flex',
					},
				],
				default: 'text',
				description: 'The type of message to send',
			},
			// Text message fields
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['text'],
					},
				},
				default: '',
				required: true,
				description: 'The text message to send',
			},
			// Image message fields
			{
				displayName: 'Original Content URL',
				name: 'originalContentUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['image', 'video', 'audio'],
					},
				},
				default: '',
				required: true,
				description: 'URL of the original content (must be HTTPS)',
			},
			{
				displayName: 'Preview Image URL',
				name: 'previewImageUrl',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['image', 'video'],
					},
				},
				default: '',
				required: true,
				description: 'URL of the preview image (must be HTTPS)',
			},
			// Location message fields
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['location'],
					},
				},
				default: '',
				required: true,
				description: 'The title of the location',
			},
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['location'],
					},
				},
				default: '',
				required: true,
				description: 'The address of the location',
			},
			{
				displayName: 'Latitude',
				name: 'latitude',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['location'],
					},
				},
				default: 0,
				required: true,
				description: 'The latitude of the location',
			},
			{
				displayName: 'Longitude',
				name: 'longitude',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['location'],
					},
				},
				default: 0,
				required: true,
				description: 'The longitude of the location',
			},
			// Sticker message fields
			{
				displayName: 'Package ID',
				name: 'packageId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['sticker'],
					},
				},
				default: '',
				required: true,
				description: 'The package ID of the sticker',
			},
			{
				displayName: 'Sticker ID',
				name: 'stickerId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['sticker'],
					},
				},
				default: '',
				required: true,
				description: 'The sticker ID',
			},
			// Flex message fields
			{
				displayName: 'Alt Text',
				name: 'altText',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['flex'],
					},
				},
				default: '',
				required: true,
				description: 'Alternative text for devices that do not support flex messages',
			},
			{
				displayName: 'Flex Contents',
				name: 'flexContents',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						messageType: ['flex'],
					},
				},
				default: '',
				required: true,
				description: 'The flex message container in JSON format',
			},
			// Quick Reply fields
			{
				displayName: 'Add Quick Reply',
				name: 'addQuickReply',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['push', 'reply', 'multicast', 'broadcast'],
					},
				},
				default: false,
				description: 'Whether to add quick reply buttons to the message (max 13 items)',
			},
			{
				displayName: 'Quick Reply Mode',
				name: 'quickReplyMode',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['push', 'reply', 'multicast', 'broadcast'],
						addQuickReply: [true],
					},
				},
				options: [
					{
						name: 'Builder',
						value: 'builder',
						description: 'Use the visual builder to configure quick reply items',
					},
					{
						name: 'JSON',
						value: 'json',
						description: 'Provide quick reply configuration as JSON',
					},
				],
				default: 'builder',
				description: 'Choose how to configure quick reply buttons',
			},
			{
				displayName: 'Quick Reply JSON',
				name: 'quickReplyJson',
				type: 'json',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['push', 'reply', 'multicast', 'broadcast'],
						addQuickReply: [true],
						quickReplyMode: ['json'],
					},
				},
				default: '{ "items": [] }',
				required: true,
				description: 'Quick reply configuration in JSON format. Must contain an "items" array.',
				placeholder: '{\n  "items": [\n    {\n      "type": "action",\n      "action": {\n        "type": "message",\n        "label": "Yes",\n        "text": "Yes"\n      }\n    }\n  ]\n}',
			},
			{
				displayName: 'Quick Reply Items',
				name: 'quickReplyItems',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['push', 'reply', 'multicast', 'broadcast'],
						addQuickReply: [true],
						quickReplyMode: ['builder'],
					},
				},
				default: {},
				options: [
					{
						name: 'items',
						displayName: 'Item',
						values: [
							{
								displayName: 'Action Type',
								name: 'actionType',
								type: 'options',
								options: [
									{
										name: 'Message',
										value: 'message',
										description: 'Send a text message when tapped',
									},
									{
										name: 'Postback',
										value: 'postback',
										description: 'Send postback data',
									},
									{
										name: 'URI',
										value: 'uri',
										description: 'Open a URL',
									},
									{
										name: 'Location',
										value: 'location',
										description: 'Send user location',
									},
									{
										name: 'Camera',
										value: 'camera',
										description: 'Open camera',
									},
									{
										name: 'Camera Roll',
										value: 'cameraRoll',
										description: 'Open camera roll',
									},
									{
										name: 'Datetime Picker',
										value: 'datetimepicker',
										description: 'Open date/time picker',
									},
								],
								default: 'message',
								description: 'The type of action to perform',
							},
							{
								displayName: 'Label',
								name: 'label',
								type: 'string',
								default: '',
								required: true,
								description: 'Text displayed on the quick reply button',
							},
							{
								displayName: 'Icon URL',
								name: 'imageUrl',
								type: 'string',
								default: '',
								description:
									'Optional icon image URL (HTTPS only). If not set, default icons will be used for camera/location actions.',
							},
							{
								displayName: 'Text',
								name: 'text',
								type: 'string',
								displayOptions: {
									show: {
										actionType: ['message'],
									},
								},
								default: '',
								required: true,
								description: 'Message text to send when button is tapped',
							},
							{
								displayName: 'Postback Data',
								name: 'data',
								type: 'string',
								displayOptions: {
									show: {
										actionType: ['postback'],
									},
								},
								default: '',
								required: true,
								description: 'Postback data string (max 300 characters)',
							},
							{
								displayName: 'Display Text',
								name: 'displayText',
								type: 'string',
								displayOptions: {
									show: {
										actionType: ['postback'],
									},
								},
								default: '',
								description: 'Optional text displayed in chat when button is tapped',
							},
							{
								displayName: 'URI',
								name: 'uri',
								type: 'string',
								displayOptions: {
									show: {
										actionType: ['uri'],
									},
								},
								default: '',
								required: true,
								description: 'URL to open (http, https, tel, or line schemes)',
							},
							{
								displayName: 'Datetime Mode',
								name: 'mode',
								type: 'options',
								displayOptions: {
									show: {
										actionType: ['datetimepicker'],
									},
								},
								options: [
									{
										name: 'Date',
										value: 'date',
									},
									{
										name: 'Time',
										value: 'time',
									},
									{
										name: 'Datetime',
										value: 'datetime',
									},
								],
								default: 'date',
								description: 'Picker mode',
							},
							{
								displayName: 'Datetime Data',
								name: 'datetimeData',
								type: 'string',
								displayOptions: {
									show: {
										actionType: ['datetimepicker'],
									},
								},
								default: '',
								required: true,
								description: 'Data returned via postback event',
							},
						],
					},
				],
				description: 'Quick reply button items (max 13)',
			},
			// Message:Get Content fields
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['getContent'],
					},
				},
				default: '',
				required: true,
				description: 'The message ID from LINE webhook event (e.g., from LINE Trigger output)',
				placeholder: 'e.g., {{ $json.message.id }}',
			},
			{
				displayName: 'Download as Binary',
				name: 'binaryProperty',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['getContent'],
					},
				},
				default: 'data',
				required: true,
				description: 'Name of the binary property to store the downloaded content',
				placeholder: 'data',
			},
			// Profile:Get fields
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['profile'],
						operation: ['get'],
					},
				},
				default: '',
				required: true,
				description: 'The ID of the user to get the profile for',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const buildMessage = (messageType: string, itemIndex: number): any => {
			const message: any = { type: messageType };

			switch (messageType) {
				case 'text':
					message.text = this.getNodeParameter('text', itemIndex) as string;
					break;
				case 'image':
					message.originalContentUrl = this.getNodeParameter(
						'originalContentUrl',
						itemIndex,
					) as string;
					message.previewImageUrl = this.getNodeParameter('previewImageUrl', itemIndex) as string;
					break;
				case 'video':
					message.originalContentUrl = this.getNodeParameter(
						'originalContentUrl',
						itemIndex,
					) as string;
					message.previewImageUrl = this.getNodeParameter('previewImageUrl', itemIndex) as string;
					break;
				case 'audio':
					message.originalContentUrl = this.getNodeParameter(
						'originalContentUrl',
						itemIndex,
					) as string;
					message.duration = 60000; // Default duration
					break;
				case 'location':
					message.title = this.getNodeParameter('title', itemIndex) as string;
					message.address = this.getNodeParameter('address', itemIndex) as string;
					message.latitude = this.getNodeParameter('latitude', itemIndex) as number;
					message.longitude = this.getNodeParameter('longitude', itemIndex) as number;
					break;
				case 'sticker':
					message.packageId = this.getNodeParameter('packageId', itemIndex) as string;
					message.stickerId = this.getNodeParameter('stickerId', itemIndex) as string;
					break;
				case 'flex':
					const altText = this.getNodeParameter('altText', itemIndex) as string;
					const flexContents = this.getNodeParameter('flexContents', itemIndex) as string;
					message.altText = altText;
					message.contents =
						typeof flexContents === 'string' ? JSON.parse(flexContents) : flexContents;
					break;
			}

			// Add quick reply if enabled
			const addQuickReply = this.getNodeParameter('addQuickReply', itemIndex, false) as boolean;
			if (addQuickReply) {
				const quickReplyMode = this.getNodeParameter('quickReplyMode', itemIndex, 'builder') as string;

				if (quickReplyMode === 'json') {
					// JSON mode: Use the raw JSON input
					const quickReplyJson = this.getNodeParameter('quickReplyJson', itemIndex) as string;
					const quickReplyData = typeof quickReplyJson === 'string' 
						? JSON.parse(quickReplyJson) 
						: quickReplyJson;
					
					if (quickReplyData && quickReplyData.items) {
						message.quickReply = quickReplyData;
					}
				} else {
					// Builder mode: Use the collection input
					const quickReplyItems = this.getNodeParameter('quickReplyItems', itemIndex, {
						items: [],
					}) as { items: any[] };

					if (quickReplyItems.items && quickReplyItems.items.length > 0) {
						const items = quickReplyItems.items.map((item: any) => {
							const quickReplyItem: any = {
								type: 'action',
								action: {
									type: item.actionType,
									label: item.label,
								},
							};

							// Add optional image URL
							if (item.imageUrl) {
								quickReplyItem.imageUrl = item.imageUrl;
							}

							// Add action-specific properties
							switch (item.actionType) {
								case 'message':
									quickReplyItem.action.text = item.text;
									break;
								case 'postback':
									quickReplyItem.action.data = item.data;
									if (item.displayText) {
										quickReplyItem.action.displayText = item.displayText;
									}
									break;
								case 'uri':
									quickReplyItem.action.uri = item.uri;
									break;
								case 'datetimepicker':
									quickReplyItem.action.data = item.datetimeData;
									quickReplyItem.action.mode = item.mode || 'date';
									break;
								// camera, cameraRoll, and location actions only need type and label
							}

							return quickReplyItem;
						});

						message.quickReply = { items };
					}
				}
			}

			return message;
		};

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData;

				if (resource === 'message') {
					if (operation === 'getContent') {
						// Get binary content from LINE
						const messageId = this.getNodeParameter('messageId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryProperty', i) as string;

						const response = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'lineMessagingApi',
							{
								method: 'GET',
								url: `https://api-data.line.me/v2/bot/message/${messageId}/content`,
								encoding: 'arraybuffer',
								json: false,
								returnFullResponse: true,
							},
						);

						const binaryData = await this.helpers.prepareBinaryData(
							response.body as Buffer,
							undefined,
							response.headers['content-type'] as string,
						);

						const newItem: INodeExecutionData = {
							json: {
								messageId,
								mimeType: response.headers['content-type'],
								size: (response.body as Buffer).length,
							},
							binary: {
								[binaryPropertyName]: binaryData,
							},
							pairedItem: { item: i },
						};

						returnData.push(newItem);
						continue;
					}

					const messageType = this.getNodeParameter('messageType', i) as string;
					const message = buildMessage(messageType, i);

					if (operation === 'push') {
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'lineMessagingApi',
							{
								method: 'POST',
								url: 'https://api.line.me/v2/bot/message/push',
								body: {
									to: userId,
									messages: [message],
								},
								json: true,
							},
						);
					} else if (operation === 'reply') {
						const replyToken = this.getNodeParameter('replyToken', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'lineMessagingApi',
							{
								method: 'POST',
								url: 'https://api.line.me/v2/bot/message/reply',
								body: {
									replyToken,
									messages: [message],
								},
								json: true,
							},
						);
					} else if (operation === 'multicast') {
						const userIdsString = this.getNodeParameter('userIds', i) as string;
						const userIds = userIdsString.split(',').map((id) => id.trim());
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'lineMessagingApi',
							{
								method: 'POST',
								url: 'https://api.line.me/v2/bot/message/multicast',
								body: {
									to: userIds,
									messages: [message],
								},
								json: true,
							},
						);
					} else if (operation === 'broadcast') {
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'lineMessagingApi',
							{
								method: 'POST',
								url: 'https://api.line.me/v2/bot/message/broadcast',
								body: {
									messages: [message],
								},
								json: true,
							},
						);
					}
				} else if (resource === 'profile') {
					if (operation === 'get') {
						const userId = this.getNodeParameter('userId', i) as string;
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'lineMessagingApi',
							{
								method: 'GET',
								url: `https://api.line.me/v2/bot/profile/${userId}`,
								json: true,
							},
						);
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData || { success: true }),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({
						json: { error: errorMessage },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
