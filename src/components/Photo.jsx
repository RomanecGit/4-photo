import React from 'react';
import {useState} from 'react';
import shortid from 'shortid';

function Photo() {
    const [imgs, setImgs] = useState([]);
    const fileToDataUrl = file => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.addEventListener('load', evt => {
                resolve(evt.currentTarget.result);
            });

            fileReader.addEventListener('error', evt => {
                reject(new Error(evt.currentTarget.error));
            });

            fileReader.readAsDataURL(file);
        });
    }

    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        let urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        setImgs(imgs.concat(urls.map((url)=>{ return {"url": url, "key": shortid.generate()}})));
        console.log(imgs);
    }

    const del = (key) => {

    }

    return (
        <React.Fragment>
            <form id="upload-container">
                <div>
                    <input onChange={(e) => handleSelect(e)} id="file-input" type="file" name="file" multiple/>
                    <label htmlFor="file-input">Выберите файл</label>
                </div>
            </form>

            {imgs.map((img) =>
                <React.Fragment key={img.key}>
                    <img  className="preview img-thumbnail" src={img.url}/>
                    <button type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={()=>setImgs(imgs.filter((im) => img.key !== im.key ))}
                    />
                </React.Fragment>
            )}

        </React.Fragment>
    );
}

export default Photo;


