import { addDoc, collection, Firestore } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import { CollectionName } from '../../Types/common'
import { Tesis } from '../../Types/tesis'

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
        const tesisData: Tesis = {
            schoolName: newTesis.schoolName,
            description: newTesis.description,
            file: urlTesis
        }
        const tesisDataCopy = JSON.parse(JSON.stringify(tesisData))
        const tesisReference = await addDoc(collection(firestore, CollectionName.Tesis), tesisDataCopy)
        return tesisReference.id
    } catch (error) {}
    return null
}
