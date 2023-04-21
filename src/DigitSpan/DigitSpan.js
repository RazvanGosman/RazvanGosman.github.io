import './DigitSpan.css';
import {useEffect, useState} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import sequences from '../Data/DigitSpanSequence.json';

function DigitSpan(props) {
    const [sequenceNumber, setSequenceNumber] = useState(0)
    const [digitNumber, setDigitNumber] = useState(-1)
    const [currentAnswerQueue, setCurrentAnswerQueue] = useState([])
    const [failures, setFailures] = useState(0)
    const [isAnswering, setIsAnswering] = useState(false);

    const callBackendWithResults = (sequenceNumber) => {
        props.setAnswers(sequenceNumber + 1)
    };


    const recordAnswer = (ans) => {
        currentAnswerQueue.push(ans)
        setCurrentAnswerQueue([...currentAnswerQueue])
    }

    useEffect( ()=> {
        if (currentAnswerQueue.length === sequences[sequenceNumber].length) {
            let hasFailed = false;

            for (let i = 0; i < currentAnswerQueue.length; i++) {
                if (currentAnswerQueue[i] !== sequences[sequenceNumber][i]) {
                    hasFailed = true;
                    setFailures(failures + 1);
                    break;
                }
            }

            if ((hasFailed && failures === 1) || failures === 2 || sequenceNumber + 1 === sequences.length) {
                callBackendWithResults(sequenceNumber)
                props.nextStep();
            } else if (hasFailed) {
                setCurrentAnswerQueue([])
                setIsAnswering(false)
                setDigitNumber(0)
            } else {
                setFailures(0)
                setCurrentAnswerQueue([])
                setSequenceNumber(sequenceNumber + 1)
                setIsAnswering(false)
                setDigitNumber(0)
            }
        }
    }, [currentAnswerQueue])

    useEffect(() => {
        let delay = 1000;

        if (digitNumber === -1) {
            delay = 3000;
        }

        const timer = setTimeout(()=> {
            if (digitNumber !== sequences[sequenceNumber].length) {
                setDigitNumber(digitNumber + 1)
            }
            if (digitNumber + 1 === sequences[sequenceNumber].length) {
                setIsAnswering(true)
            }
        }, delay)

        return () => clearTimeout(timer)
    }, [digitNumber])

    const renderInputs = () => {
        const inputs = []

        for (let i = 0; i < sequences[sequenceNumber].length; i++) {
            inputs.push(
                <div key={i} className={"DigitSpan-input-box"}>{currentAnswerQueue[i] || ''}</div>
            )
        }

        return inputs;
    }

    return (
        <div className={"grey-background"}>
            <div className="Stroop-container">
                <div className={`DigitSpan-number`}>{sequences[sequenceNumber][digitNumber] || '_'}</div>
                <div className={'break'}></div>
                <div>
                    <ProgressBar variant="info" now={((digitNumber + 1) / sequences[sequenceNumber].length) * 100} className={`digitSpan-progress-bar digitSpan-progress-bar-${isAnswering}`}/>
                    <div className={'break'}></div>
                    <div className={"digitSpan-input"}>
                        { renderInputs() }
                    </div>
                    <div className={'break'}></div>
                    <div className={"DigitSpan-buttons"}>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(0)}}>0</div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(1)}}>1</div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(2)}}>2</div>
                        <div className={'break'}></div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(3)}}>3</div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(4)}}>4</div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(5)}}>5</div>
                        <div className={'break'}></div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(6)}}>6</div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(7)}}>7</div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(8)}}>8</div>
                        <div className={'break'}></div>
                        <div className={`DigitSpan-button DigitSpan-button-${isAnswering}`} onClick={() => {recordAnswer(9)}}>9</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DigitSpan;
