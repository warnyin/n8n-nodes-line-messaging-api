# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2025-11-15

### Removed
- **Webhook Configuration from Credentials** (Reverted changes from 0.4.0)
  - Removed "Webhook Path" field from LINE Messaging API credentials
  - Removed "Webhook Configuration" notice from credentials
  - Simplified credential setup back to just Channel Access Token and Channel Secret

### Changed
- LINE Trigger node webhook path reverted to hardcoded `"webhook"`
- Webhook URL format back to: `https://your-n8n-url/webhook/webhook`
- Simplified webhook setup instructions in LINE Trigger node

### Reason for Revert
- Webhook URL with copy button is already available in the LINE Trigger node itself
- No need for additional configuration in credentials
- Simpler and cleaner user experience

## [0.4.0] - 2025-11-15

### Added
- **Customizable Webhook Path in Credentials**
  - New "Webhook Path" field in LINE Messaging API credentials
  - Configure custom webhook path (default: "line")
  - Webhook URL format: `https://your-n8n-url/webhook/{custom-path}`
  - Path is automatically used in LINE Trigger node
  - Easier setup with consistent path across workflows

### Changed
- LINE Trigger node now reads webhook path from credentials instead of hardcoded "webhook"
- Updated credential UI with better webhook configuration instructions
- Improved webhook setup guidance in LINE Trigger node

### Benefits
- **Consistent configuration**: Set webhook path once in credentials, use everywhere
- **Custom paths**: Use meaningful paths like "line-bot", "line-webhook", etc.
- **Better organization**: Different LINE channels can use different webhook paths

## [0.3.0] - 2025-11-15

### Added
- **LINE Trigger: Auto-download Binary Content** (NEW Feature!)
  - New option "Download Binary Content" in LINE Trigger node
  - Automatically downloads binary files (image, video, audio, file) when user sends them
  - Configurable binary property name (default: "data")
  - Binary data ready to use immediately in workflow
  - Includes metadata in JSON output: `binaryDownloaded`, `mimeType`, `size`
  - Error handling with `binaryDownloadError` field if download fails

### Changed
- LINE Trigger now returns data with proper binary/json structure
- Enhanced output includes download status and file information

### Benefits
- **No extra node needed**: Previously required LINE node with "Get Content" operation
- **Simpler workflows**: One-step process to receive and download media
- **Optional feature**: Can be disabled to use the traditional two-step approach

## [0.2.1] - 2025-11-15

### Added
- **Get Content operation** in Message resource
  - Download binary content (image, video, audio, file) from LINE messages
  - Returns binary data that can be used with other nodes
  - Use message ID from LINE Trigger events
  - Supports custom binary property name

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
