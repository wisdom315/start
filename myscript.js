(function() {
    'use strict';

    // Save the original console.log function so we can still use it
    const originalConsoleLog = console.log;

    // Override the console.log function to intercept logs
    console.log = function(...args) {
        // Log the original message in the console
        originalConsoleLog.apply(console, args);

        // Now check if the log message contains 'MessageReceived'
        args.forEach(arg => {
            if (typeof arg === 'string' && arg.includes('Received background message')) {
                console.log('Detected Message received event:', arg);

                // Now proceed to check the conditions on the page
                handleMessageReceived();
            }
        });
    };

    // Function to handle logic when MessageReceived is detected
    function handleMessageReceived() {
        // Get the element by XPath3 and check its text content
        const xPath3Element = getElementByXPath('/html/body/div[2]/div[4]/div/div/div[4]/div[1]/h3'); // Replace with the actual XPath3

        if (xPath3Element) {
            const elementText = xPath3Element.textContent.trim(); // Get and trim the text content of the element

            // Check if the text matches any of the first set of values
            const textsForXPath1 = ['Russian', 'Ukrainian'];
            const textsForXPath2 = ['Polish'];

            if (textsForXPath1.some(text => elementText.includes(text))) {
                // If the element contains any of Text1, Text2, Text3, or Text4
                const elementToClick1 = getElementByXPath('html/body/div[2]/div[4]/div/div/div[5]/div/button[2]/span'); // Replace with actual XPath1
                if (elementToClick1) {
                    elementToClick1.click();
                    console.log('Clicked element with XPath1 based on Text1-Text4 match');
                } else {
                    console.log('No element found for XPath1');
                }
            } else if (textsForXPath2.some(text => elementText.includes(text))) {
                // If the element contains any of Text5 or Text6
                const elementToClick2 = getElementByXPath('html/body/div[2]/div[4]/div/div/div[5]/div/button[1]/span'); // Replace with actual XPath2
                if (elementToClick2) {
                    elementToClick2.click();
                    console.log('Clicked element with XPath2 based on Text5-Text6 match');
                } else {
                    console.log('No element found for XPath2');
                }
            } else {
                console.log('No matching text found in XPath3 element');
            }
        } else {
            console.log('No element found for XPath3');
        }
    }

    // Helper function to evaluate XPath and return the element
    function getElementByXPath(xpath) {
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue;
    }
})();