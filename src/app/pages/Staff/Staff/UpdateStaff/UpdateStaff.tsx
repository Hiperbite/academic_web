import { Provider } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { store } from "./store"
import { Step1 } from "./Forms/Step1"
import { Step2 } from "./Forms/Step2"
import { Step4 } from "./Forms/Step4"
import { Step5 } from "./Forms/Step5"
import { Step3 } from "./Forms/Step3"

export const UpdateStaff = ({ staff }: any) => {
    return (
        <>
            <Provider store={store}>
                <Routes>
                    <Route index path="" element={<Step1 staff={staff} />} />
                    <Route path="step1" element={<Step1 staff={staff} />} />
                    <Route path="step2" element={<Step2 staff={staff} />} />
                    <Route path="step3" element={<Step3 staff={staff} />} />
                    <Route path="step4" element={<Step4 staff={staff} />} />
                    <Route path="step5" element={<Step5 staff={staff} />} />
                </Routes>
            </Provider>
        </>
    )
}