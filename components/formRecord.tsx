import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'
import { getRecordState, ReadingRecordState } from '../store/slices/recordSlice'
import { useDispatch, useSelector } from '../store/store'
import sy from '../styles/record.module.scss'

type Props = {
    id: string,
    handleSubmitForm: any;
    handleTypeImage: any;
    handlePreviewImage: any;
    isSelectUploadImage: boolean;
    previewImage: string;
}

const FormRecord = (props: Props) => {

    const {
        id,
        handleSubmitForm,
        handleTypeImage,
        handlePreviewImage,
        isSelectUploadImage,
        previewImage,
    } = props

    const dispatch = useDispatch();
    const {
        recordList,
        recordItemSelect,
        recordIndexSelect,
    } = useSelector(getRecordState);

    console.log('recordList--', recordList)
    console.log('recordItemSelect--', recordItemSelect)
    console.log('recordIndexSelect--', recordIndexSelect)


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
                        // typeImage: { value: string };
                        // image: { value: any };
                    };
                    const bookTitle: string = target.bookTitle.value; // typechecks!
                    const date: string = target.date.value; // typechecks!
                    const readTime: number = Number(target.readTime.value); // typechecks!

                    const payload: ReadingRecordState = {
                        bookTitle: bookTitle,
                        date: date,
                        readTime: readTime,
                        id: id
                    }
                    handleSubmitForm(payload)

                }}
            >
                <div>
                    <div className={'flex-col'}>
                        <label>
                            Title of book
                        </label>
                        <input
                            // value={recordItemSelect?.bookTitle}
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
                            // value={recordItemSelect?.date}
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
                            // value={recordItemSelect?.readTime}
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
                            previewImage.includes('http') ||
                            previewImage.includes('https')
                        ) &&
                            (
                                <>
                                    <div>
                                        <Image
                                            loader={() => previewImage}
                                            src={previewImage}
                                            alt='previewImage'
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
                </div>

            </form>
        </div>
    )
}

export default FormRecord
