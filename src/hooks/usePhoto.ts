import { useTypedSelector } from './useTypedSelector'
import { Photo } from '../types/photo'

export const usePhoto = (id: string): Photo | undefined => {
    const photos = useTypedSelector((state) => state.photos.photos)
    console.log(id)
    return photos.find((photo) => photo.id === id)
}
