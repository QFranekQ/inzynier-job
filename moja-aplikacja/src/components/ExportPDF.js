import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function ExportPDF(CardsName, inputs) {

    
      // Create a new jsPDF instance
      const doc = new jsPDF();
    //   console.log(CardsName)

      // Set the title for the PDF document
      doc.setProperties({
        title: CardsName,
      });
    
      // Start a new page in the PDF
      doc.addPage();
    
      // Set the font size and text
      doc.setFontSize(12);
      doc.text(`Cards Name: ${CardsName}`, 10, 10);
    
      // Create a table to display the data
      const tableData = inputs.map((input) => [input.left, input.right]);
    
      doc.autoTable({
        head: [['Left', 'Right']],
        body: tableData,
        startY: 20,
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