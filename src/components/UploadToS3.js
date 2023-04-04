import React , {useState} from 'react';
import aws from 'aws-sdk';
import Pool from './UserPool'
import {getUserID} from './DataInterface'


const S3_BUCKET ='burnout-test';
const REGION ='us-west-2';
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID; 
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const DIR_NAME = getUserID()//Pool.getCurrentUser().username; //"user1234"//

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    dirName: DIR_NAME
}


const s3 = new aws.S3(config)



const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    /**
     * Handles file input
     * @param {*} e 
     */
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    /**
     * Uploads to url
     * @param {*} url 
     */
    const uploadToURL = async (url) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg'
            },
            body: selectedFile
        })
        console.log(response)
    }
        

    /**
     * Handles the upload
     * @param {*} file 
     * @returns 
     */
    const handleUpload = async (file) => {
        if (!file) return
        generateUploadURL()
            .then((url) => {
                uploadToURL(url)
            })
            .catch((err) => {console.log(err)})
    }

    /**
     * Loads the image url
     * @returns 
     */
    const generateUploadURL = async () => {
        const imageName = DIR_NAME
        const params = ({
            Bucket: S3_BUCKET,
            Key: imageName,
            Expires: 60
        })

        // console.log(s3.getSignedUrl('putObject' , params))
        const uploadURL = await s3.getSignedUrlPromise('putObject' , params)
        // console.log(uploadURL)
        return uploadURL
    }

    return <div className='flex justify-center flex-col'>
        {/* <div>React S3 File Upload</div> */}
        <input className="md:ml-32" type="file" onChange={handleFileInput}/>
        <button className="text-white text-ig rounded-lg bg-navy font-bold rounded-20 py-2 px-4 cursor-pointer" type="button" onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;