<template>
  <div class="certification-pdf">
    <div class="certification-pdf__preview">Preview:</div>
    <section ref="pdfContent" class="certification-pdf__content">
      <CertificationBGITemplate
        v-if="certification.name === 'BGI'"
        :certificationTemplate="certificationTemplate"
        :certificationSignature="certificationSignature"
        :name="name"
      />
    </section>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

const html2pdfOptions = {
  margin: 0,
  filename: 'certification.pdf',
  image: { type: 'jpg', quality: 1 },
  html2canvas: { scale: 1 },
  jsPDF: { unit: 'in', format: [12, 9], orientation: 'landscape' },
};

export default {
  data() {
    return {
      name: '[NAME]',
    };
  },
  props: {
    certification: {
      type: Object,
      required: true,
    },
    certificationTemplate: {
      type: Object,
      required: true,
    },
    certificationSignature: {
      type: String,
      required: true,
    },
  },
  methods: {
    async generatePdf(name) {
      // Dynamically import html2pdf.js to reduce bundle size
      const html2pdf = (await import('html2pdf.js')).default;
      this.name = name;
      const element = this.$refs.pdfContent;

      try {
        // wait 3 seconds to simulate generating PDF
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // throw new Error('Test error');
        const pdfString = await html2pdf()
          .set(html2pdfOptions)
          .from(element)
          .outputPdf();

        // Convert PDF string to Blob
        const pdfBytes = new Uint8Array(pdfString.length);
        for (let i = 0; i < pdfString.length; i++) {
          pdfBytes[i] = pdfString.charCodeAt(i);
        }
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

        return pdfBlob;
      } catch (error) {
        console.error('Error generating PDF:', error);
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
.certification-pdf {
  &__preview {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem;
  }

  &__content {
    margin: auto;
  }
}
</style>
