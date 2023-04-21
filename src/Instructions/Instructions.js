import './Instructions.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import TestInstructions from '../Data/instructions.json';

function Instructions(props) {
    const test = TestInstructions[props.test];

    return (
        <div className={"grey-background"}>
            <div className="Instructions">
                <div className={'Instructions-Title'}>
                    {test.Title}
                </div>
                <div className="break"></div>
                <div className={'Instructions-Description'}>
                    {test.Description}
                    <br/><br/> {test.Action}
                </div>
                <div className="break"></div>
                <video className={'Instructions-video'} width="320" height="240" src={`Examples/${props.test}.mp4`} controls={true}></video>
                <div className="break"></div>
                <div className={'Test-Start-Button-Container'}>
                    <div className={'Test-Start-Button'} onClick={props.nextStep}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Instructions;
