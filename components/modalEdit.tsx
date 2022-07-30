import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getRecordState } from '../store/slices/recordSlice'
import { useDispatch, useSelector } from '../store/store'
import sy from '../styles/modalEdit.module.scss'
import FormRecord from './formRecord'

type Props = {
    isOpenModal: boolean,
    setIsOpenModal: any,
    handleSubmitForm: any,
    handleTypeImage: any,
    handlePreviewImage: any,
    isSelectUploadImage: boolean,
    previewImage: string,
    setPreviewImage: any,
}

const ModalEdit = (props: Props) => {
    const {
        isOpenModal,
        setIsOpenModal,
        handleSubmitForm,
        handleTypeImage,
        handlePreviewImage,
        isSelectUploadImage,
        previewImage,
        setPreviewImage,
    } = props

    if (!isOpenModal) {
        return null
    } else {
    }


    const dispatch = useDispatch();
    const {
        recordItemSelect,
        recordIndexSelect,
    } = useSelector(getRecordState);


    return (
        <div className={sy['container']}>

            <div className={sy['container-modal-edit']}>
                <div className={sy['header-modal-edit']}>
                    <label className={sy['title']}>Edit record {recordItemSelect?.bookTitle} </label>
                    <button className={sy['btn-close']} onClick={setIsOpenModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <div className={sy['container-content']}>
                    <div className={sy['container-content-old']}>
                        <label>
                            Title of book:&nbsp;
                            <span>
                                {recordItemSelect?.bookTitle}
                            </span>
                        </label>
                        <label>
                            Date:&nbsp;
                            <span>
                                {recordItemSelect?.date}
                            </span>
                        </label>
                        <label>
                            Read time:&nbsp;
                            <span>
                                {recordItemSelect?.readTime} hours
                            </span>
                        </label>
                        <div>
                            <label>
                                Image<br />
                            </label>
                            <div>
                                <Image
                                    loader={() => recordItemSelect?.image}
                                    src={recordItemSelect?.image}
                                    alt={`book-${recordItemSelect?.bookTitle}`}
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={sy['container-content-edit']}>
                        <FormRecord
                            id={'Modal'}
                            handleSubmitForm={handleSubmitForm}
                            handleTypeImage={handleTypeImage}
                            handlePreviewImage={handlePreviewImage}
                            isSelectUploadImage={isSelectUploadImage}
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ModalEdit
