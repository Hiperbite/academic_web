import { Provider } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { PersonalDataForm} from "./Forms/PersonalDataForm"
import { store } from "./store"
import { ContactDataForm } from "./Forms/ContactDataForm"
import { DocumentDataForm } from "./Forms/DocumentDataForm"
import { AddressDataForm } from "./Forms/AddressDataForm"

export const UpdateStudent = ({ student }: any) => {
    return (
        <>
            <Provider store={store}>
                <Routes>
                    <Route index path="" element={<PersonalDataForm student={student} />} />
                    <Route path="personal" element={<PersonalDataForm student={student} />} />
                    <Route path="contacts" element={<ContactDataForm student={student} />} />
                    <Route path="documents" element={<DocumentDataForm student={student} />} />
                    <Route path="address" element={<AddressDataForm student={student} />} />
                </Routes>
            </Provider>
        </>
    )
}