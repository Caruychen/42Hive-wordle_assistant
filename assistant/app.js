import {default as allowedWords} from './data/clean/allowedWords.js';
import {default as targetWords} from './data/clean/targetWords.js';

const allWords = [...allowedWords, ...targetWords];
allWords.sort();

const allWordsStr = allWords.join(', ');
document.getElementById("wordList").innerHTML = allWordsStr;

function getParent(inputId) {
	let parentEl = document.getElementById(inputId)
	let letterTable = parentEl.getElementsByClassName("letterTable")[0];
	return { parentEl, letterTable };
}

function addWord(inputId) {
	let { parentEl, letterTable } = getParent(inputId);
	let word = parentEl.firstElementChild.value.toLowerCase();
	let letters = word.split("");
	if (letters.length < 5)
	{
		alert("Word too short!");
		return;
	}
	for (let i = 0; i < letters.length; i++)
		letterTable.children[i].innerHTML = letters[i];
	updateWordList();
}

function clearWord(inputId) {
	let { parentEl, letterTable } = getParent(inputId);
	let letterArr = [...letterTable.children];
	letterArr.forEach(el => el.innerHTML = "");
	parentEl.firstElementChild.value = "";
	updateWordList();
}

function updateWordList() {
	let inputSection = document.getElementById("inputSection").children;
	let idArr = [...inputSection].map(e => e.id);
	let result = allWords;

	idArr.forEach(id => {
		result = processWord(id, result)
	});
	const resultStr = result.join(', ');
	document.getElementById("wordList").innerHTML = resultStr;
}

function processWord(inputId, result) {
	let { letterTable } = getParent(inputId);
	let letters = [...letterTable.children].map(e => e.innerHTML);
	let classes = [...letterTable.children].map(e => e.className);
	let validLetters = [];
	let validOccurrences = 0;

	for (let i = 0; i < letters.length; i++)
	{
		if (!letters[i].length)
			break;
		if (classes[i] == "1") {
			result = result.filter(word => {
				return word.includes(letters[i]) && word.charAt(i) != letters[i];
			});
			validLetters.push(letters[i]);
		}
		else if (classes[i] == "2") {
			result = result.filter(word => word.charAt(i) == letters[i]);
			validLetters.push(letters[i]);
		}
	}
	for (let i = 0; i < letters.length; i++)
	{
		if (!letters[i].length)
			break;
		validOccurrences = validLetters.filter(letter => letter == letters[i]).length;
		if (validOccurrences)
			result = result.filter(word => {
				let countInWord = (word.match(new RegExp(letters[i],"g")) || []).length;
				return countInWord >= validOccurrences;
			});
		if (classes[i] == "0") {
			if (validOccurrences)
				result = result.filter(word => {
					let countInWord = (word.match(new RegExp(letters[i],"g")) || []).length;
					return countInWord == validOccurrences &&
						word.charAt(i) != letters[i]
				});
			else
				result = result.filter(word => !word.includes(letters[i]));
		}
	}
	return result;
}

function cycleLetterState(thisLetter) {
	let color = window.getComputedStyle(thisLetter).backgroundColor;
	let thisClass = thisLetter.className;
	if (thisClass == "0")
	{
		thisLetter.className = "1";
		thisLetter.style.background = "rgb(181, 159, 59)";
	}
	else if (thisClass == "1")
	{
		thisLetter.className = "2"
		thisLetter.style.background = "rgb(83, 141, 78)";
	}
	else
	{
		thisLetter.className = "0";
		thisLetter.style.background = "rgb(211, 211, 211)";
	}
	updateWordList();
}

window.addWord = addWord;
window.clearWord = clearWord;
window.cycleLetterState = cycleLetterState;
