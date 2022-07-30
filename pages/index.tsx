import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

import React from 'react'

interface payloadProps {
  bookTitle: string,
  date: string,
  readTime: number,
  image?: any,
}


const Home: NextPage = () => {

  // const formRef = useRef()

  const [isSelectUploadImage, setIsSelectUploadImage] = useState(true)
  const [previewImage, setPreviewImage] = useState('')


  const handleTypeImage = (e: any) => {
    setIsSelectUploadImage(e.target.id === 'uploadImage' ? true : false)
    setPreviewImage('')
  }

  const handlePreviewImage = (e: any) => {
    if (isSelectUploadImage) {
      if (!e.target.files || e.target.files.length === 0) {
        return
      }
      const imageURL = URL.createObjectURL(e.target.files[0])
      setPreviewImage(imageURL)
    } else {
      setPreviewImage(e.target.value)
    }
  }

  const handleSubmitForm = ({
    bookTitle,
    date,
    readTime,
  }: payloadProps) => {

    const payload: payloadProps = {
      bookTitle: bookTitle,
      date: date,
      readTime: readTime,
      image: previewImage,
    }
    console.log('====================================');
    console.log('payload', payload)
    console.log('====================================');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Reading record</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Reading record</h1>


      <form
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

          const payload: payloadProps = {
            bookTitle: bookTitle,
            date: date,
            readTime: readTime,
          }
          handleSubmitForm(payload)

        }}
      >
        <div>
          <label>
            Title of book:
            <input
              type="text"
              name="bookTitle"
              placeholder='Title of book'
            />
          </label>
        </div>

        <div>
          <label>
            Date:
            <input
              type="date"
              name="date"
              placeholder='Date'
            />
          </label>
        </div>

        <div>
          <label>
            Read time (Hrs):
            <input
              type="number"
              step="0.5"
              pattern="[0-9\/]"
              name="readTime"
              placeholder='Read time'
            />
          </label>
        </div>

        <div>
          <input
            onChange={(e) => handleTypeImage(e)}
            checked={isSelectUploadImage}
            name="typeImage" value="uploadImage" id="uploadImage" type="radio" /><label>Upload image</label>
          <input
            onChange={(e) => handleTypeImage(e)}
            name="typeImage" value="linkImage" id="linkImage" type="radio" /><label>Link image</label>
        </div>

        <div>
          {isSelectUploadImage ?
            (
              <>
                <div>
                  <label>
                    Upload image:
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      name="image"
                      placeholder='Upload image'
                      onChange={(e) => handlePreviewImage(e)}
                    />
                  </label>
                </div>
              </>
            )
            :
            (
              <>
                <div>
                  <label>
                    Link image:
                    <input
                      type="text"
                      name="image"
                      placeholder='Link image'
                      onChange={(e) => handlePreviewImage(e)}
                    />
                  </label>
                </div>
              </>
            )
          }
          {previewImage &&
            (
              <>
                <div>
                  <Image
                    loader={() => previewImage}
                    src={previewImage}
                    alt='previewImage'
                    width={200}
                    height={200}
                  />
                </div>
              </>
            )
          }
        </div>


        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>


    </div>
  )
}

export default Home
