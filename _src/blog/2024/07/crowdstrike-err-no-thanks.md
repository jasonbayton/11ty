---
 title: "Avoid another CrowdStrike takedown: Two approaches to replacing Windows"
 date: '2024-07-21'
 status: publish
 author: 'Jason Bayton'
 excerpt: "❤️"
 type: post
 tags:
     - Enterprise
     - Guide
---

In recent days, the tech community has been grappling with the aftermath of a major outage caused by CrowdStrike. This incident resulted in significant disruptions across various enterprise Windows environments, leading to downtime and operational challenges for numerous organisations, public bodies, critical infrastructure, and more. The outage has highlighted the almost impenetrable hold Microsoft has on organisations the world over, and critically flawed Windows can be. It also highlights the importance of secure system installations, change control, and maintenance practices.. but human behaviour is harder to fix.

As organisations recover and reassess their IT strategies, it's absolutely worth taking some time to consider reducing the Windows stronghold - particularly for critical services - and explore alternatives to add a little redundancy to your organisation. The below guide offers a quick and simple run-through for installing alternative operating systems on existing endpoints, be they desktop/laptop or server.

<div class="callout callout-red">
<div class="callout-heading">Obvious heads-up</div>

This guide _doesn't_ go into the nuances of enterprise security beyond some basic best practices. Rather, it's to offer a taste of alternatives for non-production devices for intrigued administrators, or those told by their bosses to take a few eggs out of their basket. Proceed with understanding.

</div>

## First up, Ubuntu

Ubuntu is widely used for both desktops and servers, and considered one of a few leading enterprise Linux distributions (others include RedHat, Suse..). Ubuntu is generally known for good compatibility with a range of devices on the market, and so makes for a nice introduction to Linux. This guide will walk you through the best practices for installing Ubuntu securely, whether setting up a workstation for knowledge workers or deploying a server for backend infrastructure.

### Ubuntu Desktop for knowledge workers and end users

