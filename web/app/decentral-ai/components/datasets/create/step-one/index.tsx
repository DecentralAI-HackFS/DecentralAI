"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import type { File } from "@/models/datasets";
import FilePreview from "../file-preview";
import FileUploader from "../file-uploader";
import EmptyDatasetCreationModal from "../empty-dataset-creation-modal";
import Button from "@/app/components/base/button";

import cn from "classnames";
import s from "./index.module.css";

type IStepOneProps = {
  datasetId?: string;
  file?: File;
  updateFile: (file?: File) => void;
  onStepChange: () => void;
};

const StepOne = ({
  datasetId,
  onStepChange,
  file,
  updateFile,
}: IStepOneProps) => {
  const [dataSourceType, setDataSourceType] = useState("FILE");
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const modalShowHandle = () => setShowModal(true);

  const modalCloseHandle = () => setShowModal(false);

  return (
    <div className="flex w-full h-full">
      <div className="grow overflow-y-auto relative">
        <div className={s.stepHeader}>{t("datasetCreation.steps.one")}</div>
        <div className={s.form}>
          <div className={s.dataSourceTypeList}>
            <div
              className={cn(
                s.dataSourceItem,
                dataSourceType === "FILE" && s.active
              )}
              onClick={() => setDataSourceType("FILE")}
            >
              <span className={cn(s.datasetIcon)} />
              {t("datasetCreation.stepOne.dataSourceType.file")}
            </div>
            <div
              className={cn(
                s.dataSourceItem,
                dataSourceType === "IPFS" && s.active
              )}
              onClick={() => setDataSourceType("IPFS")}
            >
              {/* <span className={s.comingTag}>Coming soon</span> */}
              <span className={cn(s.datasetIcon, s.ipfs)} />
              Import from IPFS
            </div>
            <div
              className={cn(
                s.dataSourceItem,
                dataSourceType === "CERAMIC" && s.active
              )}
              onClick={() => setDataSourceType("CERAMIC")}
            >
              {/* <span className={s.comingTag}>Coming soon</span> */}
              <span className={cn(s.datasetIcon, s.ceramic)} />
              Import from Ceramic
            </div>
          </div>
          {dataSourceType === "FILE" && (
            <>
              <FileUploader onFileUpdate={updateFile} file={file} />
              <Button
                disabled={!file}
                className={s.submitButton}
                type="primary"
                onClick={onStepChange}
              >
                {t("datasetCreation.stepOne.button")}
              </Button>
            </>
          )}
          {dataSourceType === "IPFS" && (
            <>
              <div className="pb-9 w-[640px]">
                <label
                  htmlFor="IPFSid"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  CID
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="IPFSid"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <Button
                className={s.submitButton}
                type="primary"
              >
                {t("datasetCreation.stepOne.button")}
              </Button>
            </>
          )}
          {dataSourceType === "CERAMIC" && <div>CERAMIC</div>}

          {!datasetId && (
            <>
              <div className={s.dividerLine} />
              <div onClick={modalShowHandle} className={s.OtherCreationOption}>
                {t("datasetCreation.stepOne.emptyDatasetCreation")}
              </div>
            </>
          )}
        </div>
        <EmptyDatasetCreationModal show={showModal} onHide={modalCloseHandle} />
      </div>
      {file && <FilePreview file={file} />}
    </div>
  );
};

export default StepOne;
