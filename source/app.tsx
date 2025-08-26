import React, {useEffect, useState} from 'react';
import {Text, Box, useInput, useApp} from 'ink';
import useInterval from './useInterval.js';

type Coordinates = {
	x: number;
	y: number;
};

// Dimensions of our snake field. It will be 16x16 field i.e. both height and widht would be 16
const FIELD_SIZE = 16;
// Will store pre-initialized row of blocks
// Will store numbers from 0 - 16
const FIELD_ROW = [...Array.from({length: FIELD_SIZE}).keys()];

// Directions the snake can move in
const DIRECTIONS = {
	RIGHT: {x: 1, y: 0},
	LEFT: {x: -1, y: 0},
	TOP: {x: 0, y: -1},
	BOTTOM: {x: 0, y: 1},
};

// Used for rendering items at a particular coordinate
function getItem(
	x: number,
	y: number,
	snakeSegments: Coordinates[],
	foodItem: Coordinates,
) {
	if (x === foodItem.x && y === foodItem.y) {
		return <Text>🍎 </Text>;
	}

	for (const segment of snakeSegments) {
		if (x === segment.x && y === segment.y) {
			return <Text color={'greenBright'}>🟩 </Text>;
		}
	}

	return null;
}

// Used for getting the new snake position
function newSnakePosition(
	segments: Coordinates[],
	direction: Coordinates,
	foodItem: Coordinates,
) {
	const [head] = segments;
	const newHead = {
		x: limitByField(head!.x + direction.x),
		y: limitByField(head!.y + direction.y),
	};

	return newHead.x === foodItem.x && newHead.y === foodItem.y
		? [newHead, ...segments]
		: [newHead, ...segments.slice(0, -1)];
}

// The snake shouldn't move outside the bounds of the 16 x 16 field
function limitByField(x: number): number {
	if (x >= FIELD_SIZE) {
		return 0;
	}

	if (x < 0) {
		return FIELD_SIZE - 1;
	}
	return x;
}

export default function App() {
	// Position of each of the segment of the snake
	const [snakeSegments, setSnakeSegments] = useState<Coordinates[]>([
		{
			x: 8,
			y: 8,
		},
		{
			x: 8,
			y: 7,
		},
		{
			x: 8,
			y: 6,
		},
	]);

	// Location of the food item
	const [foodItem, setFoodItem] = useState<Coordinates>({
		x: Math.round(Math.random() * (FIELD_SIZE - 1)),
		y: Math.round(Math.random() * (FIELD_SIZE - 1)),
	});

	const [direction, setDirection] = useState<Coordinates>(DIRECTIONS.LEFT);
	const [score, setScore] = useState(0);
	const {exit} = useApp();

	// Check if the snake hit itself
	const [head, ...tail] = snakeSegments;
	const intersectsWithItself = tail.some(
		segment => segment.x === head!.x && segment.y === head!.y,
	);

	useInterval(
		() => {
			// Every 100ms, update the snakes position. This is to make the snake move
			setSnakeSegments(segments =>
				newSnakePosition(segments, direction, foodItem),
			);
		},
		intersectsWithItself ? null : 100,
	);

	useInput((input, key) => {
		if (input === 'q') {
			exit();
		}

		const isMovingHorizontally =
			direction === DIRECTIONS.RIGHT || direction === DIRECTIONS.LEFT;

		if (key.leftArrow) {
			!isMovingHorizontally && setDirection(DIRECTIONS.LEFT);
		} else if (key.rightArrow) {
			!isMovingHorizontally && setDirection(DIRECTIONS.RIGHT);
		} else if (key.downArrow) {
			isMovingHorizontally && setDirection(DIRECTIONS.BOTTOM);
		} else if (key.upArrow) {
			isMovingHorizontally && setDirection(DIRECTIONS.TOP);
		}
	});

	useEffect(() => {
		const [head] = snakeSegments;
		if (head!.x === foodItem.x && head!.y === foodItem.y) {
			setScore(prevScore => prevScore + 1);
			setFoodItem({
				x: Math.round(Math.random() * (FIELD_SIZE - 1)),
				y: Math.round(Math.random() * (FIELD_SIZE - 1)),
			});
		}
	}, [snakeSegments.length]);

	return (
		<Box flexDirection="column" alignItems="center">
			<Text color="green">Snake Game</Text>
			<Text>Score: {score}</Text>
			{intersectsWithItself ? (
				<Text color={'redBright'}>GAME OVER!</Text>
			) : (
				<></>
			)}
			<Box flexDirection="column">
				{FIELD_ROW.map(y => (
					<Box key={y}>
						{FIELD_ROW.map(x => (
							<Box key={x}>
								{getItem(x, y, snakeSegments, foodItem) || (
									<Text color={'yellow'}> . </Text>
								)}
							</Box>
						))}
					</Box>
				))}
			</Box>
		</Box>
	);
}
