import { Provider } from "react-redux"
import { Route, Router, Routes } from "react-router-dom"
import { Result } from "./Forms/Result"
import { Step1 } from "./Forms/Step1"
import { Step2 } from "./Forms/Step2"
import { Step3 } from "./Forms/Step3"
import { Step4 } from "./Forms/Step4"
import { store } from "./store"

export const RegisterStudent = () => {
    return (
        <>

            <Provider store={store}>
                <Routes>
                    <Route index path="step1" element={<Step1 />} />
                    <Route path="step2" element={<Step2 />} />
                    <Route path="step3" element={<Step3 />} />
                    <Route path="step4" element={<Step4 />} />
                    <Route path="result" element={<Result />} />
                </Routes>
            </Provider>
        </>
    )
}