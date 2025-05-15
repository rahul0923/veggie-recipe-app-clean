# Tips for maintaining context in future conversations

## Create a Project Documentation File
Create a markdown file (e.g., project-journal.md) where you document:

- **Key decisions made**
- **Problems solved**
- **Current Architecture**
- **Future Plans**

## Use GitHub Issues and Pull Requests
- **Open issues for each task/bug**
- **Reference conversation topics in PR descriptions**
- **Use commit messages that explicitly mention changes**

## Before Starting New Conversations
Begin with a brief summary

I'm working on the GreenPlate recipe app. Previously we:
1. Fixed footer navigation issues by using div elements with onClick
2. Restructured app to use AppContent for better navigation handling
3. Started planning Vercel deployment

Today I'd like to discuss [new topic].

## Create Code Snapshots/Versions
When you reach a milestone:

- Create a tagged version in Git
- Or save a separate branch for reference
- Reference these when starting new conversations

## Share Key Files at Start of Conversation
When starting a new conversation, share:

- Current directory structure (ls -la output)
- Main architecture files (App.jsx, AppContent.jsx)
- Any files directly relevant to your question

## Maintain a README.md with Development Notes
Add a development notes section to your README:

---

*Last Updated: May 15, 2025*