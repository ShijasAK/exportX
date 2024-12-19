import React, { useRef, useEffect } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useColorMode,
  chakra,
} from '@chakra-ui/react';
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import { useController } from 'react-hook-form';
import { getColor, colorKeys } from '../../config/constants/colors';
import { accessValue } from '../../config/utils/stringUtil';
import { backgroundColor } from '@syncfusion/ej2-richtexteditor/src/rich-text-editor/models/items';

const FormRichTextEditor = ({
  id,
  h,
  rules = {},
  height,
  control,
  label,
  errors = {},
  containerProps,
  required,
  placeholder,
}) => {
  const { colorMode } = useColorMode();
  const ref = useRef(null);

  const handleAlignLeftClick = () => {
    ref.current.executeCommand('justifyLeft');
  };

  const handleAlignCenterClick = () => {
    ref.current.executeCommand('justifyCenter');
  };

  const handleAlignRightClick = () => {
    ref.current.executeCommand('justifyRight');
  };

  if (required) {
    required = `${label} is required`;
  }

  const { field } = useController({
    name: id,
    rules: {
      required: required ? `${label} is required` : false,
      ...rules,
    },
    control: control,
  });

  useEffect(() => {
    if (ref.current) {
      // Check for the appropriate focus method based on Syncfusion's API
      if (typeof ref.current.focus === 'function') {
        ref.current.focus();
      } else {
        // Explore alternative methods if focus is not directly available
        // console.log(
        //   'focus method not found on ref.current, try alternative approaches'
        // );
      }
    }
  }, []);

  return (
    <FormControl
      isInvalid={accessValue(errors, `${id}.message`)}
      {...containerProps}
    >
      <FormLabel htmlFor={id}>
        {label}
        {required && (
          <chakra.span color={getColor(colorKeys.danger, colorMode)}>
            *
          </chakra.span>
        )}
      </FormLabel>
      <RichTextEditorComponent
        change={(e) => field.onChange(e.value)}
        value={field.value}
        height={height || 300}
        enableResize={true}
        enableHtmlSanitizer={true}
        enableAutoUrl={true}
        enableTabKey={true}
        blur={() => field.onBlur()}
        ref={ref}
        delayUpdate={true}
        placeholder={placeholder}
        toolbarSettings={{
          items: [
            'Undo',
            'Redo',
            'Bold',
            'Italic',
            'Underline',
            'StrikeThrough',
            'OrderedList',
            'UnorderedList',
            {
              tooltipText: 'Align Left',
              template:
                '<button class="e-menu-icon e-icons e-justify-left"></button>',
              click: handleAlignLeftClick,
            },
            {
              tooltipText: 'Align Center',
              template:
                '<button class="e-menu-icon e-icons e-justify-center"></button>',
              click: handleAlignCenterClick,
            },
            {
              tooltipText: 'Align Right',
              template:
                '<button class="e-menu-icon e-icons e-justify-right"></button>',
              click: handleAlignRightClick,
            },
            'Image',
            'CreateLink',
          ],
        }}
        insertImageSettings={{
          saveFormat: 'Base64',
        }}
        style={{
          zIndex: 0,
        }}
      >
        <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
      </RichTextEditorComponent>
      <FormErrorMessage>
        {accessValue(errors, `${id}.message`)}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormRichTextEditor;
