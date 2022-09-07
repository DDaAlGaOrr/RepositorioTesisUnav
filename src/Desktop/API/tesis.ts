import { addDoc, collection, Firestore, getDocs, query } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

import { CollectionName } from '../../Types/common'
import { DEFAULT_TESIS, Tesis } from '../../Types/tesis'

export const getTesis = async (firestore: Firestore): Promise<Tesis[]> => {
    const TesisCollection = collection(firestore, CollectionName.Tesis)
    const tesisQuery = query(TesisCollection)
    const tesisSnapshot = await getDocs(tesisQuery)
    const tesisData: Tesis[] = []
    tesisSnapshot.forEach((document) => {
        tesisData.push({
            ...DEFAULT_TESIS,
            ...(document.data() as Tesis),
            id: document.id
        })
    })
    return tesisData
}

export const uploadTesisFile = async (firestore: Firestore, newTesis: Tesis, file: any) => {
    try {
        const filename = file.name + Date.now()
        const uri = file
        const storage = getStorage()
        const filesRef = ref(storage, `tesis/${filename}.pdf`)
        await uploadBytes(filesRef, uri)
        const url = await getDownloadURL(filesRef)
        return await addtesisData(firestore, newTesis, url)
    } catch (error) {}
}
export const addtesisData = async (firestore: Firestore, newTesis: Tesis, urlTesis: any): Promise<string | null> => {
    try {
        const tesisData: Tesis = {
            id: '',
            schoolName: newTesis.schoolName,
            description: newTesis.description,
            file: urlTesis
        }
        const tesisDataCopy: any = { ...tesisData }
        delete tesisDataCopy.id
        const tesisReference = await addDoc(collection(firestore, CollectionName.Tesis), tesisDataCopy)
        return tesisReference.id
    } catch (error) {}
    return null
}
