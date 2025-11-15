<div align="center">

# 📱 LINE Messaging API for n8n

[![npm version](https://img.shields.io/npm/v/@warnyin/n8n-nodes-line-messaging-api)](https://www.npmjs.com/package/@warnyin/n8n-nodes-line-messaging-api)
[![npm downloads](https://img.shields.io/npm/dt/@warnyin/n8n-nodes-line-messaging-api)](https://www.npmjs.com/package/@warnyin/n8n-nodes-line-messaging-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Powerful LINE Messaging API integration for [n8n](https://n8n.io/) workflows**

Send messages, manage users, and automate your LINE Official Account with ease

[Installation](#-installation) • [Features](#-features) • [Usage](#-usage) • [Examples](#-workflow-examples) • [Documentation](#-documentation)

</div>

---

## 🚀 Installation

### Option 1: Via n8n UI (Recommended)

1. Open your **n8n instance**
2. Navigate to **Settings** → **Community Nodes**
3. Click **"Install a community node"**
4. Enter: `@warnyin/n8n-nodes-line-messaging-api`
5. Click **Install**

### Option 2: Manual Installation

```bash
npm install @warnyin/n8n-nodes-line-messaging-api
```

### Option 3: Docker

Add to your environment variables:

```bash
N8N_COMMUNITY_PACKAGES=@warnyin/n8n-nodes-line-messaging-api
```

---

## ⚙️ Configuration

### 1. Create a LINE Messaging API Channel

1. Visit [LINE Developers Console](https://developers.line.biz/console/)
2. Create a new **Provider** or select an existing one
3. Create a **Messaging API Channel**
4. Navigate to **Messaging API** tab
5. Copy your **Channel Access Token** (issue one if needed)
6. Copy your **Channel Secret**

### 2. Configure Credentials in n8n

1. In n8n, go to **Credentials** → **New Credential**
2. Search for **LINE Messaging API**
3. Paste your **Channel Access Token**
4. Paste your **Channel Secret**
5. Click **Save** to test the connection

### 3. Set Up Webhook (Optional - for receiving messages)

<details>
<summary>📋 Click to expand webhook setup instructions</summary>

To **receive** messages from LINE users:

1. In n8n, create a new workflow
2. Add a **Webhook** node
3. Set **HTTP Method** to `POST`
4. Set **Path** to something like `line-webhook`
5. **Copy the Production URL** (e.g., `https://your-n8n.com/webhook/line-webhook`)
6. Go to [LINE Developers Console](https://developers.line.biz/console/)
7. Select your channel → **Messaging API** tab
8. Under **Webhook settings**, click **Edit**
9. Paste your n8n webhook URL
10. Toggle **Use webhook** to **Enabled**
11. Click **Verify** to test

</details>

---

## ✨ Features

### 📨 Message Operations

| Operation | Description | Max Recipients |
|-----------|-------------|----------------|
| **Push** | Send message to a specific user | 1 user |
| **Reply** | Reply to user messages (requires reply token) | 1 user |
| **Multicast** | Send message to multiple users | 500 users |
| **Broadcast** | Send message to all followers | All followers |

### 💬 Message Types

<table>
<tr>
<td>

**Basic Messages**
- 📝 Text
- 🖼️ Image
- 🎥 Video
- 🎵 Audio

</td>
<td>

**Rich Messages**
- 📍 Location
- 😊 Sticker
- 🎨 Flex (JSON-based)

</td>
</tr>
</table>

### 👤 Profile Operations

- **Get User Profile**: Retrieve user information (display name, picture URL, status message)

---

## 📖 Usage

### Basic Text Message

```
┌─────────────┐
│  LINE Node  │
├─────────────┤
│ Resource: Message
│ Operation: Push
│ User ID: U1234567890abcdef
│ Message Type: Text
│ Text: Hello from n8n! 👋
└─────────────┘
```

### Reply to User Message

```
┌──────────────┐     ┌─────────────┐
│ Webhook Node │────▶│  LINE Node  │
├──────────────┤     ├─────────────┤
│ Receive LINE │     │ Resource: Message
│ events       │     │ Operation: Reply
└──────────────┘     │ Reply Token: {{$json.replyToken}}
                     │ Message Type: Text
                     │ Text: Thanks for your message!
                     └─────────────┘
```

### Send Image Message

```
┌─────────────┐
│  LINE Node  │
├─────────────┤
│ Resource: Message
│ Operation: Push
│ User ID: U1234567890abcdef
│ Message Type: Image
│ Original Content URL: https://example.com/image.jpg
│ Preview Image URL: https://example.com/preview.jpg
└─────────────┘
```

### Send Flex Message

```
┌─────────────┐
│  LINE Node  │
├─────────────┤
│ Resource: Message
│ Operation: Push
│ User ID: U1234567890abcdef
│ Message Type: Flex
│ Alt Text: Product Information
│ Flex Contents: {
│   "type": "bubble",
│   "body": {
│     "type": "box",
│     "layout": "vertical",
│     "contents": [...]
│   }
│ }
└─────────────┘
```

---

## 🔄 Workflow Examples

### Example 1: Auto-Reply Bot

```
Webhook (LINE) → Code (Extract message) → LINE (Reply)
```

**Code Node:**
```javascript
const event = $input.item.json.events[0];
return {
  replyToken: event.replyToken,
  userMessage: event.message.text,
  userId: event.source.userId
};
```

### Example 2: Broadcast Daily Updates

```
Schedule Trigger → HTTP Request (Get data) → LINE (Broadcast)
```

### Example 3: User Info Lookup

```
Manual Trigger → LINE (Get Profile) → Set Node → ...
```

---

## 🛠️ Development

### Prerequisites

- Node.js ≥ 14
- npm or yarn

### Local Setup

```bash
# Clone the repository
git clone https://github.com/warnyin/n8n-nodes-line-messaging-api.git
cd n8n-nodes-line-messaging-api

# Install dependencies
npm install

# Build the project
npm run build

# Link for local testing
npm link

# In your n8n directory
npm link @warnyin/n8n-nodes-line-messaging-api
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript and copy assets |
| `npm run dev` | Watch mode for development |
| `npm run lint` | Run ESLint |
| `npm run lintfix` | Fix ESLint issues automatically |
| `npm run format` | Format code with Prettier |

---

## 📚 Documentation

### Official Resources

- 📘 [LINE Messaging API Reference](https://developers.line.biz/en/docs/messaging-api/)
- 🎨 [Flex Message Simulator](https://developers.line.biz/flex-simulator/)
- 🔧 [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
- 💬 [LINE Developers Community](https://www.line-community.me/)

### Useful Links

- [Get Channel Access Token](https://developers.line.biz/en/docs/messaging-api/channel-access-tokens/)
- [Webhook Event Reference](https://developers.line.biz/en/reference/messaging-api/#webhook-event-objects)
- [Message Types Reference](https://developers.line.biz/en/reference/messaging-api/#message-objects)

---

## 🐛 Troubleshooting

<details>
<summary><strong>Authentication failed - please check your credentials</strong></summary>

1. Verify your **Channel Access Token** is correct
2. Ensure the token is a **long-lived** token (not short-lived)
3. Check that the token hasn't **expired**
4. Make sure you copied the token from the **correct channel**

The error message in v0.1.4+ will show detailed API responses to help debug.

</details>

<details>
<summary><strong>Webhook not receiving messages</strong></summary>

1. Ensure **webhook URL is publicly accessible** (https required)
2. Verify **"Use webhook"** is enabled in LINE console
3. Check **webhook URL** matches exactly in LINE console
4. Test webhook verification in LINE console
5. Ensure n8n workflow is **activated**

</details>

<details>
<summary><strong>Message sending fails</strong></summary>

1. Check **User ID** format is correct (starts with `U`)
2. For replies, ensure **reply token** is valid (only usable once, expires in 1 minute)
3. Verify **message content** meets LINE's requirements (e.g., URLs must be HTTPS)
4. Check rate limits haven't been exceeded

</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [n8n](https://n8n.io/) - Fair-code workflow automation
- Powered by [LINE Messaging API](https://developers.line.biz/en/services/messaging-api/)
- Developed by [@warnyin](https://github.com/warnyin)

---

<div align="center">

**[⬆ back to top](#-line-messaging-api-for-n8n)**

Made with ❤️ for the n8n community

</div>
