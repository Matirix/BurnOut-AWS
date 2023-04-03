
// import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';
// import Pool from './UserPool'



// const S3_BUCKET ='burnout-test';
// const REGION ='us-west-2';
// const ACCESS_KEY ='AKIAU7XKFOJGQUDQ4I74';
// const SECRET_ACCESS_KEY ='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';
// const DIR_NAME = Pool.getCurrentUser().username;

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     dirName: DIR_NAME
// }

// const UploadImageToS3WithReactS3 = () => {

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const handleUpload = async (file) => {
//         uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }

//     return <div>
//         <div>React S3 File Upload</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default UploadImageToS3WithReactS3;


import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import aws from 'aws-sdk';
import Pool from './UserPool'
// import dotenv from 'dotenv';

// dotenv.config();

const S3_BUCKET ='burnout-test';
const REGION ='us-west-2';
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID; //"AKIAU7XKFOJGYGJEFUFI" //process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY; //"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" //process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const DIR_NAME = Pool.getCurrentUser().username; //"user1234"//

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
    dirName: DIR_NAME
}



const s3 = new aws.S3(config)


// export async function generateUploadURL () {
//     const imageName = "random image name"
//     const params = ({
//     Bucket: S3_BUCKET,
//     Key: imageName,
//     Expires: 60
//     })
//     const uploadURL = await s3.getSignedUrlPromise('putobject' , params)
//     return uploadURL
// }

const UploadImageToS3WithReactS3 = () => {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

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
        

    const handleUpload = async (file) => {
        if (!file) return
        generateUploadURL()
            .then((url) => {
                uploadToURL(url)
            })
            .catch((err) => {console.log(err)})
    }

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

    return <div>
        {/* <div>React S3 File Upload</div> */}
        <input className="ml-20" type="file" onChange={handleFileInput}/>
        <button className="text-white text-ig bg-navy font-bold rounded-20 py-2 px-4 cursor-pointer" type="button" onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithReactS3;


// import React , {useState} from 'react';
// import S3 from 'react-aws-s3';
// import { uploadFile } from 'react-aws-s3';
// import Pool from './UserPool'



// const S3_BUCKET ='burnout-test';
// const REGION ='us-west-2';
// const ACCESS_KEY ='AKIAU7XKFOJGQUDQ4I74';
// const SECRET_ACCESS_KEY ='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';
// const DIR_NAME = Pool.getCurrentUser().username;

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     dirName: DIR_NAME
// }

// const UploadImageToS3WithReactS3 = () => {

//     const S3client = new S3(config);

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const handleUpload = async (file) => {
//         S3client
//             .uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }

//     return <div>
//         <div>React S3 File Upload</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default UploadImageToS3WithReactS3;

// import React , {useState} from 'react';
// import aws from 'aws-sdk';
// import S3 from 'react-aws-s3';
// import { uploadFile } from 'react-aws-s3';
// import Pool from './UserPool'



// const S3_BUCKET ='burnout-test';
// const REGION ='us-west-2';
// const ACCESS_KEY ='AKIAU7XKFOJGQUDQ4I74';
// const SECRET_ACCESS_KEY ='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';
// const DIR_NAME = Pool.getCurrentUser().username;

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     dirName: DIR_NAME
// }

// const UploadImageToS3WithReactS3 = () => {

//     const S3client = new aws.S3(config)

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const handleUpload = async (file) => {
//         S3client
//             .uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }

//     return <div>
//         <div>React S3 File Upload</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default UploadImageToS3WithReactS3;