import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Typography, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Page, pdfjs, Document } from "react-pdf";

export default function PDFViewer(props: { docs: any }) {
  const { docs } = props;
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Button
          startIcon={<ArrowBack />}
          color="secondary"
          variant="outlined"
          onClick={() => {
            changePage(-1);
          }}
          disabled={pageNumber <= 1}
        >
          Previous
        </Button>
        <Typography sx={{ pt: 1 }} variant="caption">
          Page {pageNumber} of {numPages}
        </Typography>
        <Button
          endIcon={<ArrowForward />}
          color="secondary"
          variant="outlined"
          onClick={() => {
            changePage(1);
          }}
          disabled={pageNumber >= numPages!}
        >
          Next
        </Button>
      </Box>
      <Divider />
      <Document file={docs} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
    </>
  );
}
