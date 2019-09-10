import React, { Fragment, useState } from 'react';
import Message from './Message';
// import Progress from './Progress';
import axios from 'axios';

const FileUpload = (props) => {

  

  const [catogery, setCatogery] = useState('');
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setMessage('');
  };
  const onChangeCatog = e => {
    // setCatogery(e.target.name);
    setCatogery(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('zipfile', file);
    formData.append('catogery', catogery);
    formData.append('user', props.curuser);

    try {
      const res = await axios.post('http://localhost:3001/gzip/', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          ,
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );

            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 10000);
          }
        }
      );

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
      setFile('');
      setFilename('Choose File');
      setMessage('File uploaded sucessfully');
      setCatogery('');
      
      console.log("State message " + message);
      console.log("State path " + filePath + fileName);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }; 

  return (
    <div>
      <br/>
      <h4>{message}</h4>
      <br/>
      <Fragment>
        {/* {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            
          </div>
        </div>
      ) : null}
      
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary mt-4'
        />
      </form> */}
        <form onSubmit={onSubmit}> 
          <div class="form-group">
            <select class="custom-select" onChange={onChangeCatog} id="catogery" name ="catogery">
              <option value={catogery}>select one</option>
              <option value="/purchase/tesco">tesco bill</option>
              <option value="/purchase/aldi">adli bill</option>
              <option value="/takeout">google data</option>
              <option value="/finance/banksmt">bank statement</option>
              <option value="/finance/cardsmt">card statement</option>
            </select>
            <div class="invalid-feedback">Choose revelevent file type</div>
          </div>

          <div class="form-group">
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={onChange} >
            </input>
            <label className='custom-file-label' htmlFor='customFile'>
              {filename}
            </label>
          </div>
          <input
            type='submit'
            value='Upload'
            className='btn btn-primary mt-4'
          />
        </form>

      </Fragment>
    </div>
  );
};

export default FileUpload;