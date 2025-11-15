# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n custom node package for integrating with the LINE Messaging API. n8n is a workflow automation tool, and this package extends it with LINE messaging capabilities.

## Development Setup

When setting up the development environment:
- This is an n8n community node package that should follow n8n's node development guidelines
- Nodes should be TypeScript-based (.node.ts files)
- Package should include proper n8n node metadata in package.json

## Project Structure

```
.
├── nodes/
│   └── Line/
│       ├── Line.node.ts      # Main LINE node implementation
│       └── line.svg           # Node icon
├── credentials/
│   └── LineMessagingApi.credentials.ts  # LINE API credentials definition
├── dist/                      # Build output (generated)
├── package.json
├── tsconfig.json
└── gulpfile.js               # Build tasks for copying icons
```

## Architecture Notes

**n8n Node Structure:**
- Nodes are placed in `nodes/Line/` directory
- The main node class (`Line`) implements `INodeType` interface
- Credentials are defined in `credentials/LineMessagingApi.credentials.ts`
- Node properties define the UI and parameters in n8n's workflow editor
- The `execute` method contains the main logic for API calls

**LINE Messaging API Integration:**
- Uses LINE's REST API (https://api.line.me/v2/bot/)
- Authentication via `httpRequestWithAuthentication` helper with Bearer token
- Supports multiple message types: text, image, video, audio, location, sticker, flex
- Message operations: push, reply, multicast, broadcast
- Profile operations: get user profile

**Key Implementation Details:**
- `buildMessage` helper function (inside execute) constructs LINE message objects based on type
- Error handling uses n8n's `continueOnFail()` pattern
- Response data uses `constructExecutionMetaData` for proper n8n data flow

## Common Commands

```bash
# Install dependencies
npm install

# Build the project (TypeScript compilation + copy icons)
npm run build

# Watch mode for development
npm run dev

# Lint the code
npm run lint

# Auto-fix linting issues
npm run lintfix

# Format code with Prettier
npm run format

# Link for local testing in n8n
npm link
```

## Important Considerations

- Follow n8n's versioning for node compatibility (check n8n version in peerDependencies)
- LINE API responses and errors should be properly handled and surfaced to users
- Resource operations (messages, users, rich menus) should be organized as separate operations within nodes
- Authentication should use n8n's credential system for secure token storage
