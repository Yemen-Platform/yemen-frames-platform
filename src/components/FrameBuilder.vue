<template>
  <div class="max-w-5xl mx-auto">
    <h1 class="text-4xl font-bold mb-6 px-2 m-5 border-r-2 border-slate/80">صمم إطارك مجانا</h1>

    <div class="flex flex-col items-center mt-5 shadow-xl card p-4 bg-base-100">
      <div class="relative w-70 lg:w-full max-w-md mt-5">
        <div class="relative w-full aspect-square">
          <img
            ref="image"
            :src="imageSrc"
            alt="Uploaded Image"
            class="cropper-image w-full h-full object-cover"
            v-if="imageSrc"
          />
          <div class="absolute inset-0 pointer-events-none">
            <img :src="frameSrc" alt="إطار الصورة" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" class="hidden" />
      <button
        @click="triggerFileInput"
        class="mt-5 btn"
        :class="{ 'btn-primary': !imageSrc, 'btn-success': imageSrc }"
      >
        {{ imageSrc ? 'تغيير الصورة' : 'رفع صورة' }}
        <i class="i-mdi-upload"></i>
      </button>

      <input type="file" ref="frameFileInput" @change="onFrameFileChange" accept="image/png" class="hidden" />
      <button @click="triggerFrameFileInput" class="mt-3 btn btn-secondary">
        {{ isCustomFrame ? 'تغيير الإطار المخصص' : 'إضافة إطار مخصص' }}
        <i class="i-mdi-image-plus"></i>
      </button>

      <button v-if="isCustomFrame" @click="resetToDefaultFrame" class="mt-3 btn btn-warning">
        استعادة الإطار الافتراضي
        <i class="i-mdi-restore"></i>
      </button>
      <div v-if="imageSrc" class="mt-5 w-full flex flex-col items-center space-y-4">
        <div class="flex space-x-2 text-2xl">
          <button @click="rotateImage(90)" class="btn btn-primary i-mdi:rotate-right"></button>
          <button @click="rotateImage(-90)" class="btn btn-primary i-mdi:rotate-left "></button>
        </div>

        <button @click="downloadImage" class="btn btn-wide btn-success mt-5">
          تنزيل الصورة
          <i class="i-mdi-cloud-download" />
        </button>

        <div class="flex space-x-2 text-center mt-5 border-t p-2">
 <span class="">شارك الإطار:</span>
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`"
            target="_blank"
            class="btn btn-outline btn-info"
          >
            <i class="i-mdi-facebook"></i> فيسبوك
          </a>
          <a
            :href="`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`"
            target="_blank"
            class="btn btn-outline btn-success"
          >
            <i class="i-mdi-whatsapp"></i> واتساب
          </a>
          <a
            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`"
            target="_blank"
            class="btn btn-outline btn-neutral"
          >
            <i class="i-line-md-twitter-x-alt"></i> إكس
          </a>
 
        </div>
      </div>

      <canvas ref="canvas" class="hidden"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const imageSrc = ref(null);
const cropper = ref(null);
const canvas = ref(null);
const fileInput = ref(null);
const frameFileInput = ref(null);

const defaultFramePath = '/frame.png';
const frameSrc = ref(defaultFramePath);
const logoSrc = ref('/logo.svg');

const isCustomFrame = computed(() => frameSrc.value !== defaultFramePath);

const shareText = 'صمم إطارك وشارك صورك بسهولة!';

// هنا تم تعريف المتغير currentUrl لتخزين رابط الصفحة الحالي
const currentUrl = window.location.href;

const resetToDefaultFrame = () => {
  if (frameSrc.value?.startsWith('blob:')) {
    URL.revokeObjectURL(frameSrc.value);
  }
  frameSrc.value = defaultFramePath;
};

const triggerFileInput = () => fileInput.value?.click();
const triggerFrameFileInput = () => frameFileInput.value?.click();

const onFrameFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (frameSrc.value?.startsWith('blob:')) {
      URL.revokeObjectURL(frameSrc.value);
    }
    frameSrc.value = URL.createObjectURL(file);
  }
  if (event.target) event.target.value = null;
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (imageSrc.value?.startsWith('blob:')) {
      URL.revokeObjectURL(imageSrc.value);
    }
    imageSrc.value = URL.createObjectURL(file);
    nextTick(() => {
      if (cropper.value) cropper.value.destroy();
      const imageElement = document.querySelector('img.cropper-image');
      if (imageElement) {
        cropper.value = new Cropper(imageElement, {
          viewMode: 3,
          dragMode: 'move',
          responsive: true,
          zoomOnTouch: true,
          zoomOnWheel: true,
          autoCropArea: 1,
          aspectRatio: 1,
          highlight: false,
          cropBoxMovable: false,
          guides: false,
          cropBoxResizable: false,
        });
      }
    });
  }
  if (event.target) event.target.value = null;
};

const rotateImage = (degrees) => {
  if (cropper.value) {
    cropper.value.rotate(degrees);
  }
};

const downloadImage = () => {
  if (!cropper.value || !canvas.value) return;

  const context = canvas.value.getContext('2d');
  const cropperCanvas = cropper.value.getCroppedCanvas();

  const frameImage = new Image();
  frameImage.crossOrigin = 'anonymous';
  frameImage.src = frameSrc.value;

  const logoImage = new Image();
  logoImage.crossOrigin = 'anonymous';
  logoImage.src = logoSrc.value;

  frameImage.onload = () => {
    logoImage.onload = () => {
      const frameWidth = frameImage.naturalWidth;
      const frameHeight = frameImage.naturalHeight;
      canvas.value.width = frameWidth;
      canvas.value.height = frameHeight;

      context.clearRect(0, 0, frameWidth, frameHeight);
      context.drawImage(cropperCanvas, 0, 0, frameWidth, frameHeight);
      context.drawImage(frameImage, 0, 0, frameWidth, frameHeight);

      const logoWidth = frameWidth * 0.15;
      const logoHeight = logoImage.naturalHeight * (logoWidth / logoImage.naturalWidth);
      const logoPadding = frameWidth * 0.03;
      const logoX = frameWidth - logoWidth - logoPadding;
      const logoY = frameHeight - logoHeight - logoPadding;

      context.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

      canvas.value.toBlob((blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'framed-image.webp';
          link.click();
          setTimeout(() => URL.revokeObjectURL(blobUrl), 200);
        }
      }, 'image/webp', 0.9);
    };
  };
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}
button i {
  margin-right: 6px;
}
</style>