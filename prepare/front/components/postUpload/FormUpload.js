/* eslint-disable no-plusplus */

import React, { useCallback, useState, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import style from '../../styles/css/upload.module.css';
import useinput from '../../hooks/useinput';

import UploadImages from './UploadImages';
import { ADD_POST_REQUEST } from '../../reducers/postAdd';
import Loading from '../loading/loading';

const FormUpload = () => {
  const dispatch = useDispatch();
  const { addPostDone } = useSelector((state) => state.postAdd);
  const { me } = useSelector((state) => state.userInfo);

  const [photoToAddList, setPhotoToAddList] = useState([]);
  const [content, onChangeContent, setContetn] = useinput();
  const [imageLoading, setImageLoading] = useState();

  const ref = useRef();
  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '20px';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []); // 댓글창 크기 자동조절

  const imageInput = useRef();

  const handleImage = useCallback(
    async (e) => {
      const temp = [];
      const photoToAdd = e.target.files;
      console.log(photoToAdd, '1');

      for (let i = 0; i < photoToAdd.length; i++) {
        console.log(photoToAdd[i].name.split('.')[1], '2');
        if (photoToAdd[i].name.split('.')[1] === 'HEIC') {
          setImageLoading(true);
          // eslint-disable-next-line global-require
          const heic2any = require('heic2any');
          // eslint-disable-next-line no-await-in-loop
          await heic2any({
            blob: photoToAdd[i],
            toType: 'image/jpeg',
          })
            .then((result) => {
              console.log('heic');
              console.log(result);
              const file = new File(
                [result],
                `${photoToAdd[i].name.split('.')[0]}.jpg`,
                {
                  type: 'image/jpeg',
                  lastModified: new Date().getTime(),
                },
              );
              temp.push({
                id: file.name,
                file,
                url: URL.createObjectURL(file),
              });
              console.log(temp);
              setImageLoading(false);
            })
            .catch((error) => console.error(error));
        } else {
          console.log('jpg');
          temp.push({
            id: photoToAdd[i].name,
            file: photoToAdd[i],
            url: URL.createObjectURL(photoToAdd[i]),
          });
        }
      }
      if (temp.length > 10) {
        return alert('최대개수 10개가 넘어갔습니다');
      }
      if (temp.length + photoToAddList.length > 10) {
        return alert('최대개수 10개가 넘어갔습니다');
      }
      if (photoToAddList.length > 10) {
        return alert('최대개수 10개가 넘어갔습니다');
      }

      setPhotoToAddList(temp.concat(photoToAddList));
      console.log(photoToAddList);
    },
    [photoToAddList],
  );

  const upLoadFormClick = useCallback(
    (e) => {
      e.preventDefault();
      if (photoToAddList.length === 0) {
        alert('이미지를 등록해주세요');
        return;
      }
      if (!content) {
        alert('내용을 등록해주세요');
        return;
      }

      const formData = new FormData();
      photoToAddList.forEach((p) => {
        formData.append('bo_image', p.file);
      });
      formData.append('bo_writer', me.id);
      formData.append('bo_content', content);

      console.log(photoToAddList);
      console.log(...formData);
      // if (addPostLoading) {
      //   return;
      // }

      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    },
    [photoToAddList, content, addPostDone, me],
  );
  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={upLoadFormClick}
        className={style.upLoadForm}
      >
        <div className={style.imageBox}>
          <ul>
            <UploadImages
              photoToAddList={photoToAddList}
              imageInput={imageInput}
              setPhotoToAddList={setPhotoToAddList}
            />
          </ul>
        </div>

        <input
          name="bo_image"
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          ref={imageInput}
          onChange={handleImage}
          hidden
          multiple
        />

        {imageLoading && <Loading />}

        <div className={style.textInput}>
          <textarea
            name="bo_content"
            type="text"
            placeholder="문구를 입력해주세요"
            ref={ref}
            onInput={handleResizeHeight}
            onChange={onChangeContent}
          />
          <button>게시</button>
        </div>
      </form>
    </>
  );
};

export default FormUpload;
