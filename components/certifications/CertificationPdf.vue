<template>
  <div class="certification-pdf">
    <SectionSeperator />
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
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      // New Promise is necessary to make function wait for pdf output
      const pdfString = await new Promise((resolve, reject) => {
        html2pdf()
          .set(opt)
          .from(element)
          .outputPdf()
          .then(function(pdf) {
            resolve(pdf);
          });
      });

      // Convert PDF string to Blob
      const pdfBytes = new Uint8Array(pdfString.length);
      for (let i = 0; i < pdfString.length; i++) {
        pdfBytes[i] = pdfString.charCodeAt(i);
      }
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      return pdfBlob;
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
}
</style>
