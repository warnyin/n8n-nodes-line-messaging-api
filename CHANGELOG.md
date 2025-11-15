# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-15

### Added
- **NEW: LINE Trigger Node** - Dedicated webhook receiver for LINE events
  - Supports all LINE webhook events (message, follow, unfollow, join, leave, memberJoined, memberLeft, postback, beacon, accountLink, things)
  - Built-in signature verification for security
  - Filter events by type (multi-select)
  - Automatically parses and structures event data
  - Extracts message content based on type (text, image, video, audio, location, sticker, file)
  - Provides replyToken for easy message replies
  - Clean, structured output for each event type

### Breaking Changes
- None (this is a new feature addition)

## [0.1.6] - 2025-11-15

### Added
- Console logging throughout credential test for debugging
- Display bot name in success message
- Better formatted error messages with troubleshooting steps

### Improved
- Enhanced error messages with clear formatting
- Added checkmarks (✅/❌) for visual feedback
- More detailed troubleshooting guidance in error responses

## [0.1.5] - 2025-11-15

### Changed
- Completely redesigned README with beautiful formatting
- Added npm badges (version, downloads, license)
- Improved documentation structure with emoji headers
- Added visual workflow examples with ASCII diagrams
- Added troubleshooting section with expandable solutions
- Added comprehensive usage examples and code snippets
- Better organized sections with tables and collapsible details
- Added contributing guidelines and acknowledgments

## [0.1.4] - 2025-11-15

### Added
- Detailed error logging in credential test
- Shows HTTP status code, error message, and response details
- Displays first 10 characters of token for verification

### Changed
- Replaced simple credential test with custom test function
- Better error messages to help debug authentication issues

## [0.1.3] - 2025-11-15

### Fixed
- Fixed Authorization header template syntax in credentials
- Simplified credential test URL configuration
- Should now properly authenticate with LINE API

## [0.1.2] - 2025-11-15

### Fixed
- Credential test now uses GET method instead of POST for `/bot/info` endpoint
- Fixed "Authorization failed" error when testing credentials

## [0.1.1] - 2025-11-15

### Added
- Helpful webhook setup instructions in credential configuration
- Notice fields in credentials to guide users on webhook configuration

### Changed
- Improved credential UI with webhook setup guidance

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
