import './WaitSlide.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

function WaitSlide(props) {
    const expected_codes = {
        1: 'muffin',
        4: 'texas',
        7: 'chemise'
    }

    const tryCode = (event) => {
        if (expected_codes[props.step] === event.target.value) {
            props.nextStep();
        }
    }

    return (
        <div className={"full-background"}>
            {props.forTest !== 'End' &&
                <span>
                    <div className={'wait-slide-icon'}>
                        <FontAwesomeIcon icon={faArrowsRotate}/>
                    </div>
                    <input className={'wait-slide-input'} type="text" onChange={tryCode} placeholder={'Code2'}/>
                </span>
            }
            {props.forTest === 'End' &&
                <span>
                    <div className={'end-slide-text'}>
                        Merci de votre participation!
                    </div>
                    <div className={'end-slide-text'} style={{textAlign: "center"}}>
                        ({props.stroopAnswer} | {props.corsiAnswer} | {props.digitSpanAnswer})
                    </div>
                </span>
            }
        </div>
    );
}

export default WaitSlide;
