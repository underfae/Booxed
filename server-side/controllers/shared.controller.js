const randomWord = require('random-words');

module.exports.getRandomWord = (req, res) => {
    const wordOfTheDay = randomWord();
    if(wordOfTheDay){
        res.json(wordOfTheDay);
    }else{
        res.status(500).send('Could not generate word of the day');
    }
}