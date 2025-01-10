When using EAP for Wi-Fi security, you can configure the following:

**EAP Method**
: Choose from PEAP, TLS, TTLS, PWD, SIM, AKA, or AKA'.

**Phase 2 Authentication**
: Secondary authentication options (None, PAP, CHAP, MSCHAP, MSCHAPv2).

**Wi-Fi Identity**
: This is the identity (username) used for authentication. The device presents this identity to the authentication server during the connection attempt.

**Wi-Fi Anonymous Identity**
: The anonymous identity is used when the network supports identity protection. It hides the actual identity during the initial phase of authentication, often formatted as a generic placeholder like anonymous@domain.com.

**Wi-Fi Domain**
: This is the domain name of the network’s authentication server. It ensures the device validates the certificate presented by the server during the authentication process.

**Wi-Fi CA Certificate**
: This field is used to provide the Certificate Authority (CA) certificate in Base64-encoded format. The CA certificate is used to validate the server’s identity during the authentication process.

**Wi-Fi User Certificate**
: The user certificate (also provided in Base64-encoded format) is required for TLS-based authentication methods like EAP-TLS. This certificate is used for mutual authentication where both the server and the client must authenticate each other.

Please be aware these fields, particularly certificates, will add a considerable amount of data to the QR code. The larger the QR, the less reliable and more difficult it can be to scan.