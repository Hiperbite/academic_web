import React from 'react'

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
} from "@react-pdf/renderer";
import Html from 'react-pdf-html';
export const HtmlToPdf = () => {
    return (
        <div>HtmlToPdf</div>
    )
}
// Create styles
const styles = {
    page: {
    },
    section: {
        margin: 25,
        padding: 10,
        fontSize:12
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
};

// Create Document Component
export const HtmlDocument = ({ children }: any) => {
    return (
        <PDFViewer style={styles.viewer}>
            <Document>
                <Page size="A4" style={styles.page}>

                    <View style={styles.section}>
                        <Html  style={styles.section}>
                            {children}</Html>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}