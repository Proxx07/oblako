import QRCodeStyling from 'qr-code-styling';
import { ref } from 'vue';
import { qrGeneratorOptions } from './models';

export const useQrGenerator = () => {
  const imageWrapper = ref<HTMLElement>();
  const qrLink = ref('');
  const blobFile = ref<Blob>();

  const generateQR = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      if (!imageWrapper.value) return;
      imageWrapper.value.innerHTML = '';

      const qrCodeOptions = qrGeneratorOptions(qrLink.value);
      const qrCode = new QRCodeStyling(qrCodeOptions);
      qrCode.append(imageWrapper.value);
      blobFile.value = await qrCode.getRawData('svg') as Blob;
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    blobFile,
    qrLink,
    imageWrapper,
    generateQR,
  };
};
