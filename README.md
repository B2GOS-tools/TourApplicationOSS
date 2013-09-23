TourApplicationOSS
==================

Tour Application for Firefox OS Released as Open Source Software


How to use build.sh script:
- We are going to use special variables: ${VARIANT} and ${ZIPSIZE}, please do not remove any of them in the files, for a correct modification in time to script running.
- config.json:
	- You must modify config.json file to use the "host" that you want.
- package.manifest
	- Modify "package_path" with your host path
- index.html:
	- Modify "URL" to point to your host + path.
- build.sh:
	- Modify "pathSharedBase" to use the internal path of machine which was served for webserver.

When you execute build.sh, it parses config.json, index.html and package.manifest file, generates packages following an structure "country/device" in slidesPack dir and moves the result to "pathSharedBase". In this repo, you can see an example with country=variant and device=device.
If you want make this package in one machine and server it with other, you must use an intermedium path, and make a manually upload to the server.

When server is ready to serve. It will use the:
- "download" paths to serve the application.
- "variant" paths to serve comercial offer.

Both kind of paths have "country/device" structure. And "variant" paths are periodically consulted to see the changes.
If you want update commercial offer, you must to put the slides that you want in the "variant" paths ($variantPATH/$country/$device/slides) and modify slides.json file.

slides.json has a list of slides that must be used and an incremental integer number to reference version (if you modify this file but not increment "version" you won't have changes on the clients)
An example of slides.json file:
```
{
  "data":   [
"Comercial_Offer.png"
            ],

  "version": "1"
}
```
An example of a complete structure in server using country=COUNTRY and device=DEVICE:
```
.
├── downloads
│   └── COUNTRY
│       └── DEVICE
│           ├── build
│           │   ├── package.manifest
│           │   └── package.zip
│           └── index.html
└── variants
    └── COUNTRY
        └── DEVICE
            └── slides
                ├── Commercial_Offer.png
                └── slides.json
```
