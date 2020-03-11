---
slug: xslt-release
title: Using xml schema and xslt in R
author:
  - Jeroen Ooms
date: '2017-01-10'
tags:
  - packages
  - XML
  - xslt
  - R
---

This week an update for [xml2](https://cran.r-project.org/web/packages/xml2/index.html) and a new [xslt](https://cran.r-project.org/web/packages/xslt/index.html) package have appeared on CRAN. A full announcement for xml2 version 1.1 will appear on the [rstudio blog](https://blog.rstudio.org/). This post explains xml *validation* (via xsd schema) and xml *transformation* (via xslt stylesheets) which have been added in this release.

XML schemas and stylesheets are not exactly new; both [xslt 1.1](https://www.w3.org/TR/xslt11/) (2001) and [xsd 1.0](https://www.w3.org/TR/xmlschema-1/) (2004) have been available in browsers for over a decade. Revised specifications for xsd/xslt are still developed, but not widely implemented due to declined popularity of xml itself. Our R implementation builds on [libxslt](http://xmlsoft.org/libxslt/) which supports XSLT 1.0 features plus most of the EXSLT set of processor-portable extensions functions.

## XML Validation with XSD

XML schema, also referred to as XSD (XML Schema Definition) is standard for defining the fields and formats that are supposed to appear within an XML document. This provides a formal method for validating XML messages. The schema itself is also written in XML (there is even an [xsd schema](https://www.w3.org/2001/XMLSchema.xsd) for validating xml schemas).

This [example](https://msdn.microsoft.com/en-us/library/ms256129(v=vs.110).aspx) from msdn illustrates the idea using a schema for a hypothetical purchase order. Imagine a vendor has an XML api for retailers to automatically order products. The order can be quite complex but the schema formally describes what constitutes a valid XML order message. It contains fields like this:



```xml
 <xs:complexType name="PurchaseOrderType">
  <xs:sequence>
   <xs:element name="shipTo" type="USAddress"/>
   <xs:element name="billTo" type="USAddress"/>
   <xs:element ref="comment" minOccurs="0"/>
   <xs:element name="items"  type="Items"/>
  </xs:sequence>
  <xs:attribute name="orderDate" type="xs:date"/>
 </xs:complexType>
 ```

Both the client and server can easily validate an XML order against this schema to ensure that all required fields are present and contain the correct format. A copy of this example is included with the `xml2` package:


```r
# Example order
doc <- read_xml(system.file("extdata/order-doc.xml", package = "xml2"))

# Example schema
schema <- read_xml(system.file("extdata/order-schema.xml", package = "xml2"))
xml_validate(doc, schema)
# TRUE
```

The `xml_validate` function returns TRUE or FALSE. If FALSE it also contains an attribute with a data frame listing invalid elements in the XML document. Let's replace some text in the XML document to make it invalid:

```r
# Create invalid order to test
str <- readLines(system.file("extdata/order-doc.xml", package = "xml2"))
str <- sub("<quantity>1", "<quantity>", str)
str <- sub("95819", "ABC95819", str)
str <- sub('partNum="926-AA"', "", str)
doc <- read_xml(paste(str, collapse = "\n"))
```

This new document will fail validation. The return object from `xml_validate` contains an `error` attribute with a dataframe containing the validation errors.

```r
# Fails validation
out <- xml_validate(doc, schema)

# Show the errors
attr(out, "errors")
#[1] "Element 'zip': 'ABC95819' is not a valid value of the atomic type 'xs:decimal'."
#[2] "Element 'quantity': '' is not a valid value of the local atomic type."
#[3] "Element 'item': The attribute 'partNum' is required but missing."
#[4] "Element 'quantity': '' is not a valid value of the local atomic type."
```

When implementing an R client for a system with an XML API which also provides a schema, it is good practice to validate your messages before submitting them to the server. Thereby you catch problems with your XML document locally.

## XML Transformation with XSL

Extensible Stylesheet Language (XSL) Transformation provides a standardized language for converting a certain XML structure into another XML or HTML structure. Usually the original xml document provides the raw data, and the stylesheet contains a template for a HTML page that presents this content. Again, the XSLT document itself is also written in XML.

We have decided to implement this in a separate package called `xslt` because it requires another C library. Try the example from the `xml_xslt` manual page:

```r
library(xslt)
doc <- read_xml(system.file("examples/cd_catalog.xml", package = "xslt"))
style <- read_xml(system.file("examples/cd_catalog.xsl", package = "xslt"))
html <- xml_xslt(doc, style)
cat(as.character(html))
```

This example is explained in more detail on [w3schools](https://www.w3schools.com/xml/xsl_transformation.asp).

## Why Use XSLT?

As the name implies, XSLT is designed to apply styling so that we can separate data of a document from its presentation markup. Take this [example](https://msdn.microsoft.com/nl-nl/library/ms765388(v=vs.85).aspx) of an XSLT document from the msdn homepage:

```xml
<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/hello-world">
    <HTML>
      <HEAD>
        <TITLE></TITLE>
      </HEAD>
      <BODY>
        <H1>
          <xsl:value-of select="greeting"/>
        </H1>
        <xsl:apply-templates select="greeter"/>
      </BODY>
    </HTML>
  </xsl:template>
  <xsl:template match="greeter">
    <DIV>from <I><xsl:value-of select="."/></I></DIV>
  </xsl:template>
</xsl:stylesheet>
```

Now if we apply this to a document like this:

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="hello.xsl"?>
<hello-world>   <greeter>An XSLT Programmer</greeter>   <greeting>Hello, World!</greeting></hello-world>
```

We get the following output:

```html
<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<TITLE></TITLE>
</HEAD>
<BODY>
<H1>Hello, World!</H1>
<DIV>from <I>An XSLT Programmer</I>
</DIV>
</BODY>
</HTML>
```

When XSLT was introduced in [1999](https://www.w3.org/TR/xslt), it was expected that xml would replace html. Computer scientists envisioned that dynamic content of websites would be served via semantically structured xmls feeds (such as RSS), and presentation markup (i.e. a nice html page) could be added on the client by applying a fixed transformation.

Unfortunately that's now how it went. It turned out that xslt was overly complex and never really found wide adoption. Instead people started writing dynamic HTML pages using PHP, which was slow and insecure, but considerably easier to learn. And that brings us back to R :)
