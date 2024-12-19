export const getUpdatedTemplate = ({ currentData, index, data, template }) => {
    let updatedTemplates = [...currentData]; //all templates
    let activeIndex = [...updatedTemplates[index]]; //current template
    let activeItemIndex = activeIndex.findIndex(
        (item) => item.name == template.name
    ); //curent template size

    //template - current template with the size
    const updatedTemplateItem = {
        ...template,
        ...data,
    };

    activeIndex[activeItemIndex] = updatedTemplateItem; //updating item inside current template size

    updatedTemplates[index] = activeIndex; //updating current template with the updated size

    return updatedTemplates;
}

export const getInitialCanvasData = () => {
    return {
        btnText: { text: "", color: "#ffffff", fontSize: 34 },
        mainContent: { text: "", color: "#377979", fontSize: 38 },
        subContent: { text: "", color: "#b02439", fontSize: 22 },
        images: {
            logo: {
                url: "",
                crop: {
                    unit: "%",
                    x: 0,
                    y: 0,
                    width: 50,
                    height: 50,
                },
                croppedUrl: "",
                ratio: 1 / 1,
            },
            watermark: {
                url: "",
                crop: {
                    unit: "%",
                    x: 0,
                    y: 0,
                    width: 50,
                    height: 50,
                },
                croppedUrl: "",
                ratio: 0,
            },
            image: {
                url: "",
                crop: {
                    unit: "%",
                    x: 0,
                    y: 0,
                    width: 50,
                    height: 50,
                },
                croppedUrl: "",
                ratio: 0,
            },
            background: "",
            backgroundImage: null,
            pattern: "",
        },
        modal: {
            crop: { isActive: false },
            template: { isActive: false },
        },
        activeForm: { type: "", src: "", crop: {}, ratio: null },
        activeTemplate: { templateIndex: 0, sizeIndex: 0 },
        templates: [],
        texts: [],
        currentTextId: null,
        lastTextId: null,
        history: [],
        selectedFontSize: 20,
        selectedFontFamily: "Ariel",
        selectedColor: "#000000",
        canvasImages:[]
    };
}