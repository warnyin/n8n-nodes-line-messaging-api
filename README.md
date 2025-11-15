# n8n-nodes-line-messaging-api

n8n community node for integrating with the LINE Messaging API.

[n8n](https://n8n.io/) is a workflow automation platform that allows you to connect various services and APIs. This package extends n8n with LINE Messaging API capabilities.

## Installation

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to Settings > Community Nodes
3. Search for `n8n-nodes-line-messaging-api`
4. Click Install

### Manual Installation

```bash
npm install n8n-nodes-line-messaging-api
```

## Configuration

To use this node, you need to set up a LINE Messaging API channel:

1. Go to [LINE Developers Console](https://developers.line.biz/console/)
2. Create a new provider or select an existing one
3. Create a Messaging API channel
4. Get your Channel Access Token and Channel Secret from the channel settings
5. In n8n, create a new LINE Messaging API credential with these values

## Features

### Resources

#### Message
- **Push**: Send messages to individual users
- **Reply**: Reply to messages received via webhook
- **Multicast**: Send messages to multiple users (up to 500)
- **Broadcast**: Send messages to all users who have added your LINE Official Account

#### Profile
- **Get**: Retrieve user profile information

### Message Types

- **Text**: Simple text messages
- **Image**: Send images with preview
- **Video**: Send videos with preview images
- **Audio**: Send audio files
- **Location**: Share location with coordinates
- **Sticker**: Send LINE stickers
- **Flex**: Send rich interactive Flex Messages (JSON format)

## Usage Examples

### Send a Text Message

1. Add the LINE node to your workflow
2. Select Resource: `Message`
3. Select Operation: `Push`
4. Enter the User ID
5. Select Message Type: `Text`
6. Enter your message text

### Send a Flex Message

1. Select Message Type: `Flex`
2. Enter alternative text
3. Provide your Flex Message JSON in the Flex Contents field

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run linter
npm run lint

# Format code
npm run format
```

### Testing Locally

To test this node in your local n8n instance:

```bash
# Link the package
npm link

# In your n8n installation directory
npm link n8n-nodes-line-messaging-api

# Restart n8n
```

## Resources

- [LINE Messaging API Documentation](https://developers.line.biz/en/docs/messaging-api/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Flex Message Simulator](https://developers.line.biz/flex-simulator/)

## License

MIT

## Credits

Made with [n8n](https://n8n.io/)
