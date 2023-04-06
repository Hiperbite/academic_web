/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Api } from "../../../../app/api/Api";
import storage from "../../../../app/storage";
import "./Avatar.scss"
const resizeFile = (file: any) => new Promise(resolve => {
    Resizer.imageFileResizer(file, 300, 300, 'JPEG', 50, 0,
        uri => {
            resolve(uri);
        }, 'base64');
});

export const Avatar = ({ setRefresh, avatar }: any) => {
    const navigate = useNavigate()
    const [imgData, setImgData] = useState(avatar ?? "/logo192.png");
    const [uploading, setUploading] = useState(false);
    const onChangePicture = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const image: any = await resizeFile(file);
            setImgData(image);
            setUploading(true)
        }
    };
    const handleSave = async () => {
        const { response: { data: response, status } } = await Api.post({ service: '/users/upload-avatar', data: { avatar: imgData } })
        if (status === 200) {
            storage.set('user', response)
            toast.success('Foto de perfil actualizado com sucesso')
            navigate(0)
        }
    }
    useEffect(() => {
        if (uploading)
            handleSave()
    }, [uploading])
    return (<>
        <div className="image">
            <label htmlFor="profilePic">
                <img src={imgData} className="img img-responsive full-width" />
            </label>
        </div>
        <input id="profilePic" accept=".png,.jpg,.jpeg" type="file" className="hidden" onChange={onChangePicture} />
    </>

    );
};