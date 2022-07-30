import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ReadingRecordState } from '../store/slices/recordSlice'
import sy from '../styles/record.module.scss'

type Props = {
    id: string,
    handleSubmitForm: any;
    handleTypeImage: any;
    handlePreviewImage: any;
    isSelectUploadImage: boolean;
    previewImage: string;
    setPreviewImage: any;
}

const FormRecord = (props: Props) => {

    const {
        id,
        handleSubmitForm,
        handleTypeImage,
        handlePreviewImage,
        isSelectUploadImage,
        previewImage,
        setPreviewImage
    } = props

    const [imageUpload, setImageUpload] = useState('')

    useEffect(() => {
        handleReset()
        if (id === 'Modal') {
            setImageUpload('')
            setPreviewImage('')
        }
    }, [])

    useEffect(() => {
        setImageUpload(previewImage)
        setPreviewImage(previewImage)
        if (id === 'Modal') {
            setImageUpload('')
        }
    }, [previewImage])


    const handleReset = () => {
        setImageUpload('')
        setPreviewImage('')
    }


    return (
        <div className={sy['container-form-record']}>
            <form
                id={id}
                onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & {
                        bookTitle: { value: string };
                        date: { value: string };
                        readTime: { value: number };
                        typeImage: { value: string };
                        image: {
                            files: any,
                            value: any
                        };
                    };
                    const bookTitle: string = target.bookTitle.value; // typechecks!
                    const date: string = target.date.value; // typechecks!
                    const readTime: number = Number(target.readTime.value); // typechecks!
                    const typeImage: string = target.typeImage.value; // typechecks!
                    let image: string = '' // typechecks!

                    if (typeImage === 'uploadImage') {
                        if (!target.image.files || target.image.files.length === 0) {
                            return
                        }
                        const imageURL = URL.createObjectURL(target.image.files[0])
                        image = imageURL
                    }

                    const payload: ReadingRecordState = {
                        bookTitle: bookTitle,
                        date: date,
                        readTime: readTime,
                        id: id,
                        image: image
                    }
                    setImageUpload(image)
                    handleSubmitForm(payload)
                }}
            >
                <div>
                    <div className={'flex-col'}>
                        <label>
                            Title of book
                        </label>
                        <input
                            type="text"
                            name="bookTitle"
                            placeholder='Title of book'
                        />
                    </div>

                    <div className={'flex-col'}>
                        <label>
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            placeholder='Date'
                        />
                    </div>

                    <div className={'flex-col'}>
                        <label>
                            Read time (Hrs)
                        </label>
                        <input
                            type="number"
                            step="0.5"
                            min={0}
                            pattern="[0-9\/]"
                            name="readTime"
                            placeholder='Read time'
                        />
                    </div>

                    <div className={'mb-1 flex-col'}>
                        <div >
                            <input
                                onChange={(e) => handleTypeImage(e)}
                                checked={isSelectUploadImage}
                                name="typeImage" value="uploadImage" id="uploadImage" type="radio" /><label>Upload image</label>
                        </div>
                        <div>
                            <input
                                onChange={(e) => handleTypeImage(e)}
                                name="typeImage" value="linkImage" id="linkImage" type="radio" /><label>Link image</label>
                        </div>
                    </div>

                    <div className=''>
                        {isSelectUploadImage ?
                            (
                                <>
                                    <div className={'flex-col'}>
                                        <label>
                                            Upload image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            name="image"
                                            placeholder='Upload image'
                                            onChange={(e) => handlePreviewImage(e)}
                                        />
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <div className={'flex-col'}>
                                        <label>
                                            Link image
                                        </label>
                                        <input
                                            type="text"
                                            name="image"
                                            placeholder='Link image'
                                            onChange={(e) => handlePreviewImage(e)}
                                        />
                                    </div>
                                </>
                            )
                        }
                        {(
                            imageUpload.includes('http') ||
                            imageUpload.includes('https') ||
                            imageUpload.includes('png') ||
                            imageUpload.includes('jpeg')
                        ) &&
                            (
                                <>
                                    <div>
                                        <Image
                                            loader={() => imageUpload}
                                            src={imageUpload}
                                            alt='imageUpload'
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

                <div>
                    <input className={sy['btn-submit']} type="submit" value="Submit" />
                    <input className={sy['btn-reset']} type="reset" value="Reset" onClick={() => handleReset()} />
                </div>

            </form>
        </div>
    )
}

export default FormRecord
