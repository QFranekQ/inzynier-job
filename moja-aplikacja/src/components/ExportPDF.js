import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { font } from "./font";

function ExportPDF(CardsName, inputs) {



      // Create a new jsPDF instance
      const doc = new jsPDF();
    //   console.log(CardsName)
    const myFont = '/Code2000-rdLO.ttf' // load the *.ttf font file as binary string
  
    // add the font to jsPDF
    doc.addFileToVFS("WorkSans-normal.ttf", font);
    doc.addFont("WorkSans-normal.ttf", "WorkSans", "normal");
    doc.setFont("WorkSans");
      // Set the title for the PDF document
      doc.setProperties({
        title: CardsName,
      });
    

    
      // Set the font size and text
      doc.setFontSize(12);
      doc.text(`Cards Name: ${CardsName}`, 10, 10);
    
      // Create a table to display the data
      const tableData = inputs.map((input) => [input.left, input.right]);
    
      doc.autoTable({
        head: [['Left', 'Right']],
        body: tableData,
        startY: 20,
        styles: { font: "WorkSans" } // Use the font name specified in addFont
      });
      // Save the PDF with a unique name
      const pdfFileName = `${CardsName}.pdf`;
      doc.save(pdfFileName);
    

    // return (
    //     <div>
    //     <button onClick={() => exportToPDF(CardsName, inputs)}>Export to PDF</button>

    //     </div>
    // );
}

export default ExportPDF;