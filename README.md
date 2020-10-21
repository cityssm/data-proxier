# data-proxier

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f202b6b96c894f778fc30dfef4545e39)](https://app.codacy.com/gh/cityssm/data-proxier?utm_source=github.com&utm_medium=referral&utm_content=cityssm/data-proxier&utm_campaign=Badge_Grade_Dashboard) [![Maintainability](https://api.codeclimate.com/v1/badges/190d3317fe3287edd1f2/maintainability)](https://codeclimate.com/github/cityssm/data-proxier/maintainability) [![Build Status](https://travis-ci.com/cityssm/data-proxier.svg?branch=master)](https://travis-ci.com/cityssm/data-proxier)

The data-proxier tool acts as a real-time buffer between a database server
and an application server.  It provides data in "easy to consume" JSON.

## Supported Data Sources

At this time, the data-proxier tool only supports **Microsoft SQL Server**,
since that database was part of the problem that needed solving.
The application was written with the ability to support other data sources in mind.

## Features

-   Connect to multiple databases from one easy to access point.

-   IP address whitelisting.

-   Receive fresh data every time, or cache query results in memory
    for a short period of time to reduce the burden on the database.

## But Why?

The data-proxier tool was written to solve two common issues
when accessing data from a SQL Server in a secure network environment.

When securing connections between application servers and database servers,
it is often preferred to communicate with the database server on a single port.
This makes it possible to write a firewall rule for the communication.
Unfortunately when the database server is administered by a third party
who uses dynamic ports for communicating, altering their port settings
may not be an option.

Also, it is often desirable to limit the amount of data that is exposed.
Using an application like the data-proxier tool lets you choose which
tables, which columns, and which rows to share.  Not the whole database!
