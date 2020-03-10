---
slug: gpg-release
title: Encryption and Digital Signatures in R using GPG
date: '2016-10-19'
author:
  - Jeroen Ooms
tags:
  - R
  - gpg
  - crypto
---

A new package [gpg](https://cran.r-project.org/web/packages/gpg/index.html) has appeared on CRAN. From the package description:

> *Bindings to GnuPG for working with OpenGPG (RFC4880) cryptographic methods. Includes utilities for public key encryption, creating and verifying digital signatures, and managing your local keyring. Note that some functionality depends on the version of GnuPG that is installed on the system. In particular GnuPG 2 mandates the use of 'gpg-agent' for entering passphrases, which only works if R runs in a terminal session.*


The package features a beautiful [vignette](https://cran.r-project.org/web/packages/gpg/vignettes/intro.html) to get you started with using GPG in R. Some highlights from the vignette below. 

## Example: encryption

Suppose we want to send an email Glenn Greenwald containing top secret information. His [homepage at the intercept](https://theintercept.com/staff/glenn-greenwald/) shows Greenwalds GPG fingerprint. Let's import his public key:


```r
library(gpg)
glenn <- '734A3680A438DD45AF6F5B99A4A928C769CD6E44'
gpg_recv(glenn)
```

We can now encrypt messages for this key:

```r
writeLines("This is a secret message", "secret.txt")
cat(gpg_encrypt("secret.txt", receiver = glenn))
```

```
-----BEGIN PGP MESSAGE-----

hQIMAzCzOshC83uFARAAqg4mYp/6HTx/6xJjMNo5WaVKCtCv+yqr4tA4qZ7Mtsxz
Cxud4hgGfuqZ45S3J6qsbFuoWJBlmJPYrBoTNjO+dkdi5H5oURLkOo5l+TInhSoL
w/9ClxjG7HLFxKWp7rG5tdHQT7bGxr6Q0YkrI1OX/tTh/NracciQeCDZdcVRHuvO
uaok4r44mWlRavGncL6PHDAleWEky784hal3uxgUGo9M75jgQayDFx9bNA50dEzu
VBTIiLYH/wN90S4o5vTIWRsL2DVkUv9ZVYvHZ+kYO2zO4eoPNeqaA+ajYCIqGvKS
8NcNhF0cZUiKvtsqCuenCr1T9e/h4V9JGnz+1tdThn76J4Lf8cTcdTIqZ34D4SHz
HsjvceOV0m+pUcBL0HcOorZIKF1sPjsyX5LZqgccIecD7ouznF7qqYgahTjHCWIW
Da3EWth/ihxngmDrxbgbYSzGTXt9HLbd+Sil4lh7Tm8aS73JBZvEpDQyLVVeOxuB
PiDU1Iz0rS5Hlw2/PEszjL312W5RLjgho5CiXPyENiqJUGdVV5BvvzSh292vjv9h
m10zmUqs1B3WFgEI/yOcOzBx/1Vpn7xOsIpcWY7pj7QfAEMxwWiuig0nYWbOHXj9
heqNgw1QzEK/lulz+6OyR4JlYfrOY0+LhAATSzoCchIIJD++w+YApdBp7Y4pdTfS
VQHK9T1ynrRz5IpLpwnBOVxWq6ngNiaIzCcX6SvogiWcUcec55eKsDqxuMWcUPrH
3jKHYqMqEzvbLlpo2lSjdmwMb3j+EusS/kN64HBaMqwvVsfyCaI=
=lkbq
-----END PGP MESSAGE-----
```

You can safely send this message over any channel (email, twitter, etc). Nobody in the world (not even ourselves) will be able to decipher this message, except for Glenn Greenwald.

## Example: digital signatures

GPG is most widely used for digital signatures. For example the [Debian page on CRAN](https://cran.r-project.org/bin/linux/debian/) explains that the backports archives on CRAN are signed with the key of Johannes Ranke with key fingerprint __6212 B7B7 931C 4BB1 6280 BA13 06F9 0DE5 381B A480__. Let’s import this key:

```r
# take out the spaces
johannes <- gsub(" ", "", "6212 B7B7 931C 4BB1 6280  BA13 06F9 0DE5 381B A480")
gpg_recv(johannes)
```
```
considered   imported  unchanged 
         1          1          0  
```

We can now verify the [Release](https://cran.r-project.org/bin/linux/debian/buster-cran35/Release) file, which contains checksums for all files in the repository.

```r
# Verify the file
library(curl)
curl_download('https://cran.r-project.org/bin/linux/debian/buster-cran35/Release', 'Release')
curl_download('https://cran.r-project.org/bin/linux/debian/buster-cran35/Release.gpg', 'Release.gpg')
gpg_verify('Release', 'Release.gpg')
```

```
                               fingerprint           timestamp hash pubkey success
1 6212B7B7931C4BB16280BA1306F90DE5381BA480 2016-06-22 09:26:03 SHA1    DSA    TRUE
```

Looking good! We can trust the checksums in the Release file to be legitimate.

Check out the package [vignette](https://cran.r-project.org/web/packages/gpg/vignettes/intro.html) for more examples!
