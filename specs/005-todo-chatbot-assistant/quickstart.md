# Quickstart: Todo Assistant Chatbot

**Feature**: Todo Assistant Chatbot
**Created**: 2026-01-01

## Overview

The Todo Assistant is a frontend-only chatbot that helps users understand and use the Todo application. It provides rule-based responses to common questions using keyword matching, with no external APIs or AI models.

## Project Structure

```
frontend/src/
├── components/Chatbot/
│   ├── Chatbot.tsx          # Main container component
│   ├── ChatbotButton.tsx    # Floating action button
│   ├── ChatbotPanel.tsx     # Slide-in chat panel
│   ├── ChatMessage.tsx      # Message bubble component
│   ├── ChatInput.tsx        # Text input with send button
│   └── QuickTopics.tsx      # Quick help topic buttons
├── context/
│   └── ChatbotContext.tsx   # React Context for state
└── lib/chatbot/
    ├── knowledgeBase.ts     # Predefined responses
    └── intentMatcher.ts     # Keyword matching logic
```

## Adding New Help Content

### Adding a New Knowledge Entry

Edit `frontend/src/lib/chatbot/knowledgeBase.ts`:

```typescript
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  // Existing entries...
  {
    id: 'new-topic',
    category: 'general',
    keywords: ['keyword1', 'keyword2', 'related term'],
    response: 'Your helpful response text here. Explain the concept clearly.'
  },
];
```

**Guidelines for New Entries**:
- Use 3-5 relevant keywords
- Keep response between 50-200 words
- Match the tone and style of existing responses
- Test keyword matching before committing

### Adding a Quick Topic

Edit the `QUICK_TOPICS` constant in `frontend/src/lib/chatbot/knowledgeBase.ts`:

```typescript
export const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'create-todo',
    label: 'Creating Todos',
    keywords: ['create', 'add', 'new'],
    response: KNOWLEDGE_BASE.find(e => e.id === 'create-todo')!.response,
  },
  // Add new topic...
];
```

## Customizing the Refusal Message

Edit `frontend/src/lib/chatbot/intentMatcher.ts`:

```typescript
export const OFF_TOPIC_RESPONSE = "I can help only with Todo app features 🙂";
```

## Styling

### Button Styling

Edit `frontend/src/components/Chatbot/ChatbotButton.tsx`:

```tsx
// Key classes for the FAB
const buttonClasses = `
  fixed bottom-4 right-4
  w-14 h-14 rounded-full
  bg-gradient-to-r from-primary to-secondary
  shadow-lg shadow-primary/30
  hover:shadow-xl hover:shadow-primary/40
  transition-all duration-300
`;
```

### Panel Styling

Edit `frontend/src/components/Chatbot/ChatbotPanel.tsx`:

```tsx
// Key classes for the panel
const panelClasses = `
  fixed bottom-20 right-4
  w-[400px] max-h-[500px]
  bg-panel/90 backdrop-blur-lg
  rounded-2xl border border-border/50
  shadow-2xl overflow-hidden
`;
```

## Animations

Framer Motion configuration in `ChatbotPanel.tsx`:

```typescript
const panelVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
```

## Testing

### Running Tests

```bash
cd frontend
npm test -- --testPathPattern=Chatbot
```

### Writing New Tests

```typescript
// tests/Chatbot/Chatbot.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Chatbot } from '@/components/Chatbot/Chatbot';

test('opens chatbot when button is clicked', () => {
  render(<Chatbot />);
  const button = screen.getByRole('button', { name: /chat/i });
  fireEvent.click(button);
  expect(screen.getByText(/how can i help/i)).toBeInTheDocument();
});
```

## Deployment

The chatbot is built as part of the Next.js application. No separate deployment needed.

1. Build the frontend: `npm run build`
2. Start production server: `npm start`
3. Chatbot automatically available on `/dashboard` and `/dashboard/todos`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Button not visible | Check route is `/dashboard` or `/dashboard/todos` |
| Keywords not matching | Ensure lowercase matching in intentMatcher |
| Panel not animating | Verify Framer Motion is installed |
| Messages not appearing | Check ChatMessage component props |
| Quick topics not working | Verify QuickTopic.id matches KnowledgeEntry.id |
