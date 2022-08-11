import { ImageAsset } from "../../assets/images"

const Avatar =({photoURL}:{photoURL?: string | null}):JSX.Element =>{
    let finalURL = ImageAsset.avatar_default
    if(photoURL && photoURL !== null){
        finalURL = photoURL
    }
    return(
        <img src={finalURL} alt="avatar" style={{
            verticalAlign:"middle",
            width:"50px",
            height:"50px",
            borderRadius:"50%",
        }}/>
    )
}

export default Avatar