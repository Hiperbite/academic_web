import { Provider } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { store } from "./store"
import { Step1 } from "./Forms/Step1"
import { Step2 } from "./Forms/Step2"
import { Step3 } from "./Forms/Step3"
import { Step4 } from "./Forms/Step4"
import { Result } from "./Forms/Result"
import { Step5 } from "./Forms/Step5"

export const UpdateStudent = ({ student }: any) => {
    return (
        <>
            <Provider store={store}>
                <Routes>
                <Route index path="step1" element={<Step1 student={student} />} />
                    <Route path="step2" element={<Step2  student={student} />} />
                    <Route path="step3" element={<Step3  student={student}/>} />
                    <Route path="step4" element={<Step4  student={student}/>} />
                    <Route path="step5" element={<Step5  student={student}/>} />
                    <Route path="result" element={<Result  student={student}/>} />
                </Routes>
            </Provider>
        </>
    )
}