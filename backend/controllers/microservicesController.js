const asyncHandler = require('express-async-handler');
const fs = require('fs').promises; 

const getAll = asyncHandler(async (req, res) => {
    try {
        const data = await fs.readFile('./models/microservices.txt', 'utf8');
        const jsonData = JSON.parse(data);

        const resultArray = jsonData.microservices.flat(); 

        // Send the result as a JSON response
        res.status(200).json({ microservices: resultArray });
    } catch (error) {
        console.error("Error:", error);
        // Differentiate the response based on the type of error
        if (error.code === 'ENOENT') {
            res.status(404).json({ message: "File not found" });
        } else if (error instanceof SyntaxError) {
            res.status(500).json({ message: "Error parsing JSON" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
    }
});

const createMicroservice = asyncHandler(async (req, res) => {


})

const getOne = asyncHandler(async (req, res) => {


})

module.exports = {
  getAll,
  createMicroservice,
  getOne
};
