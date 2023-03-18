import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
    name: "root",
    initialState: {
        data: {},
        documents: [{}],
        contacts: [{}],
        person: {},
        address: {},
    },
    reducers: {
        saveData: (state: any, action: any) => {
            state.data = action.payload
        },
        saveContacts: (state: any, action: any) => { state.contacts = action.payload },
        saveDocuments: (state: any, action: any) => { state.documents = action.payload },
        saveAddress: (state: any, action: any) => { state.address = action.payload },
        savePerson: (state: any, action: any) => { state.person = action.payload },
        chooseCheese: (state: any, action: any) => { state.cheese = action.payload },
    }
})

export const reducer = rootSlice.reducer;

export const { saveData, saveContacts, saveDocuments, savePerson, saveAddress } = rootSlice.actions