<template>
  <div class="certification-pdf">
    <div class="certification-pdf__preview">Preview:</div>
    <section class="certification-pdf__content">
      <CertificationTemplate
        :certification="certification"
        :certificationSignature="certificationSignature"
        :name="name"
      />
    </section>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

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
    certificationSignature: {
      type: String,
      required: true,
    },
  },
  methods: {
    async generatePdf(name) {
      this.name = name;

      const element = document.querySelector('.certification-pdf__content');

      const opt = {
        margin: 1,
        filename: 'certification.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      try {
        // wait 3 seconds to simulate generating PDF
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        // throw new Error('Test error');
        const pdfString = await html2pdf()
          .set(opt)
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
        // Handle any errors that occur while generating the PDF
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
