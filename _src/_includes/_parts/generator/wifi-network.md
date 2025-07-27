**Configuring Wi-Fi Provisioning Options for Android Enterprise**

As an administrator, you have several configuration options available to ensure that devices are set up with the correct Wi-Fi settings during the provisioning process. Here’s how you can configure these options:

**Wi-Fi security type**

**Options**:

- **WPA/WPA2 PSK**: This option uses WPA or WPA2 with a pre-shared key, providing robust security suitable for most enterprise environments.
- **WEP**: This option uses WEP, an older and less secure standard, and is generally not recommended due to its vulnerabilities.
- **EAP**: If your network uses EAP and/or certificate auth, this option is provided in beta. Please test it and provide feedback!
- **None**: This option configures the device to connect to open networks without any encryption. Ideal for staging networks with client isolation.

**Wi-Fi SSID**  
: Enter the name of the Wi-Fi network you want the device to connect to.

**Hidden SSID**  
: Check this box if the Wi-Fi network’s SSID is hidden. Hidden SSIDs do not broadcast the network name, making the network less visible to users and devices.

**Wi-Fi password**
: Enter the password for the Wi-Fi network. This field is necessary for networks secured with WPA/WPA2 or WEP. Note this is saved into the QR code in **plaintext**.

**Wi-Fi PAC URL**
: If your network requires a Proxy Auto-Config (PAC) URL, enter it here. PAC files are used to automatically configure the browser to use the correct proxy server for accessing the internet.

**Wi-Fi proxy host**
: Enter the hostname or IP address of the proxy server that devices should use to connect to the internet.

**Wi-Fi proxy port**
: Enter the port number of the proxy server.

**Wi-Fi proxy bypass URL**
: Specify any URLs that should bypass the proxy server. This can be useful for internal resources that do not require proxy access. This should support a comma-separated list of domains in the format `example.com,internal.local`.