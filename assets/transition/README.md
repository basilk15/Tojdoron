# Route transition artwork

Runtime assets are `route-background.webp`, `route-plane.webp`, `route-truck.webp`,
and `route-ship.webp`. The original approved no-logo artwork
is preserved in `tojdoron-route-prelude.png` as the source for the foreground layers.

The three vehicle layers retain source-image pixels, with feathered silhouette
masks. The arrow is no longer rendered or loaded. The vehicles
are not redrawn by a generative model. `route-transition.js` animates these layers
on a full-screen canvas. The background covers the viewport with its decorative
border cropped away. Vehicle proportions are maintained independently of the
background crop, including on portrait phones.

Only the empty background was edited with the built-in ImageGen tool. Prompt:

> Precise object removal / animation clean background plate. Edit this image
> retaining EXACT canvas framing and composition. Remove the airplane at upper
> left, truck at middle left, ship at lower left, ALL green speed trails behind
> each, and ALL the green converging arrow/green endpoint on the right. Fill their
> previous locations with matching warm cream parchment and unobtrusive faint map
> lines. Keep the clouds beneath airplane lane, the thin road below truck, and the
> water below ship. Extend the thin horizontal road across the entire image width
> at same y position and extend the calm sea water band across entire width at same
> y position, so later animation sprites can drive/sail right. Keep fine cream
> cartographic circles, parchment texture, corner maps, compass, delicate border,
> exact colors. NO vehicles anywhere, no logo, no text, no green arrow or green
> glowing lines. This is a static clean plate for independently animated existing
> foreground sprites. Wide same aspect ratio.

The original logo lockup follows after 1.3 seconds of vehicle motion and a
160 ms scene fade. Its keyframes and relative timings are unchanged.
