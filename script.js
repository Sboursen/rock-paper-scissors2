"use strict";
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const HANDS = [ROCK, PAPER, SCISSORS];
const PLAYER = "player";
const COMPUTER = "computer";

function generateRandomHand() {
	return HANDS[(Math.random() * HANDS.length) | 0];
}

function getPlayerHand() {
	let playerSelection = "";
	let i = 0;
	let message = "Choose your hand!";
	while (!playerSelection && i < 5) {
		playerSelection = prompt(message);
		playerSelection = playerSelection.toLowerCase();
		if (HANDS.includes(playerSelection)) {
			return playerSelection;
		}
		message = "Choose ROCK, PAPER or SCISSORS only!!!";
		i++;
	}
	alert("You have not chosen a valid answer. May Fortuna be with you.");
	return generateRandomHand();
}

function getComputerHand() {
	return generateRandomHand();
}

function useGameLogic(firstHand, secondHand) {
	const winnerHandIndex =
		(2 * (HANDS.indexOf(firstHand) + HANDS.indexOf(secondHand) + 1)) % 3;
	return HANDS[winnerHandIndex];
}

function playRound(...args) {
	let playerSelection, computerSelection;
	if (arguments.length === 0) {
		playerSelection = getPlayerHand();
		computerSelection = getComputerHand();
	} else {
		playerSelection = args[0];
		computerSelection = args[1];
	}

	const roundResult = useGameLogic(playerSelection, computerSelection);
	let roundScore = { PLAYER: 0, COMPUTER: 0 };
	let winner = "Tie";
	if (roundResult === playerSelection) {
		winner = PLAYER;
	} else if (roundResult === computerSelection) {
		winner = COMPUTER;
	}

	if (winner === PLAYER) {
		console.log("You win, Congratulations!!");
		roundScore.PLAYER++;
	} else if (winner === COMPUTER) {
		console.log("You loose, Sorry!!");
		roundScore.COMPUTER++;
	} else {
		console.log("It's a tie!");
	}

	return roundScore;
}

function playGame() {
	const numberOfRounds = prompt("How many rounds do you want to play?");
	let gameScore = { PLAYER: 0, COMPUTER: 0 };
	if (
		!Number.isInteger(Number(numberOfRounds)) ||
		Number(numberOfRounds) === 0
	) {
		console.log(typeof numberOfRounds);
		throw "The number of rounds should be a number greater then zero";
	}
	for (let i = 0; i < numberOfRounds; i++) {
		const roundScore = playRound();
		gameScore.PLAYER += roundScore.PLAYER;
		gameScore.COMPUTER += roundScore.COMPUTER;
	}
	gameScore.PLAYER > gameScore.COMPUTER
		? console.log("Winner--------------------------")
		: console.log("Looser--------------------------");
}

function computeGameStatistics(numberOfRounds) {
	let gameScore = { PLAYER: 0, COMPUTER: 0 };
	if (
		!Number.isInteger(Number(numberOfRounds)) ||
		Number(numberOfRounds) === 0
	) {
		console.log(typeof numberOfRounds);
		throw "The number of rounds should be a number greater then zero";
	}
	for (let i = 0; i < numberOfRounds; i++) {
		const roundScore = playRound(generateRandomHand(), generateRandomHand());
		gameScore.PLAYER += roundScore.PLAYER;
		gameScore.COMPUTER += roundScore.COMPUTER;
	}
	console.log(
		"player score: " +
			gameScore.PLAYER +
			" vs " +
			gameScore.COMPUTER +
			" :computer score"
	);
}
