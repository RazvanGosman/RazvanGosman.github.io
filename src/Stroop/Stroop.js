import './Stroop.css';
import {useEffect, useState} from "react";
import words from '../Data/StroopSequence.json';

function Stroop(props) {
    const [wordCount, setWordCount] = useState(0)
    const storeAnswer = (answerNumber, answer) => {
        const currAnswer = props.answers === -1 ? 0 : props.answers;

        if (words[answerNumber].color === answer) {
            props.setAnswers(currAnswer + 1)
        }
    };
    const moveNextWord = async (state, answer) => {
        storeAnswer(wordCount, answer);

        if (wordCount + 1 >= words.length) {
            props.nextStep();
        } else if (wordCount === state) {
            setWordCount(wordCount + 1);
        }
    }

    useEffect(() => {
        const currentCount = wordCount;
        const timer = setTimeout(()=> { moveNextWord(currentCount, 'temps') }, 2000)
        return () => clearTimeout(timer)
    })

    return (
        <div className={"grey-background"}>
            <div className="Stroop-container">
                <div className={`Stroop-word Stroop-question-${words[wordCount].color}`}>{words[wordCount].word}</div>
                <div className={'break'}></div>
                <div className={"Stroop-buttons"}>
                    <div className={"Stroop-button stroop-answer-orange"} onClick={() => {moveNextWord(wordCount, 'Rouge')}}></div>
                    <div className={"Stroop-button stroop-answer-blue"} onClick={() => {moveNextWord(wordCount, 'Bleu')}}></div>
                    <div className={"Stroop-button stroop-answer-yellow"} onClick={() => {moveNextWord(wordCount, 'Jaune')}}></div>
                    <div className={"Stroop-button stroop-answer-green"} onClick={() => {moveNextWord(wordCount, 'Vert')}}></div>
                </div>
            </div>
        </div>
    );
}

export default Stroop;
