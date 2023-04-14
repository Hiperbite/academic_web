import { Provider, useSelector } from "react-redux"
import { Route, Router, Routes } from "react-router-dom"
import { TimeLine } from "../../../../Common/Person/RegisterFrom/TimeLine"
import { Result } from "./Forms/Result"
import { Step1 } from "./Forms/Step1"
import { Step2 } from "./Forms/Step2"
import { Step3 } from "./Forms/Step3"
import { Step4 } from "./Forms/Step4"
import { Step5 } from "./Forms/Step5"
import { store } from "./store"

export const RegisterStudent = () => {

    const formData = useSelector((state: any) => state)
    const student = { person: { ...formData, ...formData?.person, ...formData?.person?.documents } }

    return (
        <>
            <Provider store={store}>
                <TimeLine/>
                <Routes>
                    <Route index path="step1" element={<Step1 />} />
                    <Route path="step2" element={<Step2 />} />
                    <Route path="step3" element={<Step3 />} />
                    <Route path="step4" element={<Step4 />} />
                    <Route path="step5" element={<Step5 />} />
                    <Route path="result" element={<Result />} />
                </Routes>
            </Provider>
        </>
    )
}