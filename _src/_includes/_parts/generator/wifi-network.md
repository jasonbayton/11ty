**Configuring Wi-Fi Provisioning Options for Android Enterprise**

As an administrator, you have several configuration options available to ensure that devices are set up with the correct Wi-Fi settings during the provisioning process. Here’s how you can configure these options:

**Wi-Fi Security Type**

**Options**:
- **WPA/WPA2 PSK**: This option uses WPA or WPA2 with a pre-shared key, providing robust security suitable for most enterprise environments.
- **WEP**: This option uses WEP, an older and less secure standard, and is generally not recommended due to its vulnerabilities.
- **None**: This option configures the device to connect to open networks without any encryption. Ideal for staging networks with client isolation.

EAP options will be added at a later date. QR code complexity limits can make scanning unreliable, so it has been omitted pending a suitable solution.

(If you're feeling clever, you may be able to enable the fields via dev tools, since they're in the source of this page..)

**Wi-Fi SSID**  
: Enter the name of the Wi-Fi network you want the device to connect to.

**Hidden SSID**  
: Check this box if the Wi-Fi network’s SSID is hidden. Hidden SSIDs do not broadcast the network name, making the network less visible to users and devices.

**Wi-Fi Password**
: Enter the password for the Wi-Fi network. This field is necessary for networks secured with WPA/WPA2 or WEP. Note this is saved into the QR code in **plaintext**.

**Wi-Fi PAC URL**
: If your network requires a Proxy Auto-Config (PAC) URL, enter it here. PAC files are used to automatically configure the browser to use the correct proxy server for accessing the internet.

**Wi-Fi Proxy Host**
: Enter the hostname or IP address of the proxy server that devices should use to connect to the internet.

**Wi-Fi Proxy Port**
: Enter the port number of the proxy server.

**Wi-Fi Proxy Bypass URL**
: Specify any URLs that should bypass the proxy server. This can be useful for internal resources that do not require proxy access.