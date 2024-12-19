import React, { useState, useRef, useEffect } from "react";
import { Image, Box, HStack, Button, useColorMode } from "@chakra-ui/react";
import ReactCrop from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss'
import { colorKeys, getColor } from "../../../../config/constants/colors";


 const CropForm = (props) =>{
    const { colorMode } = useColorMode();
    const { dispatch,ratio } = props;
    const [src, setSrc] = useState();
    const [crop, setCrop] = useState({});
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const imageRef = useRef();

    useEffect(() => {
        onSelectFile()
        setCrop(props.crop)
        onCropComplete(props.crop)
    }, [props])
    const onSelectFile = () => {
        if (props.src) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setSrc(reader.result));
            setCroppedImageUrl(null)
            reader.readAsDataURL(props.src);
        }
    };


    const onCropComplete = (crop) => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const makeClientCrop = async (crop) => {
        if (imageRef.current && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef.current,
                crop,
                "newFile.jpeg"
            );
            setCroppedImageUrl(croppedImageUrl);
        }
    };

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelRatio = window.devicePixelRatio;
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
        const ctx = canvas.getContext("2d");


        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(croppedImageUrl);
                const fileUrl = window.URL.createObjectURL(blob);
                setCroppedImageUrl(fileUrl);
                resolve(fileUrl);
            }, "image/png");
        });
    };

    const handleSubmit = () => {
        dispatch({ type: 'image-crop', payload: { type: props.type, crop: crop, croppedUrl: croppedImageUrl } })
        setCrop({})
        setSrc(null);
        setCroppedImageUrl(null)
        dispatch({type:"clear-active-form"})
    }

    return (
        <Box>
            <HStack
                    backgroundColor={"#BDBDBD"}
                    mt={"20px"}
                    borderRadius={"5px"}
                    paddingY={"5px"}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Box
                        backgroundColor={"#010101"}
                        borderColor={"#F2F2F2"}
                    >
                        {src && (
                        <>
                            <ReactCrop
                                // src={src}
                                crop={crop}
                                ruleOfThirds
                                // onImageLoaded={onImageLoaded}
                                onComplete={onCropComplete}
                                onChange={onCropChange}
                                aspect={ratio}
                            >
                                <Image ref={imageRef} style={{ maxWidth: "200px" }} src={src} alt="" />
                            </ReactCrop></>
                    )
                    }
                    </Box>
                </HStack>
                {croppedImageUrl&&
                    <Button
                    mt={"20px"}
                    fontSize="14px"
                    fontWeight={"400"}
                    display={"fill"}
                    alignItems={"center"}
                    w={"100%"}
                    rounded={"full"}
                    onClick={handleSubmit}
                    bg={getColor(colorKeys.secondary, colorMode)}
                    color={getColor(colorKeys.primary, colorMode)}
                >
                Upload
            </Button>}
        </Box>
    );
 }

 export default CropForm;