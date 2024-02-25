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
      html2pdf: null,
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
      if (!this.html2pdf) {
        return null;
      }
      this.name = name;
      const element = this.$refs.pdfContent;
      
      try {
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
  mounted() {
    if (process.browser) {
      import('html2pdf.js').then((module) => {
        this.html2pdf = module.default;
      });
    }
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
