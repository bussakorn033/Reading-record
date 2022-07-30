import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
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
}

const ModalEdit = (props: Props) => {
    // console.log('props', props)
    const {
        isOpenModal,
        setIsOpenModal,
        handleSubmitForm,
        handleTypeImage,
        handlePreviewImage,
        isSelectUploadImage,
        previewImage,
    } = props

    if (!isOpenModal) {
        return null
    }


    const dispatch = useDispatch();
    const {
        recordItemSelect,
        recordIndexSelect,
    } = useSelector(getRecordState);

    // console.log('recordItemSelect', recordItemSelect)
    // console.log('recordIndexSelect', recordIndexSelect)

    return (
        <div className={sy['container']}>

            <div className={sy['container-modal-edit']}>
                <div className={sy['header-modal-edit']}>
                    <label className={sy['title']}>ModalEdit</label>
                    <button className={sy['btn-close']} onClick={setIsOpenModal}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                </div>

                <FormRecord
                    id={'Modal'}
                    handleSubmitForm={handleSubmitForm}
                    handleTypeImage={handleTypeImage}
                    handlePreviewImage={handlePreviewImage}
                    isSelectUploadImage={isSelectUploadImage}
                    previewImage={previewImage}
                />
            </div>

        </div>
    )
}

export default ModalEdit
