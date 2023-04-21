import './App.css';
import Home from './Home/Home';
import Instructions from './Instructions/Instructions';
import {useState} from "react";
import WaitSlide from "./WaitSlide/WaitSlide";
import Stroop from "./Stroop/Stroop";
import Corsi from "./Corsi/Corsi";
import DigitSpan from "./DigitSpan/DigitSpan";

function App() {
    const [step, setStep] = useState(0)
    const [stroopAnswer, setStroopAnswer] = useState(-1)
    const [corsiAnswer, setCorsiAnswer] = useState(-1)
    const [digitSpanAnswer, setDigitSpanAnswer] = useState(-1)

    const nextStep = () => {
        setStep(step + 1)
    }

    return (
      <div className="App">
          {step === 0 && <Home step={step} nextStep={nextStep}/>}
          {step === 1 && <WaitSlide step={step} forTest={'Stroop'} nextStep={nextStep}/>}
          {step === 2 && <Instructions test={'Stroop'} nextStep={nextStep}/>}
          {step === 3 && <Stroop nextStep={nextStep}  answers={stroopAnswer} setAnswers={setStroopAnswer}/>}
          {step === 4 && <WaitSlide step={step} forTest={'Corsi'} nextStep={nextStep}/>}
          {step === 5 && <Instructions test={'Corsi'} nextStep={nextStep}/>}
          {step === 6 && <Corsi nextStep={nextStep} setAnswers={setCorsiAnswer}/>}
          {step === 7 && <WaitSlide step={step} forTest={'DigitSpan'} nextStep={nextStep}/>}
          {step === 8 && <Instructions test={'DigitSpan'} nextStep={nextStep}/>}
          {step === 9 && <DigitSpan nextStep={nextStep} answers={digitSpanAnswer} setAnswers={setDigitSpanAnswer}/>}
          {step === 10 && <WaitSlide forTest={'End'} nextStep={nextStep} stroopAnswer={stroopAnswer} corsiAnswer={corsiAnswer} digitSpanAnswer={digitSpanAnswer}/>}
      </div>
    );
}

export default App;