declare module "react-qr-scanner" {
  const QrScanner: any;
  export default QrScanner;
}

declare class BarcodeDetector {
  constructor(options?: { formats: string[] });
  static getSupportedFormats(): Promise<string[]>;
  detect(image: ImageBitmapSource): Promise<Array<{ rawValue: string }>>;
}
