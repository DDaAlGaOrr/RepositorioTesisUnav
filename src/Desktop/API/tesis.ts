import { Firestore, addDoc, collection } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import firebaseConfig from '../../firebaseConfig'
import { Tesis } from '../../Types/tesis'
import { CollectionName } from '../../Types/common'

export const uploadTesisFile = async (firestore: Firestore, newTesis: Tesis, file: any) => {
    try {
        const filename = file.name + Date.now()
        const uri = file
        const storage = getStorage()
        const filesRef = ref(storage, `tesis/${filename}.pdf`)
        await uploadBytes(filesRef, uri)
        const url = await getDownloadURL(filesRef)
        return addtesisData(firestore, newTesis, url)
    } catch (error) {}
}
export const addtesisData = async (firestore: Firestore, newTesis: Tesis, urlTesis: any): Promise<string | null> => {
    try {
        console.log(newTesis.schoolName)
        console.log(newTesis.description)
        console.log(urlTesis)
        const tesisData: Tesis = {
            schoolName: newTesis.schoolName,
            description: newTesis.description,
            file: urlTesis
        }
        const tesisDataCopy = JSON.parse(JSON.stringify(tesisData))
        console.log(tesisDataCopy)
        const tesisReference = await addDoc(collection(firestore, CollectionName.Tesis), tesisDataCopy)
        return tesisReference.id
    } catch (error) {}
    return null
}
