# How to use

Download this Repo as zip. Unzip it and then import it inside Figma via "Plugins -> Development -> Import from Manifest.json"

# Supported(+Limitations)

- Single Fill (color & linear gradient)
- Single Stroke
- Width/Height
- Position (Groups contain bugs)
- Autolayout (most things work)
- Constraints (all except “scale”)
- Rotation (sometimes destroys x/y positioning)
- Dropshadow
- Cornerradius
- Text: size, color, line height, weight
- CSS variables for colors and SOME Textstyle information(variables must be inside the file, where the plugin is used)

# Things you should know

- Only uses <div> for the html
- Markup and class names are only as good as the figma structure (use autolayout as much as possible, check the layer naming)
- Groups don’t really work (wrong positioning in many cases)
- SVGs do not include variables
