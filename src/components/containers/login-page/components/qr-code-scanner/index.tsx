
import { EToastMessage } from "@/enums";
import clsx from "clsx";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

import "./styles.css";

type TQrCodeScannerProps<T> = {
  className?: string;
  onDataConverted?:  (decodedText: T) => Promise<void>;
  scanDelay?: number;
  convertDecodedDataToObject: (data: string) => T
};

export default function QrCodeScanner<T>({ 
  className, 
  onDataConverted,
  scanDelay = 2000,
  convertDecodedDataToObject,
}: TQrCodeScannerProps<T>) {


  
  const lastScanTime = useRef<number>(0);

  const handleOnSuccessScan =  async (decodedText: string) => {
    const now = Date.now();
      if (now - lastScanTime.current >= scanDelay) {
        let dataparsed = null;
        try {
          lastScanTime.current = now;
          dataparsed = convertDecodedDataToObject(decodedText);
          onDataConverted && await onDataConverted(dataparsed);
        } catch (error) {
          console.error(error)
          toast.error(EToastMessage.QR_CODE_INVALID);
        } 
      }
  };

  const handleErrorDuringScan = (error: string | Error) => {
    if (error.toString().includes("No MultiFormat Readers")) return; // Ignore this specific error
    console.error(error); 
    const message = error instanceof Error ? error.message : error;
    toast.error(message);
  };
  
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 5,
        qrbox: {
          width: 256,
          height: 256
        },
        showTorchButtonIfSupported: true,
       
      },
      false
    );
    scanner.render(
      handleOnSuccessScan,
      handleErrorDuringScan
    );

    return () => {
      scanner.clear();
    };
  }, []);

  
  return (
    <div className={clsx("flex items-center justify-center w-full", className)}>
      <div id="reader" className="w-full h-full max-w-3xl flex flex-col justify-center"></div>
    </div>
  );
}
