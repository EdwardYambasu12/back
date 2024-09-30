const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Example data structure to simulate previous and new data
let previousData = [];
let newData = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to receive new data (simulated for demonstration)
app.post('/update-data', (req, res) => {
    newData = req.body; // Assume the entire data is sent for simplicity
    console.log('New data received:', newData);
    
    // Compare newData with previousData to find changes
    const changes = findChanges(previousData, newData);

    // Process changes and send notifications
    processChanges(changes);

    // Update previousData to current newData
    previousData = newData;

    res.status(200).send('Data updated successfully');
});

// Function to find changes between previousData and newData
function findChanges(previousData, newData) {
    // For simplicity, let's assume this function detects changes based on IDs or some other criteria
    // In real scenario, you might use a more sophisticated comparison logic
    const changes = [];

    // Example: Compare IDs to detect changes
    for (let i = 0; i < newData.length; i++) {
        const newItem = newData[i];
        const foundInPrevious = previousData.find(item => item.id === newItem.id);

        if (!foundInPrevious || foundInPrevious.status !== newItem.status) {
            // If not found in previous or status changed, consider it as a change
            changes.push(newItem);
        }
    }

    return changes;
}

// Function to process changes and send notifications
function processChanges(changes) {
    changes.forEach(change => {
        // Example: Send notification to subscribers based on change type (e.g., goal, lineup change)
        // In a real app, you would have logic to determine who to notify (based on team, player, league IDs)
        console.log('Sending notification for change:', change);
        // Simulated notification sending logic
        // Example: sendNotification(change);
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
