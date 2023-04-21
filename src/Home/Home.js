import './Home.css';
import {TypeAnimation} from "react-type-animation";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Home(props) {
    const [isInstructions, setIsInstructions] = useState(false)
    const [isInstructionsDone, setIsInstructionsDone] = useState(false)

    return (
        <div className="Home">
            <TypeAnimation
              sequence={[
                'Bienvenue',
                ()=> {
                    setIsInstructions(true)
                }
              ]}
              wrapper="div"
              cursor={false}
              speed={1}
              style={{ fontSize: '5em', fontWeight: 'bold' }}
              className={'Hello-Title'}
            />
            { isInstructions &&
                <TypeAnimation
                    sequence={[
                        "Voici trois tests destinés à mettre votre mémoire à l'épreuve...",
                        1000,
                        ()=> {
                            setIsInstructionsDone(true)
                        }
                    ]}
                    wrapper="div"
                    cursor={false}
                    speed={10}
                    style={{ fontSize: '2em' }}
                    className={'Hello-Title'}
                />
            }
            { isInstructionsDone &&
                <div className={'Start-Button-Container'}>
                    <div className={'Start-Button'} onClick={props.nextStep}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;
