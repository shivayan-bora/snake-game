# Snake Game 🐍

A classic Snake game built for the terminal using React and Ink. Experience the nostalgia of the classic Snake game right in your command line!

## Features

- 🎮 Classic Snake gameplay with smooth controls
- 🍎 Randomly placed food items
- 🏆 Real-time score tracking
- 💚 Beautiful terminal UI with colors and emojis
- ⌨️ Intuitive arrow key controls
- 🎯 Game over detection when snake hits itself
- 🔄 Wrapping game field (snake reappears on opposite side)

## Installation

### Global Installation

```bash
npm install -g snake-game
snake-game
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/shivayanbora/snake-game.git
cd snake-game

# Install dependencies
npm install

# Build the project
npm run build

# Run the game
npm start
```

## How to Play

1. **Start the game**: Run `snake-game` in your terminal
2. **Move the snake**: Use arrow keys to control direction
   - ⬅️ Left Arrow: Move left
   - ➡️ Right Arrow: Move right  
   - ⬆️ Up Arrow: Move up
   - ⬇️ Down Arrow: Move down
3. **Eat food**: Guide your snake to the red apple 🍎 to grow and increase your score
4. **Avoid collision**: Don't let the snake hit itself!
5. **Quit**: Press `q` to exit the game

## Game Rules

- The snake moves continuously in the current direction
- Eating food (🍎) increases your score by 1 and makes the snake grow longer
- The snake wraps around the edges of the 16x16 game field
- Game ends when the snake collides with itself
- You cannot reverse direction immediately (prevents accidental self-collision)

## Technical Details

### Built With

- **React**: For component-based UI structure
- **Ink**: For rendering React components in the terminal
- **TypeScript**: For type safety and better development experience
- **Node.js**: Runtime environment (requires Node.js ≥16)

### Architecture

- **16x16 Grid**: Game field with coordinate-based positioning
- **Game Loop**: Runs at 100ms intervals using custom `useInterval` hook
- **State Management**: React hooks for snake segments, food position, direction, and score
- **Collision Detection**: Checks for self-collision and food consumption
- **Input Handling**: Real-time keyboard input processing with Ink's `useInput`

## Development

### Scripts

```bash
# Build the project
npm run build

# Development with watch mode
npm run dev

# Start the built game
npm start
```

### File Structure

```
snake-game/
├── source/
│   ├── app.tsx          # Main game component and logic
│   ├── cli.tsx          # CLI entry point
│   └── useInterval.ts   # Custom React hook for game timing
├── dist/                # Compiled JavaScript output
├── test.tsx            # Test files
├── package.json        # Project configuration
└── README.md          # This file
```

## Contributing

Contributions are welcome! Here are some ways you can help:

- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 🔧 Submit pull requests
- 📖 Improve documentation

## License

MIT © [Shivayan Bora](mailto:bora.shivayan@gmail.com)

---

**Enjoy the game!** 🎮 If you like this project, please give it a ⭐ on GitHub!
