import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Photo } from '../types/photo'
import styled from 'styled-components'
import AddPlusIcon from '../assets/images/add-plus.svg'

interface PhotoFormProps {
	onSubmit: (data: Photo) => void
}

const Form = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 300px;
`
const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
`

const Input = styled.input`
	flex: 1;
	padding: 8px;
	margin-right: 10px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	height: 100%;
`
const DescriptionInput = styled.textarea`
	height: 80px;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	font-size: 16px;
	font-family: Arial, sans-serif;
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
`

const Title = styled.h3`
	margin: 0;
`
const AddIcon = styled.img`
	width: 30px;
	height: auto;
	margin-right: 10px;
`

const PhotoForm: React.FC<PhotoFormProps> = ({ onSubmit }) => {
	const { handleSubmit, control } = useForm<Photo>()

	const handleFormSubmit = (data: Photo) => {
		onSubmit(data)
	}

	return (
		<Form onSubmit={handleSubmit(handleFormSubmit)}>
			<InputContainer>
				<Controller
					name='title'
					control={control}
					rules={{ required: 'Title is required' }}
					render={({ field }) => (
						<Input {...field} type='text' placeholder='Title' />
					)}
				/>
				<Controller
					name='imageUrl'
					control={control}
					rules={{ required: 'Image URL is required' }}
					render={({ field }) => (
						<Input {...field} type='text' placeholder='Image URL' />
					)}
				/>
				<Button type='submit'>
					<AddIcon src={AddPlusIcon} />
					<Title>Add Photo</Title>
				</Button>
			</InputContainer>
			<InputContainer>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<DescriptionInput {...field} placeholder='Description' />
					)}
				/>
			</InputContainer>
		</Form>
	)
}

export default PhotoForm
