DPC extras allow organisations to pre-configure the DPC with options during enrolment. These may include the EMM server address, staging credentials, enrolment tokens, and more.

Your EMM will have the most up-to-date support DPC extras, however I maintain a resource [here](/android/android-enterprise-zero-touch-dpc-extras-collection/) which is occasionally also updated by the community.

The generator automatically adds brackets and spacing, so just enter the extras one-per-line, e.g.:

```json
"serverurl":"your.server.com",
"gid":"yourGroupID",
"un":"staginguser",
"pw":"example"
```

For AMAPI-based EMMs (Intune, NinjaOne, etc) if not using the [AMAPI generator](/qr-generator) it would require:

```json
"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{
"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN": "YourEnrolmentToken" 
}
```

**Remember**: This field requires valid JSON, so don't forget those commas on all but the last line of extras, otherwise the QR code will error.

<div class="callout callout-orange">
<div class="callout-heading callout-heading-small">Head's up</div>

DPC extras should be closely guarded as they may grant access to the organisation's EMM platform and sensitive corporate resources. If details are compromised, they should be revoked immediately and new ones generated.

</div>