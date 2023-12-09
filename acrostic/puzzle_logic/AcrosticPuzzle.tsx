export class AcrosticPuzzle {
    public title: string;
    public author: string;
    public quote: string;
    public clues: AcrosticClue[];
    public grid: AcrosticGrid;

    constructor(title: string, author: string, quote: string, clues: AcrosticClue[], grid: AcrosticGrid) {
        this.title = title;
        this.author = author;
        this.quote = quote;
        this.clues = clues;
        this.grid = grid;
    }
}

export class AcrosticGrid {
    public quoteSquares: AcrosticSquare[][];
    public authorSquares: AcrosticSquare[];

    constructor(quoteSquares: AcrosticSquare[][], authorSquares: AcrosticSquare[]) {
        this.quoteSquares = quoteSquares;
        this.authorSquares = authorSquares;
    }
}

export class AcrosticClue {
    public clue: string;
    public letter: string;
    public answer: AcrosticSquare[];

    constructor(clue: string, letter: string, answer: AcrosticSquare[]) {
        this.clue = clue;
        this.letter = letter;
        this.answer = answer;
    }
}

export class AcrosticSquare {
    public answerLetter: string;
    public clueLetter: string;
    public squareNumber: number;

    constructor(answerLetter: string, clueLetter: string, squareNumber: number) {
        this.answerLetter = answerLetter;
        this.clueLetter = clueLetter;
        this.squareNumber = squareNumber;
    }
}
