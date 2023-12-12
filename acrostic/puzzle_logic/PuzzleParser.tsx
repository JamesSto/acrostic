import { AcrosticPuzzleData, AcrosticGridData, AcrosticClueData, AcrosticSquareData } from './AcrosticPuzzleData';

export default function parseAcrosticPuzzle(puzzleText: string): AcrosticPuzzleData {
    // Splitting the input text into sections
    const sections = puzzleText.split('\n\n');

    // Extracting title, author, and quote
    const topline = sections[0].split(' — ');
    const titleAuthor = topline[0];
    const quote = topline.slice(1).join(" ");
    
    // Parsing clues and grid
    const clues: AcrosticClueData[] = [];
    const squareMap: Map<number, AcrosticSquareData> = new Map();

    sections.slice(1).forEach(section => {
        const lines = section.split('\n');
        const clueLetter = lines[0].charAt(0);
        const clueText = lines[1];
        const clueSquares: AcrosticSquareData[] = [];
        for (let i = 2; i < lines.length; i += 2) {
            const answerLetter = lines[i].charAt(0);
            const squareNumber = parseInt(lines[i + 1].trim());
            const newSquare = new AcrosticSquareData(answerLetter, clueLetter, squareNumber);
            clueSquares.push(newSquare);
            squareMap.set(squareNumber, newSquare);
        }
        clues.push(new AcrosticClueData(clueText, clueLetter, clueSquares));
    });

    const quoteWords: string[] = quote.split(/\W+/).map(word => word.toUpperCase());
    const quoteSquares: AcrosticSquareData[][] = [];

    let squareNumber = 1;
    for (let i = 0; i < quoteWords.length; i++) {
        const word = quoteWords[i];
        const squares: AcrosticSquareData[] = [];
        for (let j = 0; j < word.length; j++) {
            const matchingSquare = squareMap.get(squareNumber);
            if (matchingSquare == undefined || matchingSquare.answerLetter !== word.charAt(j)) {
                throw new Error("Square number " + squareNumber + " does not match quote word " + word);
            }
            squares.push(matchingSquare);
            squareNumber++;
        }
        quoteSquares.push(squares);
    }

    const authorSquares: AcrosticSquareData[] = clues.map(clue => clue.answer[0]);

    const grid = new AcrosticGridData(quoteSquares, authorSquares);
    return new AcrosticPuzzleData("Sample Acrostic", titleAuthor, quote, clues, grid);
}

