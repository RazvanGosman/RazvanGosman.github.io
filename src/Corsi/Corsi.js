import './Corsi.css';
import React, {useRef} from "react";
import {useEffect, useState} from "react";
import expectedSequences from '../Data/CorsiSequence.json';
import { Stage, Layer, Rect } from 'react-konva';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

function ColoredRect (props) {
    const [color, setColor] = useState('pink');

    useEffect(() => {
        if (props.toggledSquare.squareId === "all") {
            setColor('pink');
            return;
        }

        if (props.toggledSquare.squareId !== props.id) {
            return
        }

        setColor(props.toggledSquare.squareColor);
    }, [props.toggledSquare])

    const handleClick = () => {
        if (props.disabled) return;

        setColor('yellow');
        props.selectAsAnswer(props.id)
    }
    return (
        <Rect
            x={props.x}
            y={props.y}
            width={props.width}
            height={props.height}
            fill={color}
            onPointerDown={handleClick}
        />
    );
}

function Corsi(props) {
    const divRef = useRef(null)
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })
    const [failures, setFailures] = useState(0);
    const [sequenceNumber, setSequenceNumber] = useState(0);
    const [currentAnswerQueue, setCurrentAnswerQueue] = useState([])
    const [showingSequence, setShowingSequence] = useState(true)
    const [toggledSquare, setToggledSquare] = useState({'squareId': 'all', 'squareColor': 'pink'});
    const [squares, setSquares] = useState([])

    useEffect(() => {
        const timeout = requestAnimationFrame(() => {
            if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
                setDimensions({
                    width: divRef.current.offsetWidth,
                    height: divRef.current.offsetHeight,
                    top: divRef.current.offsetTop,
                    left: divRef.current.offsetLeft
                })
            }

        });
        return () => cancelAnimationFrame(timeout);
    }, [])

    useEffect( () => {
        if (toggledSquare.squareId === 'all' ) return;

        const timer = setTimeout(()=> {
            if (toggledSquare.squareColor === 'yellow') {
                setToggledSquare({
                    'squareId': expectedSequences[sequenceNumber][toggledSquare.listNum],
                    'squareColor': 'pink',
                    'listNum': toggledSquare.listNum
                })
            } else if (toggledSquare.squareColor === 'pink' && toggledSquare.listNum + 1 !== expectedSequences[sequenceNumber].length) {
                setToggledSquare({
                    'squareId': expectedSequences[sequenceNumber][toggledSquare.listNum + 1],
                    'squareColor': 'yellow',
                    'listNum': toggledSquare.listNum + 1
                })
            } else {
                setShowingSequence(false);
            }
        }, 250)

        return () => clearTimeout(timer)
    }, [toggledSquare])


    useEffect( () => {
        if (dimensions.width !== 0 && dimensions.height !== 0) {
            shuffleSquares()
        }
    }, [dimensions])


    useEffect( () => {
        showSequence()
    }, [squares])

    const showSequence = () => {
        if(squares.length === 0) {
            return
        }

        setToggledSquare({'squareId': 'all'}) // reset first

        const timer = setTimeout(() => {
            setToggledSquare({
                'squareId': expectedSequences[sequenceNumber][0],
                'squareColor': 'yellow',
                'listNum': 0
            })
        }, 3000);

        return () => clearTimeout(timer);
    }

    const storeAnswers = (maxSequenceNumber) => {
        props.setAnswers(maxSequenceNumber + 1)
        props.nextStep();
    }

    const addAnswer = (id) => {
        if (currentAnswerQueue.includes(id)) {
            return
        }

        currentAnswerQueue.push(id)
        setCurrentAnswerQueue(currentAnswerQueue)
    }

    const compareSequence = () => {
        setShowingSequence(true); // Lock view

        const expectedSequence = expectedSequences[sequenceNumber];
        let hasFailed = false;

        if (expectedSequence.length !== currentAnswerQueue.length) {
            setFailures(failures + 1)
            hasFailed = true
        } else {
            for (let i = 0; i < currentAnswerQueue.length; i ++) {
                if (currentAnswerQueue[i] !== expectedSequence[i]) {
                    setFailures(failures + 1)
                    hasFailed = true
                    break;
                }
            }
        }

        if ((failures === 1 && hasFailed) || (failures === 2) || sequenceNumber + 1 === expectedSequences.length) {
            storeAnswers(sequenceNumber)
        } else if (hasFailed) {
            setCurrentAnswerQueue([])
            shuffleSquares()
        } else {
            setFailures(0);
            setCurrentAnswerQueue([]);
            setSequenceNumber(sequenceNumber + 1)
            shuffleSquares()
        }
    }

    const shuffleSquares = () => {
        const rects = []
        const ninth_h = dimensions.height / 3
        const ninth_w = dimensions.width / 3
        const rect_size = scale(150)

        for (let i = 0; i < 9; i++) {
            let x = 0
            let y = 0
            const nh = Math.floor(i / 3) * ninth_h
            const nw = ( i % 3 ) * ninth_w

            // Shuffle
            x = Math.random() * ((nw + ninth_w - rect_size - 10) - (nw + 10)) + (nw + 10);
            y = Math.random() * ((nh + ninth_h - rect_size - 10) - (nh + 10)) + (nh + 10);

            // Add
            rects.push(
                {
                    id: i + 1,
                    x: x,
                    y: y,
                    size: rect_size
                }
            )
        }

        setSquares(rects)
    }

    const scale = (num) => {
        const coef = 12 / ((dimensions.width / (window.innerWidth) + dimensions.height / (window.innerHeight)))

        return num * 1 / (dimensions.width * dimensions.height / (window.innerWidth * window.innerHeight)) / coef;
    }

    const renderSquares = () => {
        const l = []

        squares.forEach((dim) => {
            l.push(
                <ColoredRect
                    key={dim.id}
                    id={dim.id}
                    x={dim.x}
                    y={dim.y}
                    width={dim.size}
                    height={dim.size}
                    toggledSquare={toggledSquare}
                    selectAsAnswer={addAnswer}
                    disabled={showingSequence}
                />
            )
        })

        return l
    }

    return (
        <div className={"corsi-background"}>
            <div className={"Corsi-canvas"} ref={divRef}>
                <Stage width={dimensions.width} height={dimensions.height}>
                    <Layer>
                        {renderSquares()}
                    </Layer>
                </Stage>
            </div>
            <div className={'break'}></div>
            <div></div>
            <div className={`Test-Start-Button-Container Test-Start-Button-Container-hidden-${!showingSequence}`}>
                <div className={'Test-Start-Button'} onClick={compareSequence}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </div>
    );
}

export default Corsi;
