import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TemplateImages } from "./Templates/Templates";
import { getInitialCanvasData, getUpdatedTemplate } from "../../../../config/utils/canvasUtil";
import { useColorMode } from "@chakra-ui/react";
import { addHistory } from "../../../../config/redux/slices/historySlice";

const usePosterGenerator = ({ reducer }) => {
  const dispatchState = useDispatch();
  const history = useSelector((state) => state.history?.history);
  const [canvasData, dispatch] = useReducer(reducer, getInitialCanvasData());
  const [templates, setTemplates] = useState([]);

  const canvasRef = useRef(null);

  const templateData = (templates[canvasData.activeTemplate.templateIndex] &&
    templates[canvasData.activeTemplate.templateIndex][
    canvasData.activeTemplate.sizeIndex
    ]) ||
    TemplateImages[canvasData.activeTemplate.templateIndex][
    canvasData.activeTemplate.sizeIndex
    ]

  useEffect(() => {
    setTemplates(TemplateImages);
    dispatch({ type: "set-templates", payload: TemplateImages });
  }, []);

  const resetTemplates = () => {
    setTemplates(TemplateImages);
    dispatch({ type: "set-templates", payload: TemplateImages });
  };

  const handleExport = (elementref, name) => {
    const uri = elementref.current.toDataURL();
    const link = document.createElement("a");
    link.href = uri;
    link.download = name + ".png";
    link.target = "_blank";
    link.click();
  };

  const handleGenerate = () => {
    showModal("template");
  };

  const showModal = (currentModal) => {
    dispatch({ type: "show-modal", payload: currentModal });
  };

  useEffect(() => {
    if (canvasRef.current) {
      convertCanvasToImage();
    }
  }, [
    canvasData.btnText,
    canvasData.mainContent,
    canvasData.subContent,
    canvasData.images,
    canvasData.activeTemplate,
    canvasData.texts,
  ]);

  const convertCanvasToImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();

    const img = new Image();
    img.src = dataURL;
  };

  const handleTextChange = (e) => {
    if (canvasData.currentTextId) {
      const updatedTexts = templateData.texts.map((text) => {
        if (text.id == canvasData.currentTextId) {
          return {
            ...text,
            text: e.target.value,
          };
        }
        return text;
      });

      setTemplates((prevState) => {
        const data = {
          texts: updatedTexts,
        };
        let template = templateData;
        const updatedTemplates = getUpdatedTemplate({
          currentData: prevState,
          data,
          index: canvasData.activeTemplate.templateIndex,
          template,
        });
        return updatedTemplates;
      });
      dispatch({
        type: "edit-text",
        payload: { id: canvasData.currentTextId, newText: e.target.value },
      });
    }
  };

  const handleTextClick = (e) => {
    if (e?.target) {
      dispatch({ type: "set-currentTextId", payload: e.target.attrs.id });
      dispatch({
        type: "set-currentFontSize",
        payload: e.target.attrs.fontSize,
      });
      dispatch({
        type: "set-currentFontFamily",
        payload: e.target.attrs.fontFamily,
      });
      dispatch({ type: "set-currentFontColor", payload: e.target.attrs.fill });
    }
  };

  const handleTextFocus = (e) => {
    if (e?.target) {
      let text = templateData.texts.find((x) => x.id == e.target.id);
      dispatch({ type: "set-currentTextId", payload: e.target.id });
      dispatch({
        type: "set-currentFontSize",
        payload: text.fontSize,
      });
      dispatch({
        type: "set-currentFontFamily",
        payload: text.font,
      });
      dispatch({ type: "set-currentFontColor", payload: text.fontColor });
    }
  };

  const handleOnBlur = () => {
    dispatch({ type: "set-currentTextId", payload: null });
  };

  useEffect(() => {
    if (history?.length === 0) {
      dispatchState(addHistory(canvasData));
    }
  }, []);

  const { colorMode } = useColorMode();

  return {
    canvasData,
    templates,
    canvasRef,
    handleExport,
    handleGenerate,
    handleTextChange,
    handleTextClick,
    handleTextFocus,
    handleOnBlur,
    colorMode,
    resetTemplates,
    dispatch,
    setTemplates,
    templateData,
  }
}

export default usePosterGenerator;