/**
 * Client-side image compression utility
 * Ensures images captured on smartphone cameras or desktop files are 
 * optimized to high-quality lightweight JPEG (~25-40KB) so they sync 
 * instantaneously across devices via GitHub Issues cloud database.
 */
export async function compressImageToFit(file, maxChars = 45000) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let quality = 0.65;
        let maxDim = 640;
        const canvas = document.createElement('canvas');

        const generate = (dim, q) => {
          let w = img.width;
          let h = img.height;
          if (w > h) {
            if (w > dim) {
              h = Math.round((h * dim) / w);
              w = dim;
            }
          } else {
            if (h > dim) {
              w = Math.round((w * dim) / h);
              h = dim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          return canvas.toDataURL('image/jpeg', q);
        };

        let dataUrl = generate(maxDim, quality);
        let iterations = 0;
        while (dataUrl.length > maxChars && maxDim > 240 && iterations < 5) {
          maxDim -= 80;
          quality = Math.max(0.35, quality - 0.1);
          dataUrl = generate(maxDim, quality);
          iterations++;
        }

        resolve(dataUrl);
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}
