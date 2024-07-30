import {
  Box,
  CloseButton,
  FormControl,
  HStack,
  IconButton,
  Image,
  Text,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import convert from "convert";
import { useEffect, useMemo, useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";

import { svgAssets } from "@neoWeb/assets/images/svgs";
import { colorScheme } from "@neoWeb/theme/colorScheme";
import Dropzone, { Accept, DropEvent, FileRejection } from "react-dropzone";
import { FaExpandAlt } from "react-icons/fa";
import { MultipleUploadPlugin } from "./plugins/MultipleUploadPlugin";
import { decideFileIcon } from "./utils";

export interface IPreview {
  link: string;
  fileType?: string;
  fileName?: string;
}

export interface CropPluginRef {
  clearCropImages: () => void;
}

export interface IDropzoneComponentControlledProps {
  name: string;
  control: Control<any>;
  imagePreview?: string;
  options: {
    isMultiple?: boolean;
    isFile?: boolean;
    accept?: Accept;
    maxSize?: number;
    removeIcon?: boolean;
    helperText?: string;
    previewColumnsNo?: {
      xl?: number;
      lg?: number;
      md?: number;
      sm?: number;
    };
  };
  isSupport?: boolean;
}

export const defaultMaxSize = 2;

export function DropzoneComponentControlled({
  name,
  control,
  imagePreview,
  options,
  isSupport
}: IDropzoneComponentControlledProps) {
  const {
    isMultiple,
    isFile,
    accept,
    maxSize,
    removeIcon,
    helperText,
    previewColumnsNo
  } = options;

  //ref
  const cropPluginRef = useRef<CropPluginRef>(null);
  // States
  const [acceptedFileList, setAcceptedFileList] = useState<Blob[]>([]);

  const [imageList, setImageList] = useState<Blob[]>([]); //
  const [preview, setPreview] = useState<IPreview[]>([]); // sets images/items for preview
  const [rejectedFileList, setRejectedFileList] = useState<FileRejection[]>([]); // rejected files list

  const singleUploadPreview = useMemo(() => {
    return !isMultiple && preview.length > 0;
  }, [preview, imagePreview, isMultiple]);

  const clearImages = () => {
    setImageList([]);
    setPreview([]);
    cropPluginRef.current && cropPluginRef.current.clearCropImages();
  };

  useEffect(() => {
    if ((acceptedFileList?.length ?? 0) < 1 && !imagePreview) clearImages();
  }, [acceptedFileList]);
  useEffect(() => {
    if (imagePreview && imagePreview != "") {
      setPreview([
        {
          link: imagePreview ?? ""
        }
      ]);
    }
  }, [imagePreview]);

  //Dropzone container====================================================================
  const renderDropzoneContainer = () => {
    if (singleUploadPreview) {
      if (isFile || imageList[0]?.type?.includes("application")) {
        return (
          <>
            {decideFileIcon(preview[0], 34)}
            <Text flex={1} noOfLines={[1]}>
              {preview[0]?.fileName}
            </Text>
          </>
        );
      }
      return singleUploadPreviewRender();
    }

    // Default COntainer and information for image upload (No items uploaded)
    return (
      <>
        {isSupport ? (
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={colorScheme.primary_50}
            p={3}
            borderRadius={"20px"}
          >
            <svgAssets.GalleryIcon />
          </Box>
        ) : (
          <svgAssets.ImagePlaceHolderDropZonee />
        )}

        <Text
          fontSize={"14px"}
          fontWeight={400}
          color={colorScheme.sideBar_text}
        >
          {isSupport
            ? "Please upload a relevant image to help us address your issue."
            : ""}
        </Text>

        <VStack spacing={1}>
          {accept && (
            <Text color={colorScheme.gray_400}>{`Only ${Object.values(
              accept
            )} file types are accepted`}</Text>
          )}
          <Text color={colorScheme.gray_400}>{helperText}</Text>
        </VStack>
      </>
    );
  };

  //Single Upload Preview ====================================
  const singleUploadPreviewRender = () => {
    return (
      <>
        {singleUploadPreviewActions()}
        <Image
          position={"relative"}
          src={preview[0]?.link}
          height="200px"
          width="inherit"
          objectFit="cover"
        />
        <Text flex={1} noOfLines={[1]}>
          {preview[0]?.fileName}
        </Text>
      </>
    );
  };

  //Actions for single upload==================================================
  const singleUploadPreviewActions = () => {
    return (
      <HStack w="100%" justifyContent={"flex-end"} alignItems={"center"}>
        {singleUploadPreview && (
          <Tooltip
            borderRadius={"4px"}
            hasArrow
            label="Preview"
            placement="top"
          >
            <IconButton
              variant="solid"
              colorScheme={"purple"}
              aria-label="Edit"
              onClick={e => {
                e.stopPropagation();
                window.open(preview[0].link);
              }}
            >
              <FaExpandAlt size={18} />
            </IconButton>
          </Tooltip>
        )}
        {!removeIcon && (
          <CloseButton
            onClick={e => {
              e.stopPropagation();
              setPreview([]);
              setAcceptedFileList([]);
            }}
          />
        )}
      </HStack>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => {
        useEffect(() => {
          onChange(acceptedFileList?.length < 1 ? null : acceptedFileList);
        }, [acceptedFileList]);
        const handleOnFileDrop:
          | (<T extends File>(
              acceptedFiles: T[],
              fileRejections: FileRejection[],
              event: DropEvent
            ) => void)
          | undefined = (acceptedFiles, rejectedFiles) => {
          isMultiple
            ? (setAcceptedFileList(prev => [...prev, ...acceptedFiles]),
              setImageList(prev => [...prev, ...acceptedFiles]),
              setRejectedFileList(prev => [...prev, ...rejectedFiles]))
            : (setAcceptedFileList(acceptedFiles),
              setImageList(acceptedFiles),
              setRejectedFileList(rejectedFiles));
          acceptedFiles.forEach(file => {
            const filePreview = {
              link: URL.createObjectURL(file),
              fileType: file.type,
              fileName: file.name
            };
            isMultiple
              ? setPreview(prev => [...prev, filePreview])
              : setPreview([filePreview]);
          });
        };

        return (
          <>
            <FormControl isInvalid={!!error}>
              <Dropzone
                onDrop={handleOnFileDrop}
                maxSize={
                  maxSize
                    ? convert(maxSize, "MB").to("bytes")
                    : convert(defaultMaxSize, "MB").to("bytes")
                } // default maxSize 5MB
                multiple={!!isMultiple}
                accept={accept ? accept : { "*/*": [".*"] }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <Box
                      {...getRootProps()}
                      border={
                        error
                          ? `1px dashed ${colorScheme.danger_500}`
                          : isSupport
                            ? "none"
                            : "1px dashed #E2E8F0"
                      }
                      padding={6}
                      borderRadius={isSupport ? "16px" : "3px"}
                      height={"100%"}
                      background={isSupport ? colorScheme.gray_50 : "none"}
                    >
                      <input {...getInputProps()} />
                      <VStack
                        spacing={isSupport ? 0 : 4}
                        py={isSupport ? 4 : 0}
                      >
                        {renderDropzoneContainer()}
                      </VStack>
                    </Box>

                    <Text
                      ml={error && 1}
                      mt={error && 1}
                      color={colorScheme.danger_500}
                    >
                      {error ? error?.message : ""}
                    </Text>

                    {/* Multiple Upload Container */}
                    <MultipleUploadPlugin
                      {...{
                        preview,
                        setPreview,
                        rejectedFileList,
                        setRejectedFileList,
                        isMultiple,
                        previewColumnsNo,
                        setAcceptedFileList,
                        maxSize
                      }}
                    />
                  </section>
                )}
              </Dropzone>
            </FormControl>
          </>
        );
      }}
    />
  );
}