**1. Preparing for Installation**
- **Download Ubuntu from Official Sources:** Always download the latest Ubuntu ISO image from the official [Ubuntu website](https://ubuntu.com/download). Verify the SHA256 checksum to ensure the integrity of the downloaded file.
- **Create a Bootable USB:** Use reliable tools like Rufus (for Windows, while you still have it eh?) or Etcher (cross-platform) to create a bootable USB drive. This ensures a clean and secure installation medium.

**2. Boot from USB Drive**

   - Insert the bootable USB drive into the target device.
   - Restart the device and boot from the USB drive.

**3. Try Ubuntu Before Installing**

   - When prompted, if you'd like to have a quick test-run to ensure it boots, choose **Try Ubuntu** to boot into a live session. This allows you to test the system and check compatibility before installation.

**4. Begin Installation**

   - Double-click the **Install Ubuntu** icon on the desktop to start the installation process.

   **Installation Options:**
   - **Language**: Select your preferred language.
   - **Keyboard Layout**: Choose the appropriate keyboard layout.
   - **Updates and Other Software**: 
     - Select **Download updates while installing Ubuntu** to ensure that your installation is up-to-date with the latest patches.
     - Choose **Install third-party software** if you need additional codecs or proprietary drivers.

   **Installation Type:**
   - **Erase Disk and Install Ubuntu**: This option will delete all data on the disk and install Ubuntu. Use this if you’re setting up Ubuntu on a fresh system or replacing an existing OS.
   - **Something Else**: Choose this option for custom partitioning. Recommended for advanced users who want to create separate partitions for `/home`, `/var`, `/tmp`, and `/opt`.

**5. Partitioning**

   - For secure installations, it’s recommended to create separate partitions for system directories:
     - `/home`: For user data.
     - `/var`: For variable data such as logs.
     - `/tmp`: For temporary files.
     - `/opt`: For optional application software.

   - If using LVM, choose the **Use LVM with the new Ubuntu installation** option for better management of disk space.

   - **Encryption**: Select the option to **Encrypt the new Ubuntu installation for security**. This uses LUKS encryption to protect your data.

**6. Complete Installation**

   - Follow the prompts to select your time zone and create a user account.
   - After installation, remove the USB drive when prompted and reboot the device.

**7. Post-Installation Configuration**
- **Update System:** Immediately update your system to ensure you have the latest security patches. Use the command:
  
```sh
sudo apt update && sudo apt upgrade -y
```

- **Enable Firewall:** Activate and configure the Uncomplicated Firewall (UFW) to block unnecessary incoming traffic:
  
```sh
sudo ufw enable
sudo ufw allow ssh
```

- **Install Antivirus:** Consider installing ClamAV or an equivalent FOSS AV to scan for malware and viruses, particularly if you interact with Windows systems.

### Ubuntu Server for infrastructure and userless systems

**1. Preparing for Installation**
- **Download and Verify ISO:** As with the desktop version, download the latest Ubuntu Server ISO from the official source and verify its integrity.
- **Create a Bootable USB:** Use a secure method to create a bootable USB drive.

**2. Configuring BIOS/UEFI Settings**
- **Secure Boot:** Enable Secure Boot for added protection during the boot process.
- **Disable Unused Hardware:** While you're in BIOS, it's a good opportunity to disable unnecessary hardware to limit exposure.

**3. Installation Process**
- **Minimal Installation:** Choose the minimal installation option to install only essential packages.
- **Disk Encryption:** Use LVM with LUKS to encrypt your disk, ensuring data security.
- **Custom Partitioning:** Create separate partitions for /var, /tmp, and /opt to contain potential breaches.

**4. Post-Installation Hardening**
- **Update System:** Run system updates immediately:
  
```sh
sudo apt update && sudo apt upgrade -y
```

- **Configure Firewall:** Use UFW to configure the firewall appropriately:
  
```sh
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw allow [your additional services]
sudo ufw enable
```

- **Install Fail2Ban:** Protect against brute force attacks by installing and configuring Fail2Ban:
  
```sh
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

- **SSH Hardening:** Edit the SSH configuration file (`/etc/ssh/sshd_config`) to enhance security:
  - Disable root login: `PermitRootLogin no`
  - Change the default port: `Port 2222` (choose any unused port)
  - Allow only specific users: `AllowUsers yourusername`
  - Ensure login by password is disabled. Key based auth ensures passwords can't be guessed.

**5. Regular Maintenance**
- **Automate Updates:** If you haven't learned your lesson from allowing automatic updates to run amok, configure unattended upgrades to keep your system up to date automatically:
  
```sh
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

- **Monitor Logs:** Regularly check system logs for suspicious activity using tools like Logwatch or setting up a SIEM system for central log intake.

## Next, ChromeOS Flex

Before Google acquired it, **CloudReady** was the leading provider of a Chromium OS-based solution that aimed to bring a lightweight, secure operating system to older hardware. Now rebranded as **ChromeOS Flex**, this solution continues to deliver a streamlined computing experience, particularly for repurposing outdated devices. ChromeOS Flex brings the benefits of Google's Chrome OS to a wide range of hardware, offering a modern alternative to traditional operating systems.

### Prerequisites

1. **Supported Devices List**
   - Before beginning, verify that your device is compatible with ChromeOS Flex. Google maintains a list of officially supported devices on their [ChromeOS Flex Supported Devices page](https://support.google.com/chromeosflex/answer/11513094). While ChromeOS Flex is designed to work with a broad range of hardware, checking compatibility ensures optimal performance and user experience. Unsupported (or unlisted) devices may work perfectly, or may lack functionality.

2. **Requirements**
   - **USB Drive**: A USB drive with at least 8GB of capacity.
   - **Backup**: Ensure all important data on the target device is backed up, as the installation will erase existing data.

### Installation Steps

**1. Download ChromeOS Flex**

   - Visit the [ChromeOS Flex website](https://chromeenterprise.google/os/chromeosflex/).
   - Download the **ChromeOS Flex image** and follow the instructions to create a bootable USB drive.

**2. Create a Bootable USB Drive**

   - **Using the Chromebook Recovery Utility**:
     1. Install the [Chromebook Recovery Utility](https://chromewebstore.google.com/detail/chromebook-recovery-utili/pocpnlppkickgojjlmhdmidojbmbodfm) from the Chrome Web Store.
     2. Insert the USB drive into your computer.
     3. Open the Chromebook Recovery Utility.
     4. Click **Get Started** and select **Chromebook or Chromebox**.
     5. Click **Select a model from a list**, then choose **Google ChromeOS Flex**.
     6. Follow the prompts to create your recovery media.

   - **Using a Different Tool**:
     1. Download and install a tool such as [Etcher](https://www.balena.io/etcher/) or [Rufus](https://rufus.ie/).
     2. Select the ChromeOS Flex image file you downloaded and your USB drive.
     3. Follow the tool’s instructions to write the image to the USB drive.

**3. Boot from USB Drive**

   - Insert the bootable USB drive into the target device.
   - Power on the device and enter the BIOS/UEFI settings (usually by pressing F2, F12, ESC, or DEL during startup).
   - Set the device to boot from the USB drive.
   - Save the changes and reboot the device.

**4. Install ChromeOS Flex**

   - Upon booting from the USB drive, you’ll be presented with a ChromeOS Flex installation screen.
   - Follow the on-screen instructions to install ChromeOS Flex. You will be prompted to either try ChromeOS Flex or install it. Choose **Install**.
   - The installation process will erase all data on the device’s internal storage. Confirm that you’ve backed up your data before proceeding.

**5. Set Up ChromeOS Flex**

   - Once the installation is complete, the device will restart. Remove the USB drive when prompted.
   - Follow the initial setup process, which includes connecting to Wi-Fi, signing in with a Google account, and configuring device settings.

### Best Practices and Tips

- **Backup Regularly**: Ensure that any important data is backed up regularly, as ChromeOS Flex is designed for cloud-first usage with automatic updates and built-in security.
- **Update Firmware**: Check and update your device’s firmware to the latest version before installing ChromeOS Flex to avoid compatibility issues.
- **Enable Developer Mode (if needed)**: For advanced users, enabling Developer Mode might be necessary to perform certain customisations. However, this is typically not required for most standard installations.
- **Check Compatibility Regularly**: As ChromeOS Flex evolves, periodically review the [supported devices list](https://support.google.com/chromeosflex/answer/11513094) to ensure ongoing compatibility with updates.

For additional support and troubleshooting, refer to Google’s [ChromeOS Flex Help Centre](https://support.google.com/chromeosflex/).

## Conclusion

This is somewhat tongue-in-cheek, and a little dig towards Microsoft for rolling an OS that has the potential to fail so spectacularly to make everything suck for a few days. That said, the above guide nevertheless offers a practical way to explore an alternative, especially if you’re feeling less than thrilled with the current state of Windows.

Think of this article not as a comprehensive base on which to build a strategy, but rather as a chance to dip your toes into the world of alternatives. Whether you’re a knowledge worker in need of a new desktop experience or someone managing a server environment, there are secure and robust alternatives that might just be worth your time.

Happy experimenting, and here’s to exploring new possibilities!