<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/">
        <html>
        <head>
            <title>Property Details</title>
        </head>
        <body>
            <h2>Real Estate Property List</h2>

            <table border="1">
                <tr>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Description</th>
                </tr>

                <xsl:for-each select="properties/property">
                    <tr>
                        <td><xsl:value-of select="title"/></td>
                        <td><xsl:value-of select="location"/></td>
                        <td><xsl:value-of select="price"/></td>
                        <td><xsl:value-of select="type"/></td>
                        <td>
                            <xsl:choose>
                                <xsl:when test="@status">
                                    <xsl:value-of select="@status"/>
                                </xsl:when>
                                <xsl:otherwise>Not specified</xsl:otherwise>
                            </xsl:choose>
                        </td>
                        <td><xsl:value-of select="description"/></td>
                    </tr>
                </xsl:for-each>
            </table>
        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
