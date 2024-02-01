export class AcrosticPuzzleData {
    public title: string;
    public author: string;
    public quote: string;
    public clues: AcrosticClueData[];
    public grid: AcrosticGridData;

    constructor(title: string, author: string, quote: string, clues: AcrosticClueData[], grid: AcrosticGridData) {
        this.title = title;
        this.author = author;
        this.quote = quote;
        this.clues = clues;
        this.grid = grid;
    }

    public equals(other: AcrosticPuzzleData): boolean {
        console.log(this.title == other.title && this.author == other.author);
        return this.title == other.title && this.author == other.author;
    }
}

export class AcrosticGridData {
    public quoteSquares: AcrosticSquareData[][];
    public authorSquares: AcrosticSquareData[];

    constructor(quoteSquares: AcrosticSquareData[][], authorSquares: AcrosticSquareData[]) {
        this.quoteSquares = quoteSquares;
        this.authorSquares = authorSquares;
    }
}

export class AcrosticClueData {
    public clue: string;
    public letter: string;
    public answer: AcrosticSquareData[];

    constructor(clue: string, letter: string, answer: AcrosticSquareData[]) {
        this.clue = clue;
        this.letter = letter;
        this.answer = answer;
    }
}

export class AcrosticSquareData {
    public answerLetter: string;
    public clueLetter: string;
    public squareNum: number;
    public isBlack: boolean;

    constructor(answerLetter: string, clueLetter: string, squareNum: number) {
        this.answerLetter = answerLetter;
        this.clueLetter = clueLetter;
        this.squareNum = squareNum;
        this.isBlack = answerLetter == "" && clueLetter == "";
    }

    static blackSquare(): AcrosticSquareData {
        return new AcrosticSquareData("", "", 0);
    }

    public equals(other: AcrosticSquareData): boolean {
        return this.answerLetter == other.answerLetter && this.clueLetter == other.clueLetter && this.squareNum == other.squareNum;
    }
}
