import React, { useRef, useState } from 'react';

const ImageLoad = ({ setForm, form }) => {
  const [preview, setPreview] = useState(null)
  const ref= useRef(null)

  const triggerInput = () => {
    ref.current.click();
  }

  const removeImg = () => {
    setPreview(null);
  }

  const changeHandler = (e) => {
    const file = e.target.files[0];

    setForm({ ...form, file: file});

    const reader = new FileReader()

    reader.readAsDataURL(file);
    reader.onload = ev => {
      const src = ev.target.result;

      setPreview({
        src,
        name: file.name
      })
    }
  }

  return (
    <div className="image-container" >
      <input type="file" onChange={changeHandler} ref={ref} />
      <div className="add-img-btn" onClick={triggerInput}>Add Image</div>
      {preview && <div className="preview-container">
        <img src={preview.src} alt={preview.name} width="430px" height="287px" />
        <div className="preview-remove" onClick={removeImg}>&times;</div>
        <div className="preview-info">
          <span>{preview.name}</span>
        </div>
      </div>}
    </div>
  )
}

export default ImageLoad;