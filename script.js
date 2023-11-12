const redactForm = document.getElementById('redactForm');
const originalText = document.getElementById('originalText');
const wordsToRedact = document.getElementById('wordsToRedact');
const replacementText = document.getElementById('replacementText');
const redactButton = document.getElementById('redactButton');
const redactedText = document.getElementById('redactedContent');
const wordCount = document.getElementById('wordCount');
const matchedCount = document.getElementById('matchedCount');
const charCount = document.getElementById('charCount');
const timeTaken = document.getElementById('timeTaken');

redactButton.addEventListener('click', redactText);

function redactText() {
    const text = originalText.value;
    const wordsToRedactValue = wordsToRedact.value.trim();
    const replacementTextValue = replacementText.value.trim();

    if (!text) {
        displayError("Please enter the original text.");
        return;
    }

    if (!wordsToRedactValue) {
        displayError("Please specify words to redact.");
        return;
    }

    const startTime = performance.now();
    let redacted = text;

    const wordsToRedactList = wordsToRedactValue.split(' ').map(word => word.trim());

    wordsToRedactList.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        redacted = redacted.replace(regex, replacementTextValue || '**');
    });

    const endTime = performance.now();
    const timeInSeconds = ((endTime - startTime) / 1000).toFixed(2);

    displayResult(redacted, wordsToRedactList.length, calculateTotalRedactedCharacters(redacted), timeInSeconds);
}

function displayResult(redacted, wordsScanned, charCountValue, timeInSeconds) {
    redactedContent.textContent = redacted;
    wordCount.textContent = `Words Scanned: ${wordsScanned}`;
    matchedCount.textContent = `Words Redacted: ${wordsScanned}`;
    charCount.textContent = `Characters Redacted: ${charCountValue}`;
    timeTaken.textContent = `Time Taken (s): ${timeInSeconds}`;
}

function displayError(errorMessage) {
    clearError();
    const errorDiv = document.createElement('div');
    errorDiv.textContent = errorMessage;
    errorDiv.className = 'error';

    const parentElement = redactedText.parentElement || document.body;
    parentElement.insertBefore(errorDiv, redactedText);

    if (redactedText.parentElement) {
        redactedText.parentElement.insertBefore(errorDiv, redactedContent);
    } else {
        // If redactedText's parent is not found, append the error to the body
        document.body.appendChild(errorDiv);
    }
}

function clearError() {
    const error = document.querySelector('.error');
    if (error) {
        error.remove();
    }
}

function calculateTotalRedactedCharacters(text) {
    // Add your logic to calculate the total redacted characters
    return text.replace(/[^*]/g, '').length;
}