import { Provider } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { PersonalDataForm} from "./Forms/PersonalDataForm"
import { store } from "./store"
import { ContactDataForm } from "./Forms/ContactDataForm"
import { DocumentDataForm } from "./Forms/DocumentDataForm"
import { AddressDataForm } from "./Forms/AddressDataForm"

export const UpdateStaff = ({ staff }: any) => {
    return (
        <>
            <Provider store={store}>
                <Routes>
                    <Route index path="" element={<PersonalDataForm staff={staff} />} />
                    <Route path="personal" element={<PersonalDataForm staff={staff} />} />
                    <Route path="contacts" element={<ContactDataForm staff={staff} />} />
                    <Route path="documents" element={<DocumentDataForm staff={staff} />} />
                    <Route path="address" element={<AddressDataForm staff={staff} />} />
                </Routes>
            </Provider>
        </>
    )
}