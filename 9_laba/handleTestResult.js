function handleTestResult(result, successMessage, failureMessage) {
    if (result) {
        console.log(successMessage);
    } else {
        console.log(failureMessage);
    }
}

module.exports = handleTestResult;
