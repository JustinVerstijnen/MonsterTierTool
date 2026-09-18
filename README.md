# Monster Tier

Open index.html directly in your browser. No installation or server required.

- Drag cans into tiers, or click/tap a can and choose its tier.
- Drop a can on another can to place it before that can within a tier.
- Rename tiers, change colors, and add or remove tiers.
- Your ranking is saved in localStorage for this browser and address.
- Export PNG creates a picture with your full ranking embedded as metadata.
- Import the original PNG to restore the title, tiers, colors, and can order.

The collection is ordered: Original, Zero Sugar, sugared flavors, Ultra, Java,
Rehab, and remaining varieties. Each group is alphabetical. The collection
returns to this order when cans are moved back; tier order is entirely yours.
Existing rankings and previously exported PNGs remain compatible.

Keep the original exported PNG. Image editors and social platforms may remove
metadata when they re-encode images. The MonsterTier tEXt chunk contains JSON;
imports validate PNG checksums and the data before replacing your list.

## Files

index.html — interface
assets/css/style.css — responsive styling
assets/js/app.js — ranking, collection ordering, storage, and canvas export
assets/js/png.js — PNG metadata encoding and decoding
assets/js/catalog.js — image catalog with data URLs for offline canvas export
assets/img/ — 113 optimized can images, supplied logo, and favicon

Can images were resized to 240 pixels high. The original supplied ZIP is unchanged.
When replacing or adding can images, also update catalog.js.

Project: https://github.com/JustinVerstijnen/MonsterTierTool
Logo: https://sajvwebsiteblobstorage.blob.core.windows.net/blog/tools-2375/logo.svg

My personal ranking opens the bundled ranking PNG in a new tab without changing your list.
