# Garden Ally

### Live URL: &nbsp; &nbsp; [garden-ally.vercel.app](https://garden-ally-client.vercel.app/)

## Introduction

Garden Ally, a platform dedicated to connecting gardening enthusiasts and professionals. The app facilitates user engagement by enabling profile management, community interactions, content sharing, and access to premium gardening resources. With features like account verification, content upvoting, and secure data handling, Garden Ally offers an intuitive interface that empowers users to exchange tips, explore exclusive content, and build a thriving community around their gardening passions.

## Table of Contents

- [Features](#key-features)
- [Technologies](#technology-stack)
- [Installation](#installation-instructions)
- [Usage](#usage)

## Key Features

- **User Authentication**: Simple email registration, secure JWT login, with password reset options;

- **User Profile Management**: Editable profile with a "My Profile" section for posts, followers/following; verification available after one upvote via AAMARPAY for premium access and badge display.

- **Post Creation & Sharing**: Creating/editing tips with image uploads, categorized by topics (Vegetables, Flowers, etc.); verified users can mark posts as Premium.

- **Upvote & Downvote System**: Users can upvote/downvote posts to surface top content.

- **Commenting System**: Commenting with edit/delete options, plus optional replies for more interaction.

- **Payment Integration**: Aamarpay for premium content and profile verification payments.

- **News Feed**: Infinite scroll feed with search/filtering; top upvoted content is prioritized.

- **Following System**: Follow other users for personalized gardening content in the feed.

- **Unique Section (Tips & Tricks)**: Discover personalized gardening inspiration by following other users, and get tailored tips and tricks right in your feed!

## Technology Stack

- **Frontend**: Built with `NextJS`, leveraging `TypeScript` for type safety and maintainability.
- **Backend**: Powered by `Node.js` and `Express.js`, with `MongoDB` as the database solution.
- **Authentication**: Secured with `JWT` (JSON Web Tokens) for user authentication.
- **UI/UX**: Designed with responsiveness and usability in mind, ensuring a smooth experience across all devices.

## Installation Instructions

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v22.1.0 or higher)
- npm (v10.7.0 or higher)

### Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ShamimaNasrin/garden-ally-client
   cd garden-ally-client
   ```

2. **Install Dependencies**:

   ```bash
   npm i
   ```

3. **Run the app**:

   ```bash
   npm run dev
   ```

## Usage

- Authenticate and authorize users through JWT tokens for secure access to features.
- Allow admins to moderate posts, manage user accounts, and oversee community standards.
- Enable users to create and share gardening tips, upvote content, comment, and follow others in the community.
- Process premium features, such as verifying user profiles and granting access to exclusive content through secure payment integration.
