import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Photo } from '../types/photo'
import styled from 'styled-components'
import AddPlusIcon from '../assets/images/add-plus.svg'
import { englishLocale, russianLocale } from '../theme/locales'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    @media screen and (max-width: 850px) {
        flex-wrap: wrap;
    }
`

const Input = styled.input`
    flex: 1;
    padding: 8px;
    margin-right: 10px;
    border-radius: 4px;
    font-size: 16px;
    height: 100%;
    border: ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: 0.3s ease;

    @media screen and (max-width: 850px) {
        flex: 0 100%;
        margin-right: 0;
        margin-top: 10px;
    }
`
const DescriptionInput = styled.textarea`
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
    font-family: Arial, sans-serif;
    border: ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: 0.3s ease;
`

const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin: 0;
    background-color: #858585;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        background-color: #707070;
    }
    @media screen and (max-width: 850px) {
        flex: 0 100%;
        margin-right: 0;
        margin-top: 10px;
        max-width: 150px;
        height: 35px;
        padding-right: 10px;
    }
`

const Title = styled.h3`
    margin: 0;
`

const AddIcon = styled.img`
    width: 30px;
    height: auto;
    margin-right: 10px;
`
interface PhotoFormProps {
    onSubmit: (data: Photo) => void
}

const PhotoForm: React.FC<PhotoFormProps> = React.memo(({ onSubmit }) => {
    const { language } = useTypedSelector((state) => state.settings)
    const locale = language === 'en' ? englishLocale : russianLocale
    const { handleSubmit, control } = useForm<Photo>()

    const handleFormSubmit = useCallback(
        (data: Photo) => {
            onSubmit(data)
        },
        [onSubmit],
    )

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputContainer>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: 'Title is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder={locale.namePhotoPlaceholder}
                        />
                    )}
                />
                <Controller
                    name="imageUrl"
                    control={control}
                    rules={{ required: 'Image URL is required' }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="text"
                            placeholder={locale.urlPhotoPlaceholder}
                        />
                    )}
                />
                <Button type="submit">
                    <AddIcon src={AddPlusIcon} />
                    <Title>{locale.buttonAddPhoto}</Title>
                </Button>
            </InputContainer>
            <InputContainer>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <DescriptionInput
                            {...field}
                            placeholder={locale.descriptionPhotoPlaceholder}
                        />
                    )}
                />
            </InputContainer>
        </Form>
    )
})

export default PhotoForm
