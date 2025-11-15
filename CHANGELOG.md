# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-15

### Added

#### Resources
- **Message Resource**: Send messages through LINE Messaging API
  - Push operation: Send messages to individual users
  - Reply operation: Reply to messages received via webhook
  - Multicast operation: Send messages to multiple users (up to 500)
  - Broadcast operation: Send messages to all followers

- **Profile Resource**: Retrieve user information
  - Get operation: Fetch user profile details

#### Message Types
- Text messages
- Image messages (with preview URL support)
- Video messages (with preview URL support)
- Audio messages
- Location messages (with coordinates)
- Sticker messages (LINE sticker support)
- Flex messages (rich interactive JSON-based messages)

#### Credentials
- LINE Messaging API credentials configuration
  - Channel Access Token authentication
  - Channel Secret support
  - Built-in credential testing

#### Developer Tools
- TypeScript-based implementation
- ESLint configuration for code quality
- Prettier configuration for code formatting
- Build pipeline with TypeScript compilation
- Icon assets support via Gulp
- Comprehensive documentation (README.md, CLAUDE.md)

### Technical Details
- Built with n8n-workflow API version 1
- Uses LINE Messaging API v2
- HTTPS-only content URLs for media messages
- Error handling with continueOnFail support
- Proper n8n execution metadata construction

[0.1.0]: https://github.com/warnyin/n8n-nodes-line-messaging-api/releases/tag/v0.1.0
